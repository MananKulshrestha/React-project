import { useState } from 'react';

export default function Feedback() {
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(0);

  // Controlled input formatting
  const handlePhone = (e) => {
    let cleaned = e.target.value.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.substring(0, 10);
    if (cleaned.length > 5) cleaned = cleaned.substring(0, 5) + ' ' + cleaned.substring(5);
    setPhone(cleaned);
  };

  return (
    <div className="card">
      <h1>Feedback and Contact Us</h1>
      <div className="row-container">  
        <div className="text-side">
          <p>We value your feedback! Please fill out the form below or reach us via email.</p>
          <form onSubmit={e => e.preventDefault()}>
            <label>Your Name:</label> <input type="text" placeholder="John Doe" />
            <label>Your Email:</label> <input type="email" placeholder="john@example.com" />
            <label>Phone Number (Optional):</label> 
            <input type="text" value={phone} onChange={handlePhone} placeholder="97XXX 86XXXX" />
            
            <label>Rate your experience:</label>
            <div className="star-rating">
              {[1,2,3,4,5].map(star => (
                <span key={star} onClick={() => setRating(star)} className={star <= rating ? 'active' : ''}>★</span>
              ))}
            </div>

            <label>Your Feedback:</label>
            <textarea rows="5" placeholder="Write your message here..."></textarea>
            <button type="submit" className="submit-btn">Send Feedback</button>
          </form>
        </div>
        <div className="image-side">
          <img src="/contact.jpg" alt="Contact Us" />
        </div>
      </div>
    </div>
  );
}