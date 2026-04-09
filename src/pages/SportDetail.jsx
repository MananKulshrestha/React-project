import { useParams, useNavigate } from 'react-router-dom';

// Expanded data store with detailed, multi-paragraph content and interleaved images
const sportData = {
  cricket: {
    title: 'Cricket',
    text1: 'Cricket is a deeply strategic bat-and-ball game played between two teams of eleven players. The game is played on a large oval-shaped grass field, at the center of which is a 22-yard-long rectangular pitch. The fielding team disperses around the ground, while two players from the batting team stand at opposite ends of the pitch. The objective of the batting team is to score as many runs as possible, while the fielding team attempts to dismiss the batters (get them "out") and restrict the run total. Cricket is renowned for its complex tactics, varying pitch conditions, and the profound impact of weather on the game.',
    img1: '/cricket1.jpg',
    text2: 'The primary mechanism of the game involves the bowler propelling the hard leather ball towards the wicket at the opposite end of the pitch, defending by the batter. The batter must strike the ball to score runs by running between the wickets or hitting the ball over the boundary line. A ball hit along the ground to the boundary scores four runs, while a ball hit over the boundary in the air scores six. Dismissals occur in several ways: being "bowled" (the ball hits the stumps), being "caught" (a fielder catches a hit ball before it touches the ground), or "LBW" (Leg Before Wicket, where the ball strikes the batter\'s leg blocking the stumps).',
    img2: '/cricket2.jpg',
    text3: 'Cricket is unique in its variety of formats, each demanding completely different skill sets. The most traditional format is "Test Cricket," a grueling physical and mental battle that can last up to five days. "One Day Internationals" (ODIs) are faster-paced, lasting about 8 hours with each team receiving 50 overs (sets of six deliveries). The most modern and explosive format is "T20" (Twenty20), a roughly 3-hour match where each team plays 20 overs. T20 has revolutionized the sport, leading to massive franchise leagues like the Indian Premier League (IPL) and bringing explosive, big-hitting action to a global audience.'
  },
  football: {
    title: 'Football (Soccer)',
    text1: 'Football, known as soccer in some regions, is the undisputed most popular sport on the planet. It is a fluid, continuous team game played between two sides of 11 players. The primary objective is breathtakingly simple: use any part of the body—except the hands and arms—to propel a spherical ball into the opposing team\'s rectangular goal. Played on a large rectangular grass or artificial turf pitch, a standard match lasts for 90 minutes, divided into two 45-minute halves. The team with the most goals at the final whistle is declared the victor.',
    img1: '/football1.jpg',
    text2: 'Despite its simple premise, football requires immense tactical discipline and physical stamina. Players are assigned specific roles on the pitch. The Goalkeeper is the only player permitted to touch the ball with their hands, and strictly only within their designated penalty area. Defenders form a wall in front of the goalkeeper to thwart attacks. Midfielders act as the engine of the team, bridging the gap between defense and attack, while Forwards (or Strikers) are the primary goal-scorers. One of the most crucial and debated rules is the "Offside" rule, which prevents attackers from simply waiting directly next to the opponent\'s goal by requiring them to be behind the second-to-last defender when a pass is made to them.',
    img2: '/football2.jpg',
    text3: 'Fouls and misconduct are strictly policed by the referee. Minor infractions result in a free-kick to the opposing team. More severe fouls, or unsporting behavior, are punished with a Yellow Card as a formal warning. If a player receives two yellow cards in one match, or commits an egregiously dangerous foul, they are shown a Red Card and sent off the pitch, leaving their team a man down for the remainder of the match. The pinnacle of global football is the FIFA World Cup, held every four years, which stops entire nations and is watched by billions across the globe.'
  },
  basketball: {
    title: 'Basketball',
    text1: 'Basketball is a remarkably fast-paced, high-scoring sport played by two teams of five players on a rectangular indoor court. Invented in 1891 by Dr. James Naismith using peach baskets, the objective is to score points by successfully shooting a basketball through a circular hoop elevated 10 feet above the floor at the opponent\'s end of the court. The ball must be moved down the court strictly by bouncing it while walking or running (dribbling) or by passing it to teammates. The fluid nature of the game results in rapid transitions between offense and defense.',
    img1: '/basketball1.jpg',
    text2: 'Scoring in basketball is dynamic. A standard field goal made from inside the large arc (the three-point line) is worth two points. A shot made from beyond this arc is rewarded with three points, a mechanic that has heavily influenced modern basketball strategy. If a player is fouled while attempting to shoot, they are awarded undefended "free throws" from the foul line, each worth one point. The game is governed by a strict "shot clock," (usually 24 seconds in professional leagues), which forces the offensive team to attempt a shot that at least hits the rim before time expires, preventing teams from simply holding the ball to stall.',
    img2: '/basketball2.jpg',
    text3: 'A standard basketball lineup features specialized positions tailored to player heights and skillsets. The Point Guard directs the offense and distributes the ball. The Shooting Guard is typically a team\'s premier perimeter scorer. The Small Forward is a versatile wing player who can both drive to the basket and shoot. The Power Forward plays close to the basket, focusing on rebounding and interior scoring, while the Center, usually the tallest player on the team, anchors the defense and secures rebounds. The NBA (National Basketball Association) represents the highest level of the sport globally.'
  },
  tennis: {
    title: 'Tennis',
    text1: 'Tennis is a prestigious racket sport that can be played individually against a single opponent (singles) or between two teams of two players each (doubles). Players utilize a tightly strung racket to strike a hollow, felt-covered rubber ball over a central net into the opponent\'s court. The fundamental goal is to maneuver the ball in such a way that the opponent cannot play a valid return—either by hitting it out of bounds, into the net, or simply hitting an unreturnable shot (a "winner").',
    img1: '/tennis1.jpg',
    text2: 'The scoring system in tennis is notoriously unique and rooted in history. A game is won by the first player to win four points, but the points are called Love (0), 15, 30, and 40. If both players reach 40, the score is called "Deuce," and a player must win two consecutive points to secure the game. Winning six games (with a margin of two) earns a player a "Set," and matches are typically played as best-of-three or best-of-five sets. To begin a point, a player must "serve" the ball by tossing it into the air and striking it diagonally into the opponent\'s service box.',
    img2: '/tennis2.jpg',
    text3: 'What truly sets tennis apart is the variety of surfaces it is played on, each drastically altering the speed and bounce of the ball. "Hard courts" offer a predictable, medium-fast game. "Clay courts," made of crushed brick, slow the ball down and produce a high bounce, favoring incredibly fit players who can endure long rallies. "Grass courts" are the traditional, fast surface where the ball skids low, heavily favoring aggressive serve-and-volley players. The professional calendar revolves around four massive "Grand Slam" tournaments played across these different surfaces.'
  },
  badminton: {
    title: 'Badminton',
    text1: 'Badminton is an incredibly rapid and highly aerobic racket sport played using lightweight rackets to hit a unique projectile known as a shuttlecock (or "birdie") across a raised net. It is played on a rectangular indoor court, either as "singles" (one against one) or "doubles" (two against two). The shuttlecock, traditionally made from 16 goose feathers embedded in a cork base, has high drag and flies very differently from a standard ball. It decelerates rapidly but can be smashed downwards at speeds exceeding 400 km/h (250 mph), making badminton the fastest racket sport in the world.',
    img1: '/badminton1.jpg',
    text2: 'A badminton match utilizes a "rally point" scoring system, meaning a point is awarded to the winner of every single rally, regardless of who served. Matches are played as the best-of-three games, with each game played to 21 points. To win a game, a player or team must win by at least a two-point margin. The serve in badminton must be hit below the waist, hit diagonally into the opponent\'s service court, and a rally continues until the shuttlecock touches the floor or is hit entirely out of bounds.',
    img3: '/badminton2.jpg',
    text3: 'Mastering badminton requires exceptional reflexes, agility, and a diverse repertoire of strokes. The "Clear" is a defensive, high, and deep shot pushing the opponent to the back of their court. The "Drop Shot" is a delicate, deceptive stroke meant to fall just inches over the net, catching a deep-playing opponent off guard. The most spectacular shot is the "Smash," an aggressive, powerful overhead strike aimed steeply downwards to end the rally instantly. At the elite level, players must seamlessly transition between these shots while lunging and diving across the court.'
  },
  hockey: {
    title: 'Hockey',
    text1: 'Hockey is a broad term that refers to a family of fast-paced team sports where players use curved sticks to maneuver a ball or puck into an opponent\'s goal. The two most globally recognized variants are Field Hockey, played on grass or synthetic turf, and Ice Hockey, played on an enclosed ice rink. Despite their differences in surface and equipment, both sports share the core principles of intricate passing, rapid transitions between offense and defense, and a high level of cardiovascular endurance.',
    img1: '/hockey1.jpg',
    text2: 'Field Hockey features 11 players per side. Players use a J-shaped stick and are strictly only allowed to strike the hard plastic ball with the flat side of the stick. For safety reasons, "high sticking" (raising the stick above the shoulder) is penalized. A unique rule in Field Hockey is that a goal can only be scored if an attacking player touches the ball inside the "striking circle"—a semi-circular area directly in front of the goalposts. Matches consist of four 15-minute quarters of intense, stamina-draining action.',
    img2: '/hockey2.jpg',
    text3: 'Ice Hockey, immensely popular in North America and Northern Europe, is famously physical. It is played by six players per team on the ice (including a heavily padded goaltender) who glide on ice skates while manipulating a flat, vulcanized rubber "puck." Because of the extreme physical exertion, teams constantly rotate players on and off the ice in short "shifts." Ice hockey permits full-body contact ("checking") to separate players from the puck. The NHL (National Hockey League) is the premier professional league for this grueling, lightning-fast winter sport.'
  }
};

export default function SportDetail() {
  const { sportName } = useParams(); // Fetch the sport from the URL
  const navigate = useNavigate();

  // Fallback data if a sport isn't found
  const data = sportData[sportName] || { 
    title: 'Sport Not Found', 
    text1: 'Details coming soon.', 
    img1: null, text2: '', img2: null, text3: '' 
  };

  return (
    <div className="card sport-detail-card">
      <h1 className="sport-detail-title">{data.title}</h1>
      
      <div className="sport-detail-content">
        <p className="sport-text">{data.text1}</p>
        
        {data.img1 && (
          <div className="sport-img-wrapper">
            <img src={data.img1} alt={`${data.title} action 1`} className="sport-detail-img" />
          </div>
        )}
        
        {data.text2 && <p className="sport-text">{data.text2}</p>}
        
        {data.img2 && (
          <div className="sport-img-wrapper">
            <img src={data.img2} alt={`${data.title} action 2`} className="sport-detail-img" />
          </div>
        )}
        
        {data.text3 && <p className="sport-text">{data.text3}</p>}
      </div>
      
      <div className="back-btn-container">
        <span className="link back-btn" onClick={() => navigate('/learn')}>&larr; Back to Courses</span>
      </div>
    </div>
  );
}