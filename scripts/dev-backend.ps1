$ErrorActionPreference = "Stop"

$root = Resolve-Path "$PSScriptRoot\.."
Set-Location $root

if (-not (Test-Path ".venv\Scripts\python.exe")) {
  py -3.12 -m venv .venv
}

& .\.venv\Scripts\python.exe -m pip install -e ".\backend[dev]"
& .\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload --host 0.0.0.0 --port 8000