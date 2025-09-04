// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Gauche : Liens */}
        <div style={styles.left}>
          <Link to="/mentions-legales" style={styles.link}>Mentions légales</Link>
          <span style={styles.separator}>|</span>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>

        {/* Centre : Copyright */}
        <div style={styles.center}>
          &copy; {new Date().getFullYear()} BatchCooking. Tous droits réservés.
        </div>

        {/* Droite : Mention IA */}
        <div style={styles.right}>
          *Images générées par IA
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#f1f1f1',
    padding: '1rem',
    fontSize: '0.9rem',
    color: '#444',
  },
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  left: {
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'flex-start',
  },
  center: {
    flex: 1,
    minWidth: '200px',
    textAlign: 'center',
  },
  right: {
    flex: 1,
    minWidth: '200px',
    textAlign: 'right',
    fontSize: '0.8rem',
    color: '#777',
  },
  link: {
    color: '#444',
    textDecoration: 'none',
  },
  separator: {
    color: '#ccc',
  },
};

export default Footer;
