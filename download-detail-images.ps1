$detailImageUrls = @(
    @{
        "url" = "https://images.unsplash.com/photo-1580933026091-60c7a0c34341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-beans-detail1.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-beans-detail2.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "brewing-equipment-detail1.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "brewing-equipment-detail2.jpg"
    }
)

$outputDir = ".\public\images"

# Create the directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Download each image
foreach ($image in $detailImageUrls) {
    $outputPath = Join-Path $outputDir $image.filename
    Write-Host "Downloading $($image.filename)..."
    
    try {
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath
        Write-Host "Downloaded to $outputPath"
    } catch {
        Write-Host "Failed to download $($image.filename): $_"
    }
}

Write-Host "All detail images downloaded!"
