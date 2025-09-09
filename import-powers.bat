@echo off
echo Importing powers to xat-chat database...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MongoDB is running
echo Checking MongoDB connection...
mongosh --eval "db.runCommand('ping')" >nul 2>&1
if %errorlevel% neq 0 (
    echo Warning: MongoDB might not be running
    echo Please start MongoDB before importing powers
    echo.
)

REM Run the import script
echo Running power import...
node src/server/importPowers.js

echo.
echo Power import completed!
pause
