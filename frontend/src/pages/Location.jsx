import { motion } from "framer-motion";
import "./Location.css";

function Location() {
  return (
    <div className="location-page">
      <motion.section
        className="location-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1>Find Rudaraksh Hotel</h1>
          <p>Discover serene surroundings nestled amid the lush valleys.</p>
        </div>
      </motion.section>

      <section className="location-content">
        <div className="container">
          <div className="location-grid">
            <motion.div
              className="location-info card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>Getting Here</h2>
              <p>
                Rudaraksh Hotel is rooted in the heart of Pinjore, surrounded by
                the town’s gardens, bustling markets, and the foothills that
                lead toward the Shivalik range. Staying with us means you are
                close to everyday conveniences while still enjoying a calm,
                neighborhood feel near Shori Hospital and the main Kalka-Shimla
                road.
              </p>
              <div className="info-item">
                <h4>Address</h4>
                <p>
                  1st Floor, Hotel Rudaraksh, near Shori Hospital, Pinjore,
                  Haryana 134102
                </p>
              </div>
            </motion.div>
            <motion.div
              className="location-map card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <iframe
                title="Rudaraksh Hotel Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2610.2518578082404!2d76.9190977!3d30.8084617!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f8ddbcddf9373%3A0xc821873a79cc1ef4!2sHotel%20Rudaraksh!5e1!3m2!1sen!2sin!4v1763539219630!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Location;
