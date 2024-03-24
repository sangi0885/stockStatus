import React, { useEffect, useState } from 'react';

const [data, setData] = useState([]);

useEffect(() => {
  fetch('/api')
    .then(response => response.json())
    .then(data => setData(data));
})

export default function App() {
  return (
    <div>
      woohoo
    </div>
  );
}
