import { useState, useEffect } from 'react';

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;