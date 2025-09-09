@echo off
echo Testing authentication system...
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
    echo Please start MongoDB before running tests
    echo.
)

REM Run the test
echo Running authentication tests...
node test-auth.js

echo.
echo Test completed!
pause
