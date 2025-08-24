# Start Cloudflare tunnel and capture the URL
Write-Host "Starting Cloudflare tunnel..." -ForegroundColor Green

# Start cloudflared in background and capture output
$job = Start-Job -ScriptBlock {
    cloudflared tunnel --url http://localhost:8000
}

# Wait a moment for tunnel to establish
Start-Sleep -Seconds 5

# Check if tunnel is running
$process = Get-Process cloudflared -ErrorAction SilentlyContinue
if ($process) {
    Write-Host "✅ Cloudflare tunnel is running!" -ForegroundColor Green
    Write-Host "🔗 Your tunnel URL should be visible in the cloudflared output" -ForegroundColor Yellow
    Write-Host "📱 Share this URL with your friends to test ixchats!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To stop the tunnel, run: taskkill /F /IM cloudflared.exe" -ForegroundColor Red
} else {
    Write-Host "❌ Failed to start Cloudflare tunnel" -ForegroundColor Red
}

# Keep the script running
Write-Host "Press Ctrl+C to stop the tunnel..."
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Write-Host "Stopping tunnel..." -ForegroundColor Yellow
    Stop-Job $job
    Remove-Job $job
    taskkill /F /IM cloudflared.exe 2>$null
}
