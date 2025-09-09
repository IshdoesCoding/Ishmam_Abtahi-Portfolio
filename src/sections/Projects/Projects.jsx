import React, { useState } from 'react';
import styles from './ProjectStyles.module.css';

function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const projects = [
        {
            id: 1,
            title: "AI Resume Analyzer (Resumify)",
            description: "Built an AI resume analyzer with React Router v7 and Puter.js backend. Provided tailored resume feedback based on job and company data.",
            image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
            github: "https://github.com/IshdoesCoding/AI-Resume-Analyzer-Resumify-",
            demo: "https://ai-resume-analyzer-resumify.vercel.app/"
        },
        {
            id: 2,
            title: "Home SOC: Personal Cyber Defense Virtual Lab",
            description: "Set up a home Security Operations Center (SOC) with Azure to monitor live cyber threats. Used a SIEM tool to detect and analyze over 100 suspicious events in the first month.",
            image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
            github: "#",
            demo: "#"
        }
    ];

    const nextProject = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevProject = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const goToProject = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id='projects' className={styles.container}> 
            <h1 className='sectionTitle'>Projects</h1> 

            <div className={styles.carousel}>
                <button 
                    className={styles.navButton} 
                    onClick={prevProject}
                    aria-label="Previous project"
                >
                    &#8249;
                </button>

                <div className={styles.projectWindow}>
                    <div 
                        className={styles.projectSlider}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectSlide}>
                                <div className={styles.projectCard}>
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className={styles.projectImage}
                                    />
                                    <div className={styles.projectContent}>
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className={styles.projectLinks}>
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={styles.projectLink}
                                            >
                                                GitHub
                                            </a>
                                            <a 
                                                href={project.demo} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={styles.projectLink}
                                            >
                                                Live Demo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className={styles.navButton} 
                    onClick={nextProject}
                    aria-label="Next project"
                >
                    &#8250;
                </button>
            </div>

            <div className={styles.indicators}>
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${
                            index === currentIndex ? styles.active : ''
                        }`}
                        onClick={() => goToProject(index)}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Projects;