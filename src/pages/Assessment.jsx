import { useState, useEffect } from 'react';

export default function Assessment() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [errors, setErrors] = useState({});

  // Timer Hook
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleEval();
    }
  }, [timeLeft, submitted]);

  const handleChange = (e) => setAnswers({ ...answers, [e.target.name]: e.target.value });

  const handleEval = (e) => {
    if (e) e.preventDefault();
    setSubmitted(true);
    let newScore = 0;
    let errs = {};

    if (answers.q1 === '11') newScore++; else errs.q1 = 'A standard cricket team has exactly 11 players.';
    if (answers.q2 === 'Football') newScore++; else errs.q2 = 'Football uses a goalpost.';
    
    const q3Clean = answers.q3.toLowerCase();
    if (['forward', 'defender', 'midfielder', 'goalkeeper'].some(pos => q3Clean.includes(pos))) newScore++;
    else errs.q3 = 'Valid positions include: Forward, Defender, Midfielder, or Goalkeeper.';

    setScore(newScore);
    setErrors(errs);

    if (newScore === 3) triggerConfetti();
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
      <h1>Games Assessment</h1>
      <h3 style={{ color: '#ff5252', textAlign: 'right', marginTop: '-40px' }}>Time Left: {formatTime(timeLeft)}</h3>
      
      <div className="row-container">
        <div className="text-side">
          <form onSubmit={handleEval}>
            
            <div className="quiz-question">
              <p><strong>1. How many players are there in a Cricket team?</strong></p>
              <input type="radio" name="q1" value="9" onChange={handleChange} disabled={submitted}/> 9 Players<br/>
              <input type="radio" name="q1" value="11" onChange={handleChange} disabled={submitted}/> 11 Players<br/>
              <input type="radio" name="q1" value="12" onChange={handleChange} disabled={submitted}/> 12 Players
              {errors.q1 && <div style={{ color: '#ff5252', fontSize: '14px', marginTop: '10px' }}>❌ {errors.q1}</div>}
            </div>

            <div className="quiz-question">
              <p><strong>2. Which game uses a goalpost?</strong></p>
              <input type="radio" name="q2" value="Cricket" onChange={handleChange} disabled={submitted}/> Cricket<br/>
              <input type="radio" name="q2" value="Football" onChange={handleChange} disabled={submitted}/> Football
              {errors.q2 && <div style={{ color: '#ff5252', fontSize: '14px', marginTop: '10px' }}>❌ {errors.q2}</div>}
            </div>

            <div className="quiz-question">
              <p><strong>3. Name one position in Football.</strong></p>
              <input type="text" name="q3" onChange={handleChange} disabled={submitted} placeholder="Type answer here..." />
              {errors.q3 && <div style={{ color: '#ff5252', fontSize: '14px', marginTop: '10px' }}>❌ {errors.q3}</div>}
            </div>

            <button type="submit" className="submit-btn" disabled={submitted}>Submit Answers</button>
          </form>
          {submitted && (
            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
              <h3 style={{ color: '#bb86fc' }}>You scored {score} out of 3!</h3>
            </div>
          )}
        </div>
        <div className="image-side">
          <img src="/quiz.png" alt="Assessment" />
        </div>
      </div>
    </div>
  );
}