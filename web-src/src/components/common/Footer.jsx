import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>© {currentYear} <span>Faizal Dwi Al Farizi</span> — Built with ☕ &amp; 💙 &nbsp;|&nbsp; All Rights Reserved</p>
    </footer>
  );
}
