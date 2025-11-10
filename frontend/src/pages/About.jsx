import { motion } from 'framer-motion';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1>About Rudaraksh Hotel</h1>
          <p>Your luxury destination in the heart of the city</p>
        </div>
      </motion.section>

      <section className="about-content">
        <div className="container">
          <motion.div 
            className="about-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Story</h2>
            <p>
              Rudaraksh Hotel was founded with a vision to provide exceptional hospitality 
              and create unforgettable experiences for our guests. Since our inception, we 
              have been committed to combining traditional hospitality with modern luxury.
            </p>
          </motion.div>

          <motion.div 
            className="about-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Mission</h2>
            <p>
              To provide world-class accommodation and exceptional service, ensuring every guest 
              leaves with cherished memories. We strive to maintain the highest standards of 
              hospitality while respecting our guests' privacy and comfort.
            </p>
          </motion.div>

          <motion.div 
            className="about-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose Us</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="icon">⭐</div>
                <h3>Premium Quality</h3>
                <p>High-end amenities and luxurious accommodations</p>
              </div>
              <div className="feature-item">
                <div className="icon">🎯</div>
                <h3>Central Location</h3>
                <p>Conveniently located in the heart of the city</p>
              </div>
              <div className="feature-item">
                <div className="icon">👥</div>
                <h3>Expert Staff</h3>
                <p>Dedicated team committed to your satisfaction</p>
              </div>
              <div className="feature-item">
                <div className="icon">🏆</div>
                <h3>Award Winning</h3>
                <p>Recognized for excellence in hospitality</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;

