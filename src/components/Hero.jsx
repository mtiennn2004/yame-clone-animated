import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* Banner nền */}
      <img
        className="hero-img"
        src="//yame.vn/cdn/shop/files/banner_homepage_241025.png?v=1761364686&width=2000"
        alt="Banner"
      />

      {/* Nội dung đè lên banner */}
      <div className="hero-content">
      <h1 className="hero-title">
        WEAR YOUR <span className="gold">CHARACTER</span>
        <br />
        LIVE WITH <span className="gold">CONFIDENCE</span>
      </h1>    
       
       
      <div className="hero-actions">
          <Link className="btn btn-outline" to="/search-image">
            Feature 1: Find similar photos
          </Link>
        </div>
      </div>
    </section>
  );
}
