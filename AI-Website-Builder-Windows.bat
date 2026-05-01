@echo off
setlocal enabledelayedexpansion
title AI Website Builder Setup
color 0A

REM Always run from the folder where this file lives
cd /d "%~dp0"

echo ===============================================
echo        AI WEBSITE BUILDER - Easy Setup
echo ===============================================
echo.

REM --- 1) Check for Git (and guide install) ---
where git >nul 2>nul
if errorlevel 1 (
  echo ERROR: Git is not installed!
  echo Please install Git for Windows: https://git-scm.com/download/win
  pause
  start "" https://git-scm.com/download/win
  exit /b 1
)

REM --- 2) Check for Node (and version >= 18) ---
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed!
  echo Please install Node.js from https://nodejs.org and run this again.
  pause
  start "" https://nodejs.org
  exit /b 1
)

node -e "process.exit(parseInt(process.versions.node.split('.')[0],10)>=18?0:1)"
if errorlevel 1 (
  echo ERROR: Node.js 18+ is required. Please update from https://nodejs.org
  pause
  start "" https://nodejs.org
  exit /b 1
)

REM --- 3) Clone the repo if needed ---
if not exist ai-website-builder (
  echo Downloading AI Website Builder...
  git clone https://github.com/builtbyV/ai-website-builder.git
  if errorlevel 1 (
    echo Failed to download. Please check your internet connection and try again.
    pause
    exit /b 1
  )
)

cd ai-website-builder

REM --- 4) Find Git Bash reliably (not always on PATH) ---
set "GIT_BASH="
where bash >nul 2>nul && set "GIT_BASH=bash"
if not defined GIT_BASH (
  for %%P in ("%ProgramFiles%\Git\bin\bash.exe" "%ProgramFiles(x86)%\Git\bin\bash.exe" "%LOCALAPPDATA%\Programs\Git\bin\bash.exe") do (
    if exist "%%~fP" set "GIT_BASH=%%~fP"
  )
)
if not defined GIT_BASH (
  echo ERROR: Git Bash not found. Re-run the Git installer and
  echo select "Git from the command line and also from 3rd-party software".
  pause
  exit /b 1
)

REM --- 5) Run setup (non-interactive; skip AI menu) on first run ---
if not exist node_modules (
  echo Running initial setup...
  "%GIT_BASH%" -lc "cd '%cd%' && NONINTERACTIVE=1 SKIP_AI_MENU=1 bash ./setup.sh" || echo (Continuing)
)

REM --- 6) Status + optional installs ---
echo.
echo Checking installed AI assistants...
where gemini >nul 2>nul && (set GEMINI_OK=1)  || (set GEMINI_OK=0)
where claude  >nul 2>nul && (set CLAUDE_OK=1) || (set CLAUDE_OK=0)
where codex   >nul 2>nul && (set CODEX_OK=1)  || (set CODEX_OK=0)

echo.
echo AI Assistants Status:
if %GEMINI_OK%==1 (echo [INSTALLED] Google Gemini) else (echo [NOT INSTALLED] Google Gemini)
if %CLAUDE_OK%==1 (echo [INSTALLED] Claude Code)   else (echo [NOT INSTALLED] Claude Code)
if %CODEX_OK%==1  (echo [INSTALLED] OpenAI Codex)  else (echo [NOT INSTALLED] OpenAI Codex)
echo.

set SHOWMENU=0
if %GEMINI_OK%==0 set SHOWMENU=1
if %CLAUDE_OK%==0 set SHOWMENU=1
if %CODEX_OK%==0  set SHOWMENU=1

if %SHOWMENU%==1 (
  echo Options:
  if %GEMINI_OK%==0 echo 1^) Install Google Gemini ^(FREE - Recommended^)
  if %CLAUDE_OK%==0 echo 2^) Install Claude Code ^(subscription^)
  if %CODEX_OK%==0  echo 3^) Install OpenAI Codex ^(ChatGPT plan^)
  echo 0^) Continue without installing
  echo.
  set /p choice="Enter your choice (0-3): "
  if "!choice!"=="1" if %GEMINI_OK%==0 call npm install -g @google/gemini-cli
  if "!choice!"=="2" if %CLAUDE_OK%==0 call npm install -g @anthropic-ai/claude-code
  if "!choice!"=="3" if %CODEX_OK%==0  call npm install -g @openai/codex

  REM re-check after potential install
  where gemini >nul 2>nul && (set GEMINI_OK=1)
  where claude >nul 2>nul && (set CLAUDE_OK=1)
  where codex  >nul 2>nul && (set CODEX_OK=1)
)

REM --- 7) Start preview (window #1) ---
echo.
echo Starting your website preview...
start "Website Preview" cmd /k "cd /d %cd% && npm run dev"

REM --- 8) Start first available AI (window #2), prefer Gemini ---
echo.
echo Starting your AI assistant...
if %GEMINI_OK%==1 (
  start "AI - Gemini" cmd /k "cd /d %cd% && npx --yes gemini"
) else if %CLAUDE_OK%==1 (
  start "AI - Claude" cmd /k "cd /d %cd% && npx --yes claude"
) else if %CODEX_OK%==1 (
  start "AI - Codex" cmd /k "cd /d %cd% && npx --yes codex"
) else (
  REM Nothing installed? ephemeral npx run still works:
  start "AI - Gemini (npx)" cmd /k "cd /d %cd% && npx --yes gemini"
)

REM --- 9) Open the browser to the preview URL ---
timeout /t 5 /nobreak >nul
start "" http://localhost:5173

echo.
echo All systems running! A preview window and an AI window are open.
echo.
echo TO STOP: Press Ctrl+C in any window to stop that process
echo TO RESTART: Just run this script again
echo.
pause
