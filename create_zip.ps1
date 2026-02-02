Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "c:\lgis\lgis.zip"
$root = "c:\lgis\"

if (Test-Path $zipPath) { Remove-Item $zipPath }

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')

# More precise exclusion regex using anchors and escaping dots
$excludeRegex = "^c:\\lgis\\(node_modules|\.git|dist|lgis\.zip|test_zip|zip_contents_test|create_zip\.ps1)(\\|$)"

$files = Get-ChildItem -Path $root -Recurse | Where-Object { 
    $_.FullName -notmatch $excludeRegex -and -not $_.PSIsContainer 
}

foreach ($f in $files) {
    # Ensure RELATIVE path starts AFTER c:\lgis\
    $rel = $f.FullName.Substring($root.Length).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $f.FullName, $rel)
    # Write-Host "Added: $rel"
}

$zip.Dispose()
Write-Host "Zip created successfully at $zipPath"
