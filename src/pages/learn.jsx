import { useNavigate } from 'react-router-dom';
import SportsCard from '../components/SportCard';

export default function Learn() {
  const navigate = useNavigate();
  const sports = ['cricket', 'football', 'basketball', 'tennis', 'badminton', 'hockey'];

  const handleCardClick = (sportName) => {
    // Navigate dynamically using the URL structure defined in App.jsx
    navigate(`/sport/${sportName}`);
  };

  return (
    <div className="card">
      <h1>Interactive Course Learning</h1>
      <p>Select a sport below to explore its basic rules, gameplay mechanics, and details.</p>
      
      <div className="sports-grid">
        {sports.map(sport => (
          <SportsCard 
            key={sport} 
            sport={sport} 
            onClick={handleCardClick} 
          />
        ))}
      </div>
    </div>
  );
}