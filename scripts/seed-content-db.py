#!/usr/bin/env python3
"""把 Nuxt Content 构建出的 dump 预灌进 D1 内容库(chendahuang-content)。

dump 文件格式:@nuxt/content 生成,内容 = base64( gzip( JSON.stringify(sqlLines) ) ),
每行是 "SQL语句 -- hash后缀",且已含 _content_info 的 checksum 行(灌完即 ready=true)。
运行时 integrityCheck 校验 checksum 一致则跳过自建,首查零灌库成本;
灌库失败/版本不一致也不影响站点——运行时会自动从 dump 重新导入(自愈)。

用法:
  pnpm run db:seed-content          # 灌 chendahuang-content --remote
  python3 scripts/seed-content-db.py --dry-run
"""

import argparse
import base64
import gzip
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_NAME = "chendahuang-content"
DUMP_DIR = ROOT / ".nuxt" / "content" / "raw"
CHUNK_BYTES = 4_000_000  # 单文件超过这个就分片执行,避开 wrangler d1 execute 的大小限制


def decode_dump(path: Path) -> list[str]:
    raw = base64.b64decode(path.read_bytes())
    sql_lines = json.loads(gzip.decompress(raw))
    return sql_lines


def run_wrangler_file(sql_file: Path, yes: bool) -> bool:
    cmd = ["pnpm", "exec", "wrangler", "d1", "execute", DB_NAME, "--remote", f"--file={sql_file}"]
    if yes:
        cmd.append("-y")
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  [fail] {sql_file.name}: {r.stderr.strip()[-400:]}")
        return False
    tail = (r.stdout or "").strip().splitlines()
    print(f"  [ok] {sql_file.name} ({len(tail)} 行输出,最后: {tail[-1][:80] if tail else ''})")
    return True


def seed_collection(path: Path, tmpdir: Path, yes: bool) -> bool:
    sql_lines = decode_dump(path)
    total = sum(len(s.encode()) + 1 for s in sql_lines)
    print(f"[{path.stem}] {len(sql_lines)} 条 SQL,共 {total/1024:.0f} KB")

    chunks, buf, size = [], [], 0
    for line in sql_lines:
        buf.append(line)
        size += len(line.encode()) + 1
        if size >= CHUNK_BYTES:
            chunks.append(buf)
            buf, size = [], 0
    if buf:
        chunks.append(buf)

    ok = True
    for i, chunk in enumerate(chunks):
        f = tmpdir / f"{path.stem}.part{i:02d}.sql"
        f.write_text("\n".join(chunk) + "\n", encoding="utf-8")
        if not run_wrangler_file(f, yes):
            ok = False
        f.unlink()
    return ok


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="只解码统计,不执行 wrangler")
    args = ap.parse_args()

    dumps = sorted(DUMP_DIR.glob("dump.*.sql"))
    if not dumps:
        sys.exit(f"没找到 dump 文件:{DUMP_DIR}(先跑 pnpm build)")
    print(f"找到 {len(dumps)} 个 dump:{', '.join(d.name for d in dumps)}")
    if args.dry_run:
        for d in dumps:
            print(f"  [{d.stem}] {len(decode_dump(d))} 条 SQL")
        return

    with tempfile.TemporaryDirectory() as td:
        failed = [d for d in dumps if not seed_collection(d, Path(td), yes=True)]
    if failed:
        sys.exit(f"失败 {len(failed)} 个:{', '.join(d.name for d in failed)}(运行时自愈兜底,可重跑)")
    print(f"[done] 全部灌入 {DB_NAME}。校验: wrangler d1 execute {DB_NAME} --remote --command 'SELECT name, ready FROM _content_info'")


if __name__ == "__main__":
    main()
