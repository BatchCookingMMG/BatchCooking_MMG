// src/pages/MentionsLegales.tsx

import React from 'react';

const MentionsLegales = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mentions légales</h1>

      <section style={styles.section}>
        <h2 style={styles.heading}>Éditeur du site</h2>
        <p style={styles.text}>
          <strong>BatchCooking</strong><br />
          123 Rue des Recettes<br />
          75000 Paris, France<br />
          Email : <a href="mailto:contact@batchcooking.fr" style={styles.link}>contact@batchcooking.fr</a>
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Hébergement</h2>
        <p style={styles.text}>
          <strong>Vercel Inc.</strong><br />
          340 S Lemon Ave #4133<br />
          Walnut, CA 91789, États-Unis<br />
          Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={styles.link}>vercel.com</a>
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Propriété intellectuelle</h2>
        <p style={styles.text}>
          Le contenu de ce site (textes, images, graphismes, logo, etc.) est protégé par le droit d'auteur. Toute reproduction ou représentation, en tout ou partie, est interdite sans l'autorisation écrite préalable de BatchCooking.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Responsabilité</h2>
        <p style={styles.text}>
          BatchCooking décline toute responsabilité en cas d’erreurs ou d’omissions dans les informations diffusées ou en cas de problème technique rencontré sur le site.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Données personnelles</h2>
        <p style={styles.text}>
          Aucune donnée personnelle n’est collectée à votre insu. Les données éventuellement collectées via les formulaires de contact ne sont utilisées que dans le cadre de la relation commerciale initiée.
        </p>
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '960px',
    margin: '2rem auto',
    padding: '2rem 1rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    color: '#333',
    lineHeight: 1.8,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#222',
  },
  section: {
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#444',
    marginBottom: '0.5rem',
    borderLeft: '4px solid #ccc',
    paddingLeft: '0.5rem',
  },
  text: {
    fontSize: '1rem',
    color: '#555',
    margin: 0,
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
  },
};

export default MentionsLegales;
