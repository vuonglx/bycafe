# download-placeholder-images.ps1
#
# This script downloads placeholder images for the ByCafe e-commerce application
# to ensure the fallback system works properly when deployed to Netlify.

# Create necessary directories if they don't exist
$directories = @(
    "public\images",
    "public\images\banners",
    "public\images\products",
    "public\images\categories"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "Created directory: $dir"
    }
}

# Define image URLs and their local destinations
$imageMap = @(
    # Default placeholder
    @{
        Url = "https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\placeholder-product.jpg"
        Description = "Default Placeholder"
    },
    
    # Banner images
    @{
        Url = "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        Destination = "public\images\banners\coffee-banner.jpg"
        Description = "Coffee Banner"
    },
    @{
        Url = "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        Destination = "public\images\banners\equipment-banner.jpg"
        Description = "Equipment Banner"
    },
    @{
        Url = "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        Destination = "public\images\banners\sale-banner.jpg"
        Description = "Sale Banner"
    },
    
    # Product images
    @{
        Url = "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\products\ethiopian-yirgacheffe.jpg"
        Description = "Ethiopian Yirgacheffe"
    },
    @{
        Url = "https://images.pexels.com/photos/6802982/pexels-photo-6802982.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\products\coffee-grinder.jpg"
        Description = "Precision Coffee Grinder"
    },
    @{
        Url = "https://images.pexels.com/photos/6802985/pexels-photo-6802985.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\products\pour-over-set.jpg"
        Description = "Ceramic Pour-Over Set"
    },
    @{
        Url = "https://images.pexels.com/photos/4829098/pexels-photo-4829098.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\products\colombian-supremo.jpg"
        Description = "Colombian Supremo"
    },
    
    # Category images
    @{
        Url = "https://images.pexels.com/photos/4829098/pexels-photo-4829098.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\categories\coffee.jpg"
        Description = "Coffee Category"
    },
    @{
        Url = "https://images.pexels.com/photos/6802982/pexels-photo-6802982.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\categories\equipment.jpg"
        Description = "Equipment Category"
    },
    @{
        Url = "https://images.pexels.com/photos/6802985/pexels-photo-6802985.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\categories\accessories.jpg"
        Description = "Accessories Category"
    },
    @{
        Url = "https://images.pexels.com/photos/6802986/pexels-photo-6802986.jpeg?auto=compress&cs=tinysrgb&w=600"
        Destination = "public\images\categories\gifts.jpg"
        Description = "Gifts Category"
    }
)

# Download each image
$webClient = New-Object System.Net.WebClient

foreach ($image in $imageMap) {
    try {
        Write-Host "Downloading $($image.Description) to $($image.Destination)..."
        $webClient.DownloadFile($image.Url, $image.Destination)
        Write-Host "Downloaded successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download $($image.Description): $_" -ForegroundColor Red
    }
}

Write-Host "`nAll placeholder images have been downloaded.`n" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run 'npm run build' to create a new production build" -ForegroundColor Yellow
Write-Host "2. Run 'netlify deploy --prod' to deploy to Netlify" -ForegroundColor Yellow
