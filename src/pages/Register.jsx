export default function Register() {
  return (
    <div className="card">
      <h1>Course Registration</h1>
      <div className="row-container">
        <div className="text-side">
          <p>Register to learn about Cricket and Football.</p>
          <form onSubmit={e => e.preventDefault()}>
            <label>Name:</label> <input type="text" placeholder="Enter your full name" />
            <label>Email:</label> <input type="email" placeholder="Enter your email" />
            <label>Select Course:</label>
            <select>
              <option>Cricket Basics</option>
              <option>Football Basics</option>
              <option>Cricket and Football Rules</option>
            </select>
            <br/><br/>
            <button type="submit" className="submit-btn">Register</button>
            <input type="reset" value="Clear" />
          </form>
        </div>
        <div className="image-side">
          <img src="/signup.png" alt="Register" />
        </div>
      </div>
    </div>
  );
}