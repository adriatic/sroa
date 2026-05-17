export const dynamic = 'force-dynamic';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --deep: #0a1628;
          --ocean: #0d2d4e;
          --teal: #1a6b7c;
          --aqua: #2eb8c2;
          --foam: #e8f4f6;
          --sand: #f2ede8;
          --gold: #c9a96e;
          --white: #ffffff;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--deep);
          color: var(--white);
          overflow-x: hidden;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 4rem;
          background: linear-gradient(to bottom, rgba(10,22,40,0.95), transparent);
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: var(--aqua);
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.3s;
        }

        .nav-links a:hover { color: var(--aqua); }

        .nav-cta {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--deep);
          background: var(--aqua);
          padding: 0.6rem 1.5rem;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.3s;
        }

        .nav-cta:hover { background: var(--gold); }

        /* HERO */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(30,107,124,0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(46,184,194,0.15) 0%, transparent 50%),
            linear-gradient(135deg, var(--deep) 0%, var(--ocean) 50%, #0a2a3d 100%);
        }

        .hero-waves {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          opacity: 0.15;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 8rem 4rem 4rem;
          max-width: 700px;
        }

        .hero-eyebrow {
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--aqua);
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .hero-title em {
          font-style: italic;
          color: var(--aqua);
        }

        .hero-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          border-left: 2px solid var(--gold);
        }

        .hero-quote-attr {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--gold);
          padding-left: 1rem;
          margin-bottom: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.7);
          margin-bottom: 3rem;
          max-width: 520px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-primary {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--deep);
          background: var(--aqua);
          padding: 0.9rem 2.5rem;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          background: var(--gold);
          transform: translateY(-1px);
        }

        .btn-secondary {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 2px;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          color: var(--aqua);
          border-color: var(--aqua);
        }

        .hero-image {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 50%;
          overflow: hidden;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0.4;
          mix-blend-mode: luminosity;
        }

        .hero-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--deep) 0%, transparent 40%),
                      linear-gradient(to top, var(--deep) 0%, transparent 30%);
        }

        /* ABOUT */
        .about {
          padding: 8rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          background: var(--ocean);
        }

        .about-image {
          position: relative;
        }

        .about-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          object-position: center;
          border-radius: 2px;
        }

        .about-image::before {
          content: '';
          position: absolute;
          top: -1rem;
          left: -1rem;
          right: 1rem;
          bottom: 1rem;
          border: 1px solid var(--teal);
          border-radius: 2px;
          z-index: 0;
        }

        .about-image img { position: relative; z-index: 1; }

        .about-content {}

        .section-label {
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--aqua);
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .section-title em { font-style: italic; color: var(--gold); }

        .about-text {
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255,255,255,0.7);
          margin-bottom: 1rem;
        }

        .credentials {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .credential {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }

        .credential-year {
          color: var(--gold);
          font-weight: 500;
          min-width: 40px;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        /* SERVICES */
        .services {
          padding: 8rem 4rem;
          background: var(--deep);
        }

        .services-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .service-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 3rem 2.5rem;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--teal);
          transform: scaleX(0);
          transition: transform 0.4s;
        }

        .service-card:hover { background: rgba(26,107,124,0.1); }
        .service-card:hover::before { transform: scaleX(1); }

        .service-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: rgba(46,184,194,0.15);
          margin-bottom: 1rem;
          line-height: 1;
        }

        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 400;
          margin-bottom: 1rem;
          color: var(--white);
        }

        .service-text {
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        /* MISSION */
        .mission {
          padding: 8rem 4rem;
          background: linear-gradient(135deg, var(--teal) 0%, var(--ocean) 100%);
          text-align: center;
        }

        .mission-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 300;
          line-height: 1.5;
          max-width: 800px;
          margin: 0 auto 3rem;
          font-style: italic;
        }

        /* SUBMIT */
        .submit {
          padding: 8rem 4rem;
          background: var(--ocean);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .submit-content {}

        .submit-features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .submit-feature {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .submit-feature-dot {
          width: 6px;
          height: 6px;
          background: var(--aqua);
          border-radius: 50%;
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .submit-feature-text {
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
        }

        .submit-cta {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 3rem;
          border-radius: 2px;
        }

        .submit-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 300;
          margin-bottom: 1rem;
        }

        .submit-cta p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        /* FOOTER */
        footer {
          padding: 3rem 4rem;
          background: var(--deep);
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: var(--aqua);
        }

        .footer-copy {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .footer-links a {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: color 0.3s;
        }

        .footer-links a:hover { color: var(--aqua); }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-eyebrow { animation: fadeUp 0.8s ease both; }
        .hero-title { animation: fadeUp 0.8s ease 0.1s both; }
        .hero-quote { animation: fadeUp 0.8s ease 0.2s both; }
        .hero-quote-attr { animation: fadeUp 0.8s ease 0.25s both; }
        .hero-subtitle { animation: fadeUp 0.8s ease 0.3s both; }
        .hero-actions { animation: fadeUp 0.8s ease 0.4s both; }

        @media (max-width: 900px) {
          nav { padding: 1.5rem 2rem; }
          .nav-links { display: none; }
          .hero-content { padding: 8rem 2rem 4rem; max-width: 100%; }
          .hero-image { display: none; }
          .about { grid-template-columns: 1fr; padding: 4rem 2rem; gap: 3rem; }
          .services { padding: 4rem 2rem; }
          .services-grid { grid-template-columns: 1fr; }
          .submit { grid-template-columns: 1fr; padding: 4rem 2rem; gap: 3rem; }
          .mission { padding: 4rem 2rem; }
          footer { flex-direction: column; gap: 1rem; text-align: center; padding: 2rem; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">ZooRadOne</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#submit">Submit a Case</a></li>
          <li><a href="https://www.zooradone.com/publications" target="_blank" rel="noopener">Publications</a></li>
        </ul>
        <a href="https://accounts.sroa.site/sign-in" className="nav-cta">Portal Login</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <svg className="hero-waves" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 C360,180 720,20 1080,100 C1260,140 1380,80 1440,100 L1440,200 L0,200 Z" fill="rgba(26,107,124,0.3)"/>
          <path d="M0,140 C400,80 800,160 1200,120 C1320,104 1400,130 1440,140 L1440,200 L0,200 Z" fill="rgba(10,22,40,0.5)"/>
        </svg>
        <div className="hero-content">
          <p className="hero-eyebrow">Zoo &amp; Marine Mammal Diagnostic Imaging</p>
          <h1 className="hero-title">
            Imaging that<br/><em>follows the patient,</em><br/>not the institution
          </h1>
          <p className="hero-quote">
            You see what you look for, and you look for what you know.
          </p>
          <p className="hero-quote-attr">— Dr. Marina Ivančić</p>
          <p className="hero-subtitle">
            Teleradiology and on-site diagnostic imaging support for zoos, aquaria, 
            and wildlife facilities — delivered by the world's leading specialist 
            in marine mammal and zoological radiology.
          </p>
          <div className="hero-actions">
            <a href="#submit" className="btn-primary">Submit a Case</a>
            <a href="#about" className="btn-secondary">Learn more</a>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://static.wixstatic.com/media/75e245_afa347dcae8c42d7b9a5b9d4e05d6a8cf000.jpg/v1/fill/w_1646,h_790,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75e245_afa347dcae8c42d7b9a5b9d4e05d6a8cf000.jpg"
            alt="Dr. Marina Ivančić"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-image">
          <img 
            src="https://static.wixstatic.com/media/75e245_8b0e30f246c44153baaa2736b89135bd~mv2.jpg/v1/crop/x_0,y_187,w_2144,h_865/fill/w_1637,h_658,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/DSC_0290.jpg"
            alt="Marine mammal radiology"
          />
        </div>
        <div className="about-content">
          <p className="section-label">About Dr. Ivančić</p>
          <h2 className="section-title">Pioneering a<br/><em>field from scratch</em></h2>
          <p className="about-text">
            Dr. Marina Ivančić is a board-certified veterinary radiologist and the world's 
            leading expert in marine mammal and zoological diagnostic imaging. She has worked 
            with marine mammals since 1998 and pioneered the field of marine mammal radiology 
            in 2008.
          </p>
          <p className="about-text">
            Originally from Croatia, Marina founded ZooRadOne in 2021, providing teleradiology 
            and on-site diagnostic imaging support for facilities internationally. Dolphins hold 
            a special place in her heart.
          </p>
          <div className="credentials">
            <div className="credential">
              <span className="credential-year">1998</span>
              <span>Began working with marine mammals</span>
            </div>
            <div className="credential">
              <span className="credential-year">2008</span>
              <span>Pioneered the field of marine mammal radiology</span>
            </div>
            <div className="credential">
              <span className="credential-year">2016</span>
              <span>Became the first and only radiologist to work full-time at a zoo — Chicago Zoological Society</span>
            </div>
            <div className="credential">
              <span className="credential-year">2021</span>
              <span>Founded ZooRadOne — global teleradiology for zoos and aquaria</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="services-header">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Imaging services built<br/><em>for complex cases</em></h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-number">01</div>
            <h3 className="service-title">Teleradiology</h3>
            <p className="service-text">
              Remote diagnostic imaging interpretation for zoos, aquaria, and wildlife 
              facilities worldwide. Fast turnaround on routine and urgent cases.
            </p>
          </div>
          <div className="service-card">
            <div className="service-number">02</div>
            <h3 className="service-title">On-Site Support</h3>
            <p className="service-text">
              In-person imaging support for complex procedures, new equipment commissioning, 
              and protocol development at your facility.
            </p>
          </div>
          <div className="service-card">
            <div className="service-number">03</div>
            <h3 className="service-title">Consultation</h3>
            <p className="service-text">
              Species-specific imaging protocol design, second opinions on complex cases, 
              and continuing education for veterinary teams.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission" id="mission">
        <p className="section-label" style={{color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem'}}>Our Mission</p>
        <p className="mission-text">
          "ZooRadOne's goal is to maximize the health and well-being of zoo animals, 
          marine mammals, and wildlife, by providing unparalleled diagnostic imaging 
          support for veterinary clinicians charged with their care."
        </p>
        <a href="#submit" className="btn-primary">Submit a Case</a>
      </section>

      {/* SUBMIT */}
      <section className="submit" id="submit">
        <div className="submit-content">
          <p className="section-label">Case Submission</p>
          <h2 className="section-title">Ready to submit<br/><em>a case?</em></h2>
          <p className="about-text">
            ZooRadOne accepts referrals from veterinarians and zoo staff internationally. 
            Cases are reviewed promptly, with STAT cases prioritized.
          </p>
          <div className="submit-features">
            <div className="submit-feature">
              <div className="submit-feature-dot"/>
              <p className="submit-feature-text">All zoo and exotic species accepted — great apes, cetaceans, elephants, and beyond</p>
            </div>
            <div className="submit-feature">
              <div className="submit-feature-dot"/>
              <p className="submit-feature-text">STAT cases flagged and prioritized for same-day response</p>
            </div>
            <div className="submit-feature">
              <div className="submit-feature-dot"/>
              <p className="submit-feature-text">Peer-to-peer communication between specialists</p>
            </div>
            <div className="submit-feature">
              <div className="submit-feature-dot"/>
              <p className="submit-feature-text">Secure portal access for registered facilities</p>
            </div>
          </div>
        </div>
        <div className="submit-cta">
          <h3>Portal Access</h3>
          <p>
            Registered facilities can submit cases, track status, and access reports 
            through the ZooRadOne secure portal. Contact us to request access.
          </p>
          <a href="https://accounts.sroa.site/sign-in" className="btn-primary">Sign In to Portal</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">ZooRadOne</div>
        <ul className="footer-links">
          <li><a href="https://www.linkedin.com/in/dr-marina-ivan%C4%8Di%C4%87-48a52531/" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://www.facebook.com/zooradone" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="https://scholar.google.com/citations?hl=en&user=IyifwewAAAAJ" target="_blank" rel="noopener">Publications</a></li>
          <li><a href="https://zooradone-shop.fourthwall.com/collections/all" target="_blank" rel="noopener">Merch</a></li>
        </ul>
        <p className="footer-copy">© 2021–2026 Dr. Marina Ivančić · ZooRadOne, PLLC</p>
      </footer>
    </>
  );
}
