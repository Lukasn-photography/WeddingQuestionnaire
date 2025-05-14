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
