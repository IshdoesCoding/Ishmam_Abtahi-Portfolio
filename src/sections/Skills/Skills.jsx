import React from 'react'
import Styles from './SkillsStyles.module.css'
import check_light from '../../assets/checkmark-light.svg'
import check_dark from '../../assets/checkmark-dark.svg'
import {useTheme} from '../../common/ThemeContext'

function Skills() {
  const {theme} = useTheme()
  const checked_color = theme === 'light' ? check_light : check_dark

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "React", "HTML", "CSS"]
    },
    {
      title: "Cloud & Infrastructure",
      skills: ["Cloud Computing", "Linux", "Azure"]
    },
    {
      title: "Security & Analysis",
      skills: ["Cybersecurity", "SIEM Tools", "Threat Analysis"]
    }
  ]

  return (
    <section id="Skills" className={Styles.container}> 
      <h1 className="sectionTitle">Skills</h1> 

      <div className={Styles.skillsGrid}>
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={Styles.skillCategory}>
            <h3 className={Styles.categoryTitle}>{category.title}</h3>
            <div className={Styles.skillsList}>
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className={Styles.skillItem}>
                  <img src={checked_color} alt="checkmark" className={Styles.checkmark} />
                  <span className={Styles.skillName}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={Styles.skillsHighlight}>
        <p>Passionate about building secure, scalable solutions with modern technologies</p>
      </div>
    </section>
  );
}

export default Skills