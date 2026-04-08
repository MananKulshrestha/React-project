export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Games Learning Center. All rights reserved.</p>
        <div className="footer-links">
          <span className="link">Privacy Policy</span>
          <span className="link">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}