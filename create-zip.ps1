# Bodycam Overlay - Create Distribution ZIP
# This script creates a ready-to-share ZIP file

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Bodycam Overlay - ZIP Creator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$sourcePath = ".\dist\BodycamOverlay-win32-x64"
$destinationPath = ".\dist\BodycamOverlay-v0.1.0-Windows.zip"

# Check if source folder exists
if (!(Test-Path $sourcePath)) {
    Write-Host "❌ Error: Source folder not found!" -ForegroundColor Red
    Write-Host "Please run 'npm run package' first." -ForegroundColor Yellow
    pause
    exit
}

Write-Host "📦 Creating ZIP file..." -ForegroundColor Yellow
Write-Host ""

# Remove old ZIP if it exists
if (Test-Path $destinationPath) {
    Write-Host "Removing old ZIP file..." -ForegroundColor Gray
    Remove-Item $destinationPath -Force
}

# Create ZIP
try {
    Compress-Archive -Path $sourcePath -DestinationPath $destinationPath -CompressionLevel Optimal
    
    $zipSize = (Get-Item $destinationPath).Length / 1MB
    
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Location:" -ForegroundColor Cyan
    Write-Host "   $((Resolve-Path $destinationPath).Path)" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Size:" -ForegroundColor Cyan
    Write-Host "   $([math]::Round($zipSize, 2)) MB" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Ready to share!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Upload the ZIP to Google Drive, Dropbox, or MediaFire" -ForegroundColor White
    Write-Host "  2. Share the download link" -ForegroundColor White
    Write-Host "  3. Users just extract and run BodycamOverlay.exe!" -ForegroundColor White
    Write-Host ""
    
    # Ask if user wants to open the folder
    $openFolder = Read-Host "Open dist folder? (Y/N)"
    if ($openFolder -eq "Y" -or $openFolder -eq "y") {
        explorer.exe (Resolve-Path ".\dist")
    }
    
} catch {
    Write-Host "❌ Error creating ZIP: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
pause