$imageUrls = @(
    @{
        "url" = "https://images.unsplash.com/photo-1559525323-cbb5269e4497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "ethiopian-yirgacheffe.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "colombian-supremo.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "chemex-pour-over.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1587734361993-0490df9a84b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "espresso-blend.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "ceramic-mug.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-grinder.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1621555470436-d36e9683bae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "kenya-aa.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-gift-set.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "dark-roast-blend.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "french-press.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1517705600644-e86f11e8b1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "coffee-scale.jpg"
    },
    @{
        "url" = "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        "filename" = "guatemala-antigua.jpg"
    }
)

$outputDir = ".\public\images"

# Create the directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Download each image
foreach ($image in $imageUrls) {
    $outputPath = Join-Path $outputDir $image.filename
    Write-Host "Downloading $($image.filename)..."
    
    try {
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath
        Write-Host "Downloaded to $outputPath"
    } catch {
        Write-Host "Failed to download $($image.filename): $_"
    }
}

Write-Host "All downloads completed!"
