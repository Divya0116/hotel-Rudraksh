import { motion } from 'framer-motion';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </motion.section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-layout">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Get in Touch</h2>
              <div className="info-item">
                <div className="icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>123 Hotel Street<br />City, State 12345<br />Country</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 9876543210</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@rudaraksh.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon">🕐</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>24/7 Reception<br />Restaurant: 7 AM - 11 PM</p>
                </div>
              </div>
            </motion.div>

            <motion.form 
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Send us a Message</h2>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="6" required></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

