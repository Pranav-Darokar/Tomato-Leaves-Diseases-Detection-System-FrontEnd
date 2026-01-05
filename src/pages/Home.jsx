import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page animate-fade-in">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="gradient-text">Protect</span> Your<br />
                        Tomato Harvest
                    </h1>
                    <p className="hero-subtitle">
                        Advanced AI-powered disease detection for healthier crops and better yields.
                        Instant analysis, accurate results, and expert treatment advice.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/detect" className="glass-button primary big-btn">
                            Start Diagnosis <ArrowRight size={20} />
                        </Link>
                        <a href="#gallery" className="glass-button big-btn">
                            View Gallery
                        </a>
                    </div>
                </div>
                <div className="hero-image-container">
                    <div className="floating-card c1 glass-panel">
                        <Shield size={24} color="#10b981" />
                        <span>98% Accuracy</span>
                    </div>
                    <div className="floating-card c2 glass-panel">
                        <Zap size={24} color="#f59e0b" />
                        <span>Instant Results</span>
                    </div>
                    <img
                        src="https://m.media-amazon.com/images/I/61Swzo+ZnBL._AC_UF1000,1000_QL80_.jpg"
                        alt="Healthy Tomato Plants"
                        className="hero-image"
                    />
                    <div className="hero-glow"></div>
                </div>
            </section>

            <section id="features" className="features-section">
                <h2 className="section-title">Why Choose TomatoGuard?</h2>
                <div className="features-grid">
                    <div className="feature-card glass-panel" style={{ '--delay': '0ms' }}>
                        <div className="card-image-wrapper">
                            <img src="https://ars.els-cdn.com/content/image/1-s2.0-S221501612500007X-gr12.jpg" alt="Instant Analysis" />
                            <div className="card-icon-overlay">
                                <Zap size={32} />
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>Instant Analysis</h3>
                            <p>Get immediate results just by uploading a photo. No waiting, no lab delays.</p>
                        </div>
                    </div>

                    <div className="feature-card glass-panel" style={{ '--delay': '200ms' }}>
                        <div className="card-image-wrapper">
                            <img src="https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41598-022-21498-5/MediaObjects/41598_2022_21498_Fig4_HTML.jpg" alt="High Accuracy" />
                            <div className="card-icon-overlay">
                                <Eye size={32} />
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>High Accuracy</h3>
                            <p>Powered by state-of-the-art Deep Learning models trained on thousands of samples.</p>
                        </div>
                    </div>

                    <div className="feature-card glass-panel" style={{ '--delay': '400ms' }}>
                        <div className="card-image-wrapper">
                            <img src="https://www.asiafarming.com/wp-content/uploads/2023/05/Common-Tomato-Pests-and-Diseases1-1024x683.jpg" alt="Expert Treatment" />
                            <div className="card-icon-overlay">
                                <Shield size={32} />
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>Expert Treatment</h3>
                            <p>Receive detailed treatment recommendations and prevention tips.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery" className="gallery-section">
                <h2 className="section-title">Common Tomato Diseases</h2>
                <div className="gallery-grid">
                    <div className="gallery-item glass-panel">
                        <img src="https://media.istockphoto.com/id/636687672/photo/tomato-plants-in-greenhouse.jpg?s=2048x2048&w=is&k=20&c=B_vWWMHJLaPEzIEssyVqlx8O_IqGvg3HbiwV2g-h5aw=" alt="Bacterial Spot" />
                        <div className="gallery-overlay">
                            <h3>Bacterial Spot</h3>
                            <span>Detect & Cure</span>
                        </div>
                    </div>
                    <div className="gallery-item glass-panel">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogJnTXJxcdK2fGf0vh21q_4q72JEu-3NwUvHGc8Vb-KMWwnLxThthpFKb6p_myXjWH8Bnhogn46C5cc68D-yG4TV6hLpH_mJkPoyHnl7g1g&s=10" alt="Yellow Leaf Curl" />
                        <div className="gallery-overlay">
                            <h3>Yellow Leaf Curl</h3>
                            <span>Detect & Cure</span>
                        </div>
                    </div>
                    <div className="gallery-item glass-panel">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo3AIbRnB4Y2O-YHpU2hMJ2gTnt3GadfrcPA&s" alt="Leaf Mold" />
                        <div className="gallery-overlay">
                            <h3>Leaf Mold</h3>
                            <span>Detect & Cure</span>
                        </div>
                    </div>
                    <div className="gallery-item glass-panel">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvRDxMqTI7ZxsltdpDGjmgrbD_5kCZYVEyr8r6W_YQFuvi_sEO" alt="Late Blight" />
                        <div className="gallery-overlay">
                            <h3>Late Blight</h3>
                            <span>Detect & Cure</span>
                        </div>
                    </div>
                    <div className="gallery-item glass-panel">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIkHr7GsPain_9CT100KZ2P-RxTx2u1XfHktUdESSFaOgilfi1bXnIvtMZ1eqyHFdGtla&s=10" alt="Early Blight" />
                        <div className="gallery-overlay">
                            <h3>Early Blight</h3>
                            <span>Detect & Cure</span>
                        </div>
                    </div>
                    <div className="gallery-item glass-panel">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-7cFgxCDNpDU5-iONdVBdhu3noKXztH2evA&s" alt="Septoria Leaf Spot" />
                        <div className="gallery-overlay">
                            <h3>Septoria Spot</h3>
                            <span>Detect & Cure</span>
                        </div>
                    </div>
                    <div className="gallery-item glass-panel">
                        <img src="https://images.unsplash.com/photo-1722950551022-6d93eb2b8283?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Healthy" />
                        <div className="gallery-overlay">
                            <h3>Healthy Plant</h3>
                            <span>Keep it Safe</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
