export default function SportCard({ sport, onClick }) {
  return (
    <div className="sport-card" onClick={() => onClick(sport)}>
      <div className="sport-card-img-wrapper">
        <img src={`/${sport}.jpg`} alt={`${sport} cover`} />
      </div>
      <div className="sport-card-content">
        <h3 style={{ textTransform: 'capitalize' }}>{sport}</h3>
        <span className="explore-btn">Explore &rarr;</span>
      </div>
    </div>
  );
}