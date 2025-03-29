import React, { useState } from 'react';
import '../../styles/ImageGallery.css';

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={images[selectedImage]} alt="Main product view" />
      </div>
      <div className="thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`Product view ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
