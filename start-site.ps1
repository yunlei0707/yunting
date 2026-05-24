$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if (!(Test-Path -LiteralPath $node)) {
  $node = "node"
}

Set-Location -LiteralPath $root
Write-Host "外汇策略工坊启动中..."
Write-Host "地址: http://127.0.0.1:5173/"
& $node server.mjs
