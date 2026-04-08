import { useState } from 'react';

export default function Register() {
  // React Forms: Using state to control the form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'Cricket Basics'
  });

  // Data array to demonstrate React Lists
  const availableCourses = [
    'Cricket Basics',
    'Football Basics',
    'Cricket and Football Rules'
  ];

  // React Events: Handling input changes universally
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // React Events: Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration successful! Welcome, ${formData.name}. You are enrolled in ${formData.course}.`);
    
    // Clear the form after submission
    setFormData({ name: '', email: '', course: 'Cricket Basics' });
  };

  // React Events: Handling the reset button
  const handleReset = () => {
    setFormData({ name: '', email: '', course: 'Cricket Basics' });
  };

  return (
    <div className="card">
      <h1>Course Registration</h1>
      <div className="row-container">
        <div className="text-side">
          <p>Register to learn about Cricket and Football.</p>
          
          {/* React Forms & Events */}
          <form onSubmit={handleSubmit} onReset={handleReset}>
            
            <label>Name:</label> 
            <input 
              type="text" 
              name="name"
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <label>Email:</label> 
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <label>Select Course:</label>
            <select name="course" value={formData.course} onChange={handleChange}>
              
              {/* React Lists: Mapping over the array to generate <option> tags */}
              {availableCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
              
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