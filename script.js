import { useState } from 'react';

function WeddingAlbumForm() {
  const [interestedInAlbum, setInterestedInAlbum] = useState(null);

  const handleAlbumChange = (event) => {
    setInterestedInAlbum(event.target.value);
  };

  return (
    <div>
      <label>Are you interested in a wedding album?</label>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <input
            type="radio"
            name="album"
            value="yes"
            checked={interestedInAlbum === 'yes'}
            onChange={handleAlbumChange}
          />
          Yes
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <input
            type="radio"
            name="album"
            value="no"
            checked={interestedInAlbum === 'no'}
            onChange={handleAlbumChange}
          />
          No
        </label>
      </div>

      {interestedInAlbum === 'yes' && (
        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="style">
            What style do you prefer? <span style={{ fontStyle: 'italic' }}>(e.g., Traditional, Photojournalistic, Fine Art, Rustic)</span>
          </label>
          <input type="text" id="style" name="style" style={{ display: 'block', marginTop: '0.3rem' }} />
        </div>
      )}
    </div>
  );
}

export default WeddingAlbumForm;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dcfjmzumt/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'InspirationUploads';

function addInspiration() {
  const container = document.getElementById("inspirations-container");
  const input = document.createElement("input");
  input.type = "url";
  input.name = "Inspirations";
  input.placeholder = "e.g., Pinterest board link";
  input.style.display = "block";
  input.style.marginBottom = "0.5rem";
  container.appendChild(input);
}

function uploadToCloudinary(event) {
  const files = event.target.files;
  const previewContainer = document.getElementById("image-previews");
  const hiddenInputContainer = document.getElementById("cloudinary-hidden-inputs");

  Array.from(files).forEach(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (!data.secure_url) {
        alert("Upload failed: no URL returned.");
        console.error("Missing secure_url in Cloudinary response", data);
        return;
      }

      const imageUrl = data.secure_url;
      console.log("Image uploaded:", imageUrl);

      // Show preview
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.maxWidth = '100px';
      img.style.maxHeight = '100px';
      img.style.border = '1px solid #ccc';
      img.style.borderRadius = '4px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '0.5rem';
      previewContainer.appendChild(img);

      // Hidden input for Formspree
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'Uploaded Image';
      input.value = imageUrl;
      hiddenInputContainer.appendChild(input);
    })
    .catch(err => {
      alert('Upload failed. Please try again.');
      console.error("Cloudinary upload error:", err);
    });
  });
}

