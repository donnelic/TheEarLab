@echo off
setlocal
set "SCRIPT_DIR=%~dp0"

start "TheEarLab Server" powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%tools\start-local-server.ps1" -OpenBrowser %*
