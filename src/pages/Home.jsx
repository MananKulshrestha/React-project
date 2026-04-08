import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = "Games Learning Center";
  const [slide, setSlide] = useState(0);
  const images = ["/home-banner.jpg", "/home-banner-2.jpg", "/home-banner-3.jpg"];

  // Typing Effect using React useEffect
  useEffect(() => {
    let i = 0;
    setText('');
    const timer = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Carousel Effect
  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card">
      <h1>{text}</h1>
      <div className="row-container">
        <div className="text-side">
          <p>Welcome to our simple website for learning about various games such as Cricket and Football.</p>
          <h3>About This Site</h3>
          <p>This website provides basic knowledge about game rules, player positions and ground details.</p>
          <h3>Why Learn Games?</h3>
          <ul>
            <li>To understand the rules of different games.</li>
            <li>To know player roles and positions.</li>
            <li>To learn about sports grounds and gameplay.</li>
          </ul>
        </div>
        <div className="image-side">
          <div style={{ position: 'relative', border: '2px solid #333', borderRadius: '6px', overflow: 'hidden' }}>
            <img 
              src={images[slide]} 
              alt={`Slide ${slide}`} 
              style={{ display: 'block', animation: 'fadeInSlideUp 0.8s ease-in-out' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}