import { motion } from "framer-motion";
import "./About.css";

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
          <p>Comfortable, reliable stays in the heart of Pinjore</p>
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
              Rudaraksh Hotel was established with a simple vision&mdash;to
              offer clean, comfortable, and reliable stays for travellers who
              value quality at the right price. From day one, we have focused on
              creating a welcoming environment where guests feel at home,
              whether they are here for business, leisure, or family travel.
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
              Our mission is to deliver a pleasant and hassle-free stay through
              consistent service, well-maintained rooms, and a guest-first
              approach. We aim to provide honest hospitality where comfort,
              safety, and convenience come together.
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
                <h3>Comfort You Can Trust</h3>
                <p>
                  Well-furnished rooms designed to provide a peaceful, relaxing
                  stay.
                </p>
              </div>
              <div className="feature-item">
                <div className="icon">📍</div>
                <h3>Convenient Location</h3>
                <p>
                  Easy access to major routes, markets, and local attractions
                  for worry-free travel.
                </p>
              </div>
              <div className="feature-item">
                <div className="icon">👥</div>
                <h3>Friendly Staff</h3>
                <p>
                  A trained team ready to assist you with care, respect, and
                  professionalism.
                </p>
              </div>
              <div className="feature-item">
                <div className="icon">🧼</div>
                <h3>Clean &amp; Hygienic</h3>
                <p>
                  Regular housekeeping and high hygiene standards to ensure your
                  comfort.
                </p>
              </div>
              <div className="feature-item">
                <div className="icon">💰</div>
                <h3>Affordable Quality</h3>
                <p>
                  Modern amenities and thoughtful services at prices that suit
                  every traveller.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
