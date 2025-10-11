import React, { useState } from 'react'
import styles from './ContactStyles.module.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:ishmamabtahi17@gmail.com?subject=Portfolio Contact from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
    window.location.href = mailtoLink
    setStatus('Opening email client...')
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setStatus('')
    }, 2000)
  }

  return (
    <footer id="Contact" className={styles.container}>
      <div className={styles.contact}>
        <h2 className={styles.title}>Get In Touch</h2>
        <p className={styles.subtitle}>Have a question or want to work together? Feel free to reach out!</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>

          {status && <p className={styles.status}>{status}</p>}
        </form>

        <div className={styles.directContact}>
          <p>Or email me directly at: <a href="mailto:ishmamabtahi17@gmail.com">ishmamabtahi17@gmail.com</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Contact