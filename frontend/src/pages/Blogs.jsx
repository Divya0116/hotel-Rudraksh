import { motion } from "framer-motion";
import "./Blogs.css";

const blogPosts = [
  {
    title: "A Weekend Retreat in the Hills",
    excerpt:
      "Unwind amidst pine forests, explore hidden trails, and savour curated experiences designed for slow travel.",
    readTime: "5 min read",
  },
  {
    title: "Signature Culinary Journeys",
    excerpt:
      "From local delicacies to gourmet tasting menus, discover how our chefs celebrate regional flavours.",
    readTime: "4 min read",
  },
  {
    title: "Wellness Rituals at Rudaraksh",
    excerpt:
      "Rejuvenate with bespoke spa therapies, sunrise yoga sessions, and mindful escapes curated by our experts.",
    readTime: "6 min read",
  },
];

function Blogs() {
  return (
    <div className="blogs-page">
      <motion.section
        className="blogs-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1>Stories from Rudaraksh</h1>
          <p>
            Inspiration, travel guides, and insider tips to make the most of
            your stay in the hills.
          </p>
        </div>
      </motion.section>

      <section className="blogs-content">
        <div className="container blogs-grid">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              className="blog-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="blog-meta">{post.readTime}</div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <button className="btn btn-secondary">Read More</button>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
