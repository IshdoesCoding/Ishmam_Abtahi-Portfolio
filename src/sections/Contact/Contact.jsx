import React from 'react'
import styles from './ContactStyles.module.css'

function Contact() {
  return (

    <footer id = "Contact" className={styles.container}>

        <div className={styles.contact}>

            <h2> Contact Me! </h2>
            <p> Mail: <a href="mailto:ishmamabtahi17@gmail.com">ishmamabtahi17@gmail.com</a></p>

        </div>


    </footer>
  )
}

export default Contact