import SportsCard from '../components/SportsCard';

export default function Learn({ navigate }) {
  const sports = ['cricket', 'football', 'basketball', 'tennis', 'badminton', 'hockey'];

  const handleCardClick = (sportName) => {
    navigate('sport', sportName);
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