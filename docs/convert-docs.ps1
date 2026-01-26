# LGIS Documentation Conversion Script
# Converts Markdown documentation to Microsoft Word format using Pandoc
# 
# Requirements:
# - PowerShell 5.0+
# - Pandoc installed (choco install pandoc)

param(
    [switch]$GeneratePDF = $false,
    [string]$OutputDir = "output"
)

$ErrorActionPreference = "Stop"

# Paths
$ScriptPath = $PSScriptRoot
$OutputPath = Join-Path $ScriptPath $OutputDir

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  LGIS Documentation Conversion to Word Format" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Check if Pandoc is installed
try {
    $pandocVersion = pandoc --version | Select-Object -First 1
    Write-Host "✓ Pandoc found: $pandocVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Pandoc is not installed!" -ForegroundColor Red
    Write-Host "`nPlease install Pandoc:" -ForegroundColor Yellow
    Write-Host "  choco install pandoc" -ForegroundColor White
    Write-Host "`nOr visit: https://pandoc.org/installing.html" -ForegroundColor White
    exit 1
}

# Create output directory
if (-not (Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Force -Path $OutputPath | Out-Null
    Write-Host "✓ Created output directory: $OutputPath`n" -ForegroundColor Green
}

# Define conversions
$docs = @(
    @{
        Name = "User Guide"
        Input = @("USER_GUIDE_COMPLETE.md", "USER_GUIDE_PART2.md", "USER_GUIDE_PART3.md")
        Output = "LGIS_User_Guide_v1.0.docx"
    },
    @{
        Name = "Technical Guide"
        Input = @("TECHNICAL_GUIDE.md", "TECHNICAL_GUIDE_PART2.md")
        Output = "LGIS_Technical_Guide_v1.0.docx"
    },
    @{
        Name = "Deployment Manual"
        Input = @("DEPLOYMENT_MANUAL.md")
        Output = "LGIS_Deployment_Manual_v1.0.docx"
    }
)

$successCount = 0
$errorCount = 0

foreach ($doc in $docs) {
    Write-Host "📄 Converting $($doc.Name)..." -ForegroundColor Yellow
    
    # Check if input files exist
    $missingFiles = @()
    foreach ($file in $doc.Input) {
        $filePath = Join-Path $ScriptPath $file
        if (-not (Test-Path $filePath)) {
            $missingFiles += $file
        }
    }
    
    if ($missingFiles.Count -gt 0) {
        Write-Host "   ✗ Missing input files:" -ForegroundColor Red
        foreach ($file in $missingFiles) {
            Write-Host "     - $file" -ForegroundColor Red
        }
        $errorCount++
        continue
    }
    
    # Build Pandoc command
    $inputFiles = $doc.Input | ForEach-Object { Join-Path $ScriptPath $_ }
    $outputFile = Join-Path $OutputPath $doc.Output
    
    $pandocArgs = @(
        $inputFiles,
        "-o", $outputFile,
        "--toc",
        "--toc-depth=3",
        "--number-sections",
        "--highlight-style=tango"
    )
    
    try {
        & pandoc $pandocArgs 2>&1 | Out-Null
        
        if (Test-Path $outputFile) {
            $fileSize = (Get-Item $outputFile).Length / 1KB
            Write-Host "   ✓ Successfully converted" -ForegroundColor Green
            Write-Host "     Output: $outputFile" -ForegroundColor Gray
            Write-Host "     Size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Gray
            $successCount++
        } else {
            Write-Host "   ✗ Conversion failed - output file not created" -ForegroundColor Red
            $errorCount++
        }
    } catch {
        Write-Host "   ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Conversion Summary" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✓ Successful: $successCount" -ForegroundColor Green
Write-Host "  ✗ Failed:     $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Gray" })
Write-Host "  Output directory: $OutputPath" -ForegroundColor Gray
Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Cyan

if ($successCount -gt 0) {
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Open Word documents in the output folder" -ForegroundColor White
    Write-Host "2. Add professional cover pages" -ForegroundColor White
    Write-Host "3. Insert screenshots" -ForegroundColor White
    Write-Host "4. Apply organization branding" -ForegroundColor White
    Write-Host "5. Generate PDF versions`n" -ForegroundColor White
    
    # Open output folder
    Write-Host "Opening output folder..." -ForegroundColor Green
    Invoke-Item $OutputPath
}

exit $(if ($errorCount -gt 0) { 1 } else { 0 })
