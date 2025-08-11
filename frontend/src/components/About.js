import React from 'react';
import './style/About.css';

export default function About() {
  return (
    <div className="about-container">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img
          src="https://tse3.mm.bing.net/th/id/OIP.C0f4j0Wrs2Ks5duf0-jGjgHaHG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Profile"
          className="about-profile-img"
        />
        <div className="about-title">About Dear Daizy</div>
      </div>
      <hr className="about-divider" />
      <div className="about-content">
        Welcome to <span className="about-highlight">My Notebook</span>!<br/>
        This is your personal digital diary, designed to capture your thoughts, memories, and ideas in a beautiful, hand-written style.<br/>
        <br/>
        <span className="about-highlight">Features:</span><br/>
  <ul className="about-features-list">
          <li>📝 Effortlessly add, edit, and delete notes</li>
          <li>🎨 Enjoy a playful, notebook-inspired design</li>
          <li>🔒 Your notes are private and secure</li>
          <li>📱 Responsive and mobile-friendly</li>
        </ul>
        <span className="about-highlight">Why a Notebook?</span><br/>
        Because every memory deserves a page, and every idea deserves a place to grow!
      </div>
      <div className="about-gallery">
        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" alt="Notebook" className="about-gallery-img" />
        <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Writing" className="about-gallery-img" />
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Desk" className="about-gallery-img" />
      </div>
    </div>
  );
}
