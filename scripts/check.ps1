$ErrorActionPreference = "Stop"

$root = Resolve-Path "$PSScriptRoot\.."
Set-Location $root

npm --prefix frontend run lint
npm --prefix frontend run typecheck
Set-Location "$root\backend"
& "$root\.venv\Scripts\python.exe" -m ruff check .
& "$root\.venv\Scripts\python.exe" -m pytest tests