import React from 'react'
import Styles from './SkillsStyles.module.css'
import check_light from '../../assets/checkmark-light.svg'
import check_dark from '../../assets/checkmark-dark.svg'
import {useTheme} from '../../common/ThemeContext'

function Skills() {

  const {theme} = useTheme()

  const checked_color = theme === 'light' ? check_light : check_dark
  return (


    <section id="Skills" className={Styles.container} > 
        
        <h1 className="SectionTitle"> Skills </h1> 

        <div className = {Styles.skills}>

          <h3> 
            React <img src={checked_color} />
            Python <img src={checked_color} />
            Javascript <img src={checked_color}/>
            html <img src={checked_color} />
            css <img src={checked_color} />
          </h3>
      

        </div>

    
    
    </section>
  );
}

export default Skills