// src/pages/Contact.tsx

import React from 'react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message non envoyé : formulaire de démonstration (POC RNCP)");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nous contacter</h1>

      <p style={styles.intro}>
        Une question, un retour, ou juste envie de nous dire bonjour ?  
        N'hésitez pas à nous laisser un message 💬
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Nom</label>
          <input type="text" id="name" name="name" style={styles.input} required />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input type="email" id="email" name="email" style={styles.input} required />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea id="message" name="message" rows={5} style={styles.textarea} required />
        </div>

        <button type="submit" style={styles.button}>Envoyer</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2.5rem 2rem',
    backgroundColor: '#faf9f6',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    fontFamily: `'Segoe UI', 'Roboto', sans-serif`,
    color: '#333',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 600,
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#4a4a4a',
  },
  intro: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1rem',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#5a5a5a',
    fontSize: '0.95rem',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: '#fff',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    resize: 'vertical',
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'flex-start',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6db193', // doux vert d'eau
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s',
  },
};

export default Contact;
