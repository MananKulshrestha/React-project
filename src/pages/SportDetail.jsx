// Simplified data store mimicking your individual HTML pages
const sportData = {
  cricket: {
    title: 'Cricket',
    desc: 'Cricket is a bat-and-ball game played between two teams of eleven players on a field at the center of which is a 22-yard pitch.',
    images: ['/cricket1.jpg', '/cricket2.jpg']
  },
  football: {
    title: 'Football (Soccer)',
    desc: 'Football is a team sport played between two teams of 11 players who primarily use their feet to propel a ball around a rectangular field.',
    images: ['/football1.jpg', '/football2.jpg']
  },
  // Add basketball, tennis, badminton, hockey data here following the same structure
};

export default function SportDetail({ sport, navigate }) {
  const data = sportData[sport] || { title: 'Sport', desc: 'Details coming soon.', images: [] };

  return (
    <div className="card">
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
      <div className="sport-images-row">
        {data.images.map((img, i) => <img key={i} src={img} alt="sport view" />)}
      </div>
      <br/>
      <span className="link" onClick={() => navigate('learn')}>&larr; Back to Courses</span>
    </div>
  );
}