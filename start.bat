@echo off
echo Starting Rudaraksh Hotel Application...
echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173
echo.
pause

