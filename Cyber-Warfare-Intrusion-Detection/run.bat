@echo off
setlocal

cd /d "%~dp0"

set "VENV_DIR=venv"
set "PYTHON_EXE=python"

:: Check if Python is available
%PYTHON_EXE% --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not found! Please install Python and add it to your PATH.
    pause
    exit /b 1
)

:: Create virtual environment if it doesn't exist
if not exist "%VENV_DIR%" (
    echo Creating virtual environment in %VENV_DIR%...
    %PYTHON_EXE% -m venv %VENV_DIR%
    if %errorlevel% neq 0 (
        echo Failed to create virtual environment.
        pause
        exit /b 1
    )
)

:: Activate virtual environment
echo Activating virtual environment...
call "%VENV_DIR%\Scripts\activate"

:: Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

:: Install dependencies
if exist "requirements.txt" (
    echo Installing dependencies from requirements.txt...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo Failed to install dependencies.
        pause
        exit /b 1
    )
) else (
    echo requirements.txt not found! Skipping dependency installation.
)

:: Run the application
echo Starting application...
python app.py

pause
