import { useState, useEffect } from 'react';
import ImageCarousel from '../components/ImageCarousel';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = "Games Learning Center";
  const bannerImages = ["/home-banner.jpg", "/home-banner-2.jpg", "/home-banner-3.jpg"];

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
          {/* Using the new reusable ImageCarousel component */}
          <ImageCarousel images={bannerImages} interval={3500} />
        </div>
      </div>
    </div>
  );
}