$inputPath = "c:\lgis\database_backup.sql"
$outputPath = "c:\lgis\database_backup_clean.sql"

# Read all lines
$content = Get-Content $inputPath

# Filter out the problematic line
$cleanContent = $content | Where-Object { $_ -notmatch '^\\restrict' }

# Save as UTF8 WITHOUT BOM (Postgres requirement on Linux)
$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($outputPath, $cleanContent, $encoding)

Write-Host "Cleaned backup (UTF8 No BOM) created at $outputPath"
