import "./home.css";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { AiOutlineCustomerService } from "react-icons/ai";
import { FiShield } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

// Slide animation variants
const slideVariants = (fromRight = false) => ({
  hidden: { opacity: 0, x: fromRight ? 100 : -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
});

// Stagger container for child animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm BankBOT 🤖. How can I help you today with Banking?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Refs for in-view detection
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isChatVisible) {
      setMessages([{ sender: "bot", text: "Hi! I'm BankBOT 🤖. How can I help you today with Banking?" }]);
      setUserInput("");
      setIsLoading(false);
    }
  }, [isChatVisible]);

  const toggleChatbot = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) throw new Error("Failed to fetch response from server");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="main-home">
      {/* Navbar */}
      <motion.section
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={slideVariants(false)} // Slide from left
      >
        <div className="logo">
          <h1>BankBOT</h1>
        </div>
        <div className="nav-links">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Features</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </motion.section>

      {/* Hero */}
      <motion.section
        className="hero"
        id="home"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          className="hero-content"
          variants={slideVariants(false)} // Slide from left
        >
          <h1>Welcome to BankBOT.</h1>
          <p>Your AI-powered banking assistant for all your banking needs at your fingertips. We are here to help you understand the world of banking.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={slideVariants(false)} // Slide from left
          >
            Get Started
          </motion.button>
        </motion.div>
        <motion.div
          className="hero-image"
          variants={slideVariants(true)} // Slide from right
        >
          <img src="/caa.png" alt="Hero" />
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="features"
        id="about"
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          className="feature-item"
          variants={slideVariants(false)} // Slide from left
        >
          <AiOutlineCustomerService size={40} color="#0a66c2" />
          <h2>24/7 Support</h2>
          <p>Get assistance anytime, anywhere with our AI-powered chatbot.</p>
        </motion.div>
        <motion.div
          className="feature-item"
          variants={slideVariants(true)} // Slide from right
        >
          <FiShield size={40} color="#0a66c2" />
          <h2>Secure Transactions</h2>
          <p>Experience secure and reliable banking transactions with our advanced security protocols.</p>
        </motion.div>
        <motion.div
          className="feature-item"
          variants={slideVariants(false)} // Slide from left
        >
          <MdPersonOutline size={40} color="#0a66c2" />
          <h2>Personalized Experience</h2>
          <p>Enjoy a personalized banking experience tailored to your needs and preferences.</p>
        </motion.div>
      </motion.section>

      {/* Services */}
      <motion.section
        className="services"
        id="services"
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          className="services-header"
          variants={slideVariants(false)} // Slide from left
        >
          <h2>Our Services</h2>
          <p>Explore how BankBOT can enhance your banking experience.</p>
        </motion.div>
        <motion.div className="service-list" variants={staggerContainer}>
          <motion.div
            className="service-card"
            variants={slideVariants(false)} // Slide from left
          >
            <h3>Balance Inquiries</h3>
            <p>Check your account balance instantly with natural language queries.</p>
          </motion.div>
          <motion.div
            className="service-card"
            variants={slideVariants(true)} // Slide from right
          >
            <h3>Loan Status Tracking</h3>
            <p>Track loan approvals, EMI schedules, and repayment statuses easily.</p>
          </motion.div>
          <motion.div
            className="service-card"
            variants={slideVariants(false)} // Slide from left
          >
            <h3>Fraud Alerts</h3>
            <p>Stay safe with real-time alerts and automated fraud detection tips.</p>
          </motion.div>
          <motion.div
            className="service-card"
            variants={slideVariants(true)} // Slide from right
          >
            <h3>Transaction History</h3>
            <p>Ask about your past transactions and get instant summaries.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="contact"
        id="contact"
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div
          className="contact-header"
          variants={slideVariants(false)} // Slide from left
        >
          <h2>Contact Us</h2>
          <p>Have questions or need help? Reach out!</p>
        </motion.div>
        <motion.div className="contact-content" variants={staggerContainer}>
          <motion.div
            className="contact-logo"
            variants={slideVariants(false)} // Slide from left
          >
            <h1>BankBOT</h1>
            <p>AI Banking Assistant</p>
            <p>Email: bankbot@gmail.com</p>
            <p>Phone: +250 780000000</p>
          </motion.div>
          <motion.form
            className="contact-form"
            variants={slideVariants(true)} // Slide from right
          >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="4" placeholder="Your Message" required></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={slideVariants(true)} // Slide from right
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.section>

      <motion.footer
        className="footer"
        initial="hidden"
        animate="visible"
        variants={slideVariants(false)} // Slide from left
      >
        <p>© {new Date().getFullYear()} BankBOT. All rights reserved.</p>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </motion.footer>

      <div className="chatbot-container">
        <motion.div
          className={`chatbot-window ${isChatVisible ? "visible" : ""}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isChatVisible ? 1 : 0, opacity: isChatVisible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="chatbot-header">
            <h3>BankBOT Assistant</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`message ${msg.sender === "bot" ? "bot-msg" : "user-msg"}`}
                initial="hidden"
                animate="visible"
                variants={slideVariants(msg.sender === "user")} // Slide from right for user, left for bot
              >
                {msg.sender === "bot" && <img src="/chatb.png" alt="Bot Avatar" className="avatar" />}
                <p className="message-text">{msg.text}</p>
              </motion.div>
            ))}
            {isLoading && <p className="bot-msg">Typing...</p>}
          </div>
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={slideVariants(true)} // Slide from right
            >
              Send
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          className="chatbot-toggle"
          onClick={toggleChatbot}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          💬
        </motion.div>
      </div>
    </div>
  );
};

export default Home;