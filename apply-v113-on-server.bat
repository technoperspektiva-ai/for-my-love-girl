@echo off
setlocal
node tools\apply-v113-on-server.mjs
if errorlevel 1 exit /b %errorlevel%
call npm install
if errorlevel 1 exit /b %errorlevel%
call npm run check
if errorlevel 1 exit /b %errorlevel%
call npx wrangler deploy
