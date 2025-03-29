$alternativeImageUrls = @(
    @{
        "url" = "https://images.unsplash.com/photo-1611575619124-ff1904956f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-beans-detail1.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1497935586047-9395ee065e52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-beans-detail2.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "brewing-equipment-detail1.jpg"
    }
)

$outputDir = ".\public\images"

# Create the directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Download each image
foreach ($image in $alternativeImageUrls) {
    $outputPath = Join-Path $outputDir $image.filename
    
    # Only download if the file doesn't exist
    if (-not (Test-Path $outputPath)) {
        Write-Host "Downloading $($image.filename)..."
        
        try {
            Invoke-WebRequest -Uri $image.url -OutFile $outputPath
            Write-Host "Downloaded to $outputPath"
        } catch {
            Write-Host "Failed to download $($image.filename): $_"
        }
    } else {
        Write-Host "File $($image.filename) already exists, skipping..."
    }
}

Write-Host "All alternative images downloaded!"
