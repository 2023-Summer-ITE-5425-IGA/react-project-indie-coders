import React from 'react';

const Career: React.FC = () => {
  return (
    <div className="career-page">
      <h1>Join Our Team</h1>
      <p>We're a passionate and innovative team dedicated to creating amazing products that make a difference.</p>

      <h2>Why Work with Us?</h2>
      <p>At Indie-Coders we value collaboration, creativity, and personal growth. Join us to be part of a dynamic environment where your ideas are heard and your contributions matter.</p>

      <h2>Current Openings</h2>
      <div className="job-list">
        <div className="job-item">
          <h3>Frontend Developer</h3>
          <p>We're looking for a skilled frontend developer who is passionate about creating elegant and user-friendly interfaces using modern technologies.</p>
          <button className="apply-button">Apply Now</button>
        </div>

        <div className="job-item">
          <h3>UI/UX Designer</h3>
          <p>If you have an eye for aesthetics and a passion for creating intuitive user experiences, join our design team to shape the visual identity of our products.</p>
          <button className="apply-button">Apply Now</button>
        </div>

        {/* Add more job listings here */}
      </div>

      <h2>Benefits</h2>
      <ul className="benefits-list">
        <li>Competitive salary and bonuses</li>
        <li>Flexible working hours</li>
        <li>Health and wellness programs</li>
        <li>Ongoing learning and development opportunities</li>
        <li>Fun and inclusive company culture</li>
      </ul>

      <h2>Ready to Join Us?</h2>
      <p>If you're excited about the possibilities and ready to contribute your skills to our team, we'd love to hear from you. Take the next step in your career by applying today!</p>
      <button className="apply-button">Apply Now</button>
    </div>
  );
};

export default Career;
