export default function Learn({ navigate }) {
  const sports = ['cricket', 'football', 'basketball', 'tennis', 'badminton', 'hockey'];

  return (
    <div className="card">
      <h1>Interactive Course Learning</h1>
      <p>Select a sport below to explore its basic rules, gameplay mechanics, and details.</p>
      <div className="sports-grid">
        {sports.map(sport => (
          <div key={sport} className="sport-card" onClick={() => navigate('sport', sport)}>
            <img src={`/${sport}.jpg`} alt={sport} />
            <h3 style={{ textTransform: 'capitalize' }}>{sport}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}