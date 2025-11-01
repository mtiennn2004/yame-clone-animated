import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="ft-cols">
        <div>
          <div className="ft-title">Support</div>
          <a href="#!">Return & Exchange Policy</a>
          <a href="#!">Warranty</a>
          <a href="#!">Shopping Guide</a>
        </div>

        <div>
          <div className="ft-title">About Us</div>
          <a href="#!">Brand Story</a>
          <a href="#!">Careers</a>
          <a href="#!">Contact</a>
        </div>

        <div>
          <div className="ft-title">Connect With Us</div>
          <div className="socials">
            <a href="#!">📘</a><a href="#!">📸</a><a href="#!">🎬</a>
          </div>
          <p>© {new Date().getFullYear()} GroupGAVTH – for learning demo</p>
        </div>
      </div>
    </footer>
  )
}
