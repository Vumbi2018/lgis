# Zip the project and upload to remote server
$zipPath = "c:\lgis\lgis.zip"
$remotePath = "root@72.60.233.213:/root/"

if (Test-Path $zipPath) { Remove-Item $zipPath }

# Create zip excluding node_modules and other junk
Add-Type -AssemblyName System.IO.Compression.FileSystem
$exclude = @("node_modules", ".git", "dist", ".vite", "uploads")
$files = Get-ChildItem -Path "c:\lgis\" -Recurse | Where-Object { 
    $path = $_.FullName
    $match = $false
    foreach ($ex in $exclude) { if ($path -like "*\$ex\*") { $match = $true; break } }
    !$match
}

# Simple zip command
compress-archive -Path (Get-ChildItem -Path "c:\lgis" -Exclude node_modules, .git, dist, .vite, uploads) -DestinationPath $zipPath -Force

Write-Host "Uploading to Server..."
scp $zipPath $remotePath

Write-Host "Done! Now run the rebuild commands on your server."
