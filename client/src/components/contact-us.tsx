// contactUs.tsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/contactUs.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navigation from './Navigation';

const ContactUs: React.FC = () => {
  return (
    <>
    <Navigation/>
    <div className="container contact-us">
      <div className="row">
        <div className="col-md-6">
          <div className="contact-details">
            <h1 style={{ textAlign: 'left' }}>Contact Details</h1>
            <br />
            <h4>Phone:</h4> <p>+1-123-456-7890</p> <hr />
            <h4>Email:</h4> <p>contact@socialmedia.com</p> <hr /> 
            <h4>Address:</h4> <p>56th Street, North Side, NY, USA</p> <hr /> 
            <div className="social-media-icons">
            <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className='contact-form'>
          <h1 style={{ textAlign: 'left' }}>Get in touch with Us</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows={3}></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
