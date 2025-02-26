import styles from './HeroStyles.module.css'
import heroImg from '../../assets/ish_final.png'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import linkedin_light from '../../assets/linkedin-light.svg'
import linkedin_dark from '../../assets/linkedin-dark.svg'

import github_light from '../../assets/github-light.svg'
import github_dark from '../../assets/github-dark.svg'
import CV from '../../assets/cv.pdf'
import {useTheme} from '../../common/ThemeContext'


function Hero() {

  const {theme, toggleTheme} = useTheme()

  const themeIcon = theme === 'light' ? sun : moon;
  const linkedinIcon = theme === 'light' ? linkedin_light : linkedin_dark
  const githubIcon = theme === 'light' ? github_light : github_dark

  return (
    <section id = "hero" className={styles.container}>
        <div className={styles.colorModeContainer}>
            <img className={styles.hero} src={heroImg} alt = "Profile picture of Ishmam Abtahi"/>
            <img className = {styles.colorMode} src={themeIcon} alt="Color Mode Icon" onClick={toggleTheme} />
        </div>

        <div className={styles.info}>
            <h1>Ishmam Abtahi <br/> </h1>
            <h2>Software Developer</h2>
            <span>
                <a href="https://www.linkedin.com/in/ishmam-abtahi-60601a324/" target="_blank"> 
                    <img src={linkedinIcon} alt="LinkedIn Icon" /> 
                </a>
                <a href="https://github.com/IshdoesCoding" target="_blank"> 
                    <img src={githubIcon} alt=" Github Icon" /> 
                </a>

            </span>

            <div className="animated-text-container"> </div>

            <p className={styles.description}> I'm a first-year UVA student majoring in Computer Science, with a passion for coding and anything technology. </p>



            <a href={CV} download>
                <button className="hover">Resume</button>
            </a>
      
        </div>
        
    </section>
  )
}

export default Hero