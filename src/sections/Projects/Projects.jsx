import React, { useState } from 'react';
import styles from './ProjectStyles.module.css';

function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, shopping cart, and payment integration.",
            image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
            github: "https://github.com/example/ecommerce-platform",
            demo: "https://ecommerce-demo.com"
        },
        {
            id: 2,
            title: "Weather Dashboard",
            description: "A responsive weather application built with React and OpenWeather API. Displays current weather, forecasts, and interactive maps.",
            image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
            github: "https://github.com/example/weather-dashboard",
            demo: "https://weather-dashboard-demo.com"
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