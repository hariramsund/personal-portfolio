import { useState } from 'react';
import './LocationDropdown.css';

const LOCATIONS = ['Chennai', 'Mumbai', 'Lucknow', 'Hyderabad', 'Kolkata', 'Kerala', 'Karnataka', 'Punjab', 'Delhi', 'J&K'];

function LocationDropdown() {
  const [location, setLocation] = useState('');

  return (
    <div className="location-container">
      <label>Company Location</label>
      <select value={location} onChange={(e) => setLocation(e.target.value)} className="location-select">
        <option value="">-- Select Location --</option>
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      {location && <p className="selected">Selected: <strong>{location}</strong></p>}
    </div>
  );
}

export default LocationDropdown;
