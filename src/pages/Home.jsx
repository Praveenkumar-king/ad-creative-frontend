import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "../components/Footer";
import ParticlesBG from "../components/ParticlesBG";
import ThemeToggle from "../components/ThemeToggle";

import "../styles/Home.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="home">
      <ParticlesBG />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navLeft">
          <div className="logo">AdVantage Gen</div>
          <ThemeToggle />
        </div>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navLinks ${menuOpen ? "open" : ""}`}>
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>

          <Link to="/signup" className="signupBtn" onClick={closeMenu}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero gradientHero">
        <h1>
          AI Powered <br />
          <span className="typedText">
            <ReactTyped
              strings={[
                "Ad Creatives",
                "Marketing Posters",
                "Campaign Designs",
                "Social Media Ads",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
          </span>
        </h1>

        <p>
          Generate stunning AI ad creatives instantly using prompts.
          Designed for marketers, startups, and creators.
        </p>

        <div className="heroButtons">
          <Link to="/signup" className="primaryBtn">
            Start Generating
          </Link>

          <Link to="/login" className="secondaryBtn">
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" data-aos="fade-up">
        <h2>Powerful AI Features</h2>

        <div className="featureGrid">
          <div className="featureCard">
            <h3>AI Poster Generator</h3>
            <p>Create marketing posters with a simple prompt.</p>
          </div>

          <div className="featureCard">
            <h3>Campaign Gallery</h3>
            <p>All generated campaigns saved automatically.</p>
          </div>

          <div className="featureCard">
            <h3>Share Campaigns</h3>
            <p>Generate shareable links for your ads.</p>
          </div>

          <div className="featureCard">
            <h3>Credits System</h3>
            <p>Flexible credit based AI generation.</p>
          </div>

          <div className="featureCard">
            <h3>Subscription Plans</h3>
            <p>Upgrade plans with Razorpay integration.</p>
          </div>

          <div className="featureCard">
            <h3>Analytics Dashboard</h3>
            <p>Track usage and campaign performance.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" data-aos="fade-up">
        <h2>What Users Say</h2>

        <div className="testimonialGrid">
          <div className="testimonialCard">
            <p>
              "This AI tool saved us hours of design work.
              Campaign generation is insanely fast!"
            </p>
            <h4>Rahul Sharma</h4>
          </div>

          <div className="testimonialCard">
            <p>
              "Perfect for startups. We generate social media ads
              in seconds using simple prompts."
            </p>
            <h4>Anita Verma</h4>
          </div>

          <div className="testimonialCard">
            <p>
              "The campaign gallery and sharing features
              are game changers for our marketing team."
            </p>
            <h4>Karthik R</h4>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" data-aos="zoom-in">
        <h2>Choose Your Plan</h2>

        <div className="pricingGrid">
          <div className="pricingCard">
            <h3>Starter</h3>
            <h1>₹199</h1>
            <p>Perfect for beginners</p>
            <ul>
              <li>100 AI Credits</li>
              <li>Poster Generation</li>
              <li>Campaign Gallery</li>
              <li>Email Support</li>
            </ul>
            <Link to="/signup" className="pricingBtn">
              Choose Plan
            </Link>
          </div>

          <div className="pricingCard popular">
            <span className="badge">Most Popular</span>
            <h3>Pro</h3>
            <h1>₹499</h1>
            <p>Best for creators</p>
            <ul>
              <li>300 AI Credits</li>
              <li>Poster Generation</li>
              <li>Campaign Sharing</li>
              <li>Priority Support</li>
            </ul>
            <Link to="/signup" className="pricingBtn">
              Choose Plan
            </Link>
          </div>

          <div className="pricingCard">
            <h3>Business</h3>
            <h1>₹999</h1>
            <p>For marketing teams</p>
            <ul>
              <li>800 AI Credits</li>
              <li>Advanced Campaign Tools</li>
              <li>Team Collaboration</li>
              <li>Premium Support</li>
            </ul>
            <Link to="/signup" className="pricingBtn">
              Choose Plan
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" data-aos="fade-up">
        <h2>Start Creating AI Ads Today</h2>
        <p>Join creators using AI to generate high converting campaigns.</p>
        <Link to="/signup" className="primaryBtn">
          Create Free Account
        </Link>
      </section>

      <Footer />
    </div>
  );
}