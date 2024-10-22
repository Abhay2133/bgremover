"use client"; // Required for using hooks in Next.js 13

import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/remove-bg', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      setResultUrl(URL.createObjectURL(blob));
    } else {
      console.error('Error removing background');
    }
  };

  return (
    <div>
      <h1>Background Remover</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Remove Background</button>
      </form>
      {resultUrl && (
        <div>
          <h2>Result:</h2>
          <img src={resultUrl} alt="Result" />
        </div>
      )}
    </div>
  );
}
