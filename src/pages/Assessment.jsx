import { useState, useEffect } from 'react';

const quizData = [
  { id: 'q1', type: 'radio', question: '1. How many players are there in a Cricket team on the field?', options: ['9', '11', '12'], answer: '11', feedback: 'A standard cricket team has exactly 11 players.' },
  { id: 'q2', type: 'radio', question: '2. Which game primarily uses a goalpost for scoring?', options: ['Cricket', 'Tennis', 'Football'], answer: 'Football', feedback: 'Football uses a goalpost.' },
  { id: 'q3', type: 'text', question: '3. Name one position in Football.', answerMatches: ['forward', 'defender', 'midfielder', 'goalkeeper', 'striker'], feedback: 'Valid positions include Forward, Defender, Midfielder, or Goalkeeper.' },
  { id: 'q4', type: 'radio', question: '4. How high is a standard basketball hoop from the floor?', options: ['9 feet', '10 feet', '11 feet'], answer: '10 feet', feedback: 'A regulation basketball hoop is 10 feet high.' },
  { id: 'q5', type: 'radio', question: '5. In Tennis, what is a score of zero called?', options: ['Nil', 'Zero', 'Love'], answer: 'Love', feedback: 'Zero is called "Love" in tennis.' },
  { id: 'q6', type: 'text', question: '6. What is the projectile hit back and forth in badminton called?', answerMatches: ['shuttlecock', 'birdie', 'shuttle'], feedback: 'It is called a shuttlecock or birdie.' },
  { id: 'q7', type: 'radio', question: '7. How many quarters are in a standard Field Hockey match?', options: ['2', '3', '4'], answer: '4', feedback: 'Field hockey is played in four quarters.' },
  { id: 'q8', type: 'radio', question: '8. What is the length of a standard cricket pitch?', options: ['20 yards', '22 yards', '24 yards'], answer: '22 yards', feedback: 'A cricket pitch is 22 yards long.' },
  { id: 'q9', type: 'radio', question: '9. How many points is a standard basketball shot worth if taken inside the arc?', options: ['1', '2', '3'], answer: '2', feedback: 'Standard shots inside the arc are worth 2 points.' },
  { id: 'q10', type: 'radio', question: '10. Which type of tennis court is known for slowing down the ball and creating a high bounce?', options: ['Grass', 'Hard Court', 'Clay'], answer: 'Clay', feedback: 'Clay courts slow the ball down and produce a high bounce.' },
  { id: 'q11', type: 'radio', question: '11. At what score does a standard badminton game conclude (assuming a 2-point lead)?', options: ['15 points', '21 points', '25 points'], answer: '21 points', feedback: 'A standard game is played to 21 points.' },
  { id: 'q12', type: 'text', question: '12. In Ice Hockey, what is the flat rubber object used instead of a ball called?', answerMatches: ['puck'], feedback: 'It is called a puck.' },
  { id: 'q13', type: 'radio', question: '13. What color card indicates a player is ejected from a football match?', options: ['Yellow', 'Red', 'Black'], answer: 'Red', feedback: 'A Red Card means immediate ejection.' },
  { id: 'q14', type: 'text', question: '14. In basketball, taking more than a step and a half without dribbling is called what?', answerMatches: ['traveling', 'travel', 'traveling violation', 'walk'], feedback: 'This violation is called traveling.' },
  { id: 'q15', type: 'radio', question: '15. What is the maximum duration of a traditional Test Cricket match?', options: ['1 day', '3 days', '5 days'], answer: '5 days', feedback: 'Test cricket matches can last up to 5 days.' },
];

export default function Assessment() {
  const [timeLeft, setTimeLeft] = useState(60); // Timer set to 1 minute (60 seconds)
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [errors, setErrors] = useState({});

  // Timer Hook
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleEval(); // Auto-submit when time runs out
    }
  }, [timeLeft, submitted]);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleEval = (e) => {
    if (e) e.preventDefault();
    if (submitted) return; // Prevent double submission
    
    setSubmitted(true);
    let newScore = 0;
    let errs = {};

    quizData.forEach((q) => {
      const userAns = answers[q.id] || '';
      
      if (q.type === 'radio') {
        if (userAns === q.answer) {
          newScore++;
        } else {
          errs[q.id] = q.feedback;
        }
      } else if (q.type === 'text') {
        const cleanedAns = userAns.toLowerCase().trim();
        const isCorrect = q.answerMatches.some(match => cleanedAns.includes(match));
        
        if (isCorrect && cleanedAns !== '') {
          newScore++;
        } else {
          errs[q.id] = q.feedback;
        }
      }
    });

    setScore(newScore);
    setErrors(errs);

    if (newScore === quizData.length) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const el = document.createElement("div");
      el.classList.add("confetti");
      el.style.left = Math.random() * 100 + "vw";
      el.style.animationDuration = (Math.random() * 2 + 1) + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>Games Assessment</h1>
        <h3 style={{ color: timeLeft <= 15 ? '#ff5252' : '#03dac6', margin: 0 }}>
          Time Left: {formatTime(timeLeft)}
        </h3>
      </div>
      
      <p style={{ marginBottom: '30px' }}>Speed Challenge! You have only <strong>1 minute</strong> to complete all 15 questions.</p>
      
      <form onSubmit={handleEval}>
        {quizData.map((q) => (
          <div className="quiz-question" key={q.id}>
            <p style={{ fontSize: '1.1rem' }}><strong>{q.question}</strong></p>
            
            {q.type === 'radio' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {q.options.map((opt) => (
                  <label key={opt} style={{ cursor: submitted ? 'not-allowed' : 'pointer' }}>
                    <input 
                      type="radio" 
                      name={q.id} 
                      value={opt} 
                      onChange={handleChange} 
                      disabled={submitted}
                      checked={answers[q.id] === opt}
                      style={{ width: 'auto', margin: '0 10px 0 0' }}
                    /> 
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              <input 
                type="text" 
                name={q.id} 
                value={answers[q.id] || ''}
                onChange={handleChange} 
                disabled={submitted} 
                placeholder="Type your answer here..." 
                style={{ marginTop: '10px' }}
              />
            )}

            {errors[q.id] && (
              <div style={{ color: '#ff5252', fontSize: '14.5px', marginTop: '15px', padding: '10px', backgroundColor: 'rgba(255, 82, 82, 0.1)', borderRadius: '4px' }}>
                ❌ <strong>Incorrect:</strong> {errors[q.id]}
              </div>
            )}
            {submitted && !errors[q.id] && (
              <div style={{ color: '#03dac6', fontSize: '14.5px', marginTop: '15px' }}>
                ✅ Correct!
              </div>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
          <button type="submit" className="submit-btn" disabled={submitted} style={{ padding: '15px 30px', fontSize: '16px' }}>
            {submitted ? 'Time Up / Completed' : 'Submit Answers'}
          </button>
          
          {submitted && (
            <div style={{ fontWeight: 'bold' }}>
              <h2 style={{ color: score === 15 ? '#03dac6' : '#bb86fc', margin: 0 }}>
                Final Score: {score} / {quizData.length}
              </h2>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}