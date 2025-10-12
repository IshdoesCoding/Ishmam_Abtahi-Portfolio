import React, {useState, useEffect} from 'react'
import styles from './NavbarStyles.module.css'
import navbar from '../../assets/navbar.png'

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = () => {
        setIsMenuOpen((prev)=> !prev);
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
  return (

        <section id = "project" className = "SectionTitle">

            <nav className = {`${styles.container} ${!isVisible ? styles.hidden : ''}`}>

            
                <div className = {styles.navbar}>

                    <img className={styles.navicon} src={navbar} alt="navbar icon" onClick={toggleMenu}/>

                    <ul className = {`${styles.navitems} ${isMenuOpen ? styles.showMenu: styles.hideMenu}`}>
                        <li> 
                            <a href = "/">Home</a>
                        </li>
                    
                    
                        <li> 
                            <a href = "#projects">Projects</a>
                        </li>
                    
                    
                        <li> 
                            <a href = "#Skills">Skills</a>
                        </li>
                    
                    
                        <li> 
                            <a href = "#Contact">Contacts</a>
                        </li>
                    </ul>
                </div>
            
            </nav>



        </section>
    
  )
}

export default Navbar