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
                Rudaraksh Hotel is perched on a gentle hillside, just minutes
                away from the vibrant town center while remaining cocooned in
                nature. Plan your journey with the guidance below.
              </p>
              <div className="info-item">
                <h4>Address</h4>
                <p>Rudaraksh Estate, Valley Road, Mussoorie, Uttarakhand</p>
              </div>
              <div className="info-item">
                <h4>By Air</h4>
                <p>Nearest Airport: Jolly Grant Airport, Dehradun (60 km)</p>
              </div>
              <div className="info-item">
                <h4>By Rail</h4>
                <p>Nearest Railway Station: Dehradun Junction (35 km)</p>
              </div>
              <div className="info-item">
                <h4>By Road</h4>
                <p>
                  Scenic drives via NH7 from Dehradun or NH734 from Rishikesh.
                  Private transfers can be arranged on request.
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31451.657830716013!2d78.05024727577443!3d30.459910084551202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d76139f8a0bb%3A0x4b605f0be1f2e9b!2sMussoorie%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
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
