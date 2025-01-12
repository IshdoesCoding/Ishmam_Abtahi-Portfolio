import React from 'react';
import styles from './ProjectStyles.module.css';
import fitlift from '../../assets/fitnessIcon.png';
import stock_predictor from '../../assets/Stockicon.png';
import habit_tracker from '../../assets/HabitIcon.png';

function Projects() {
    return (

        <section id = 'projects' className ={styles.container}> 
            <h1 className='sectionTitle'> Projects </h1> 

            <div className={styles.projectContainer}>

                <a href = "https://github.com/IshdoesCoding/MyFit"  target = "_blank" >
                    <button><img src ={fitlift} alt = "first app" /></button>
                    <h3>Fitlift</h3>
                    <p>will be in github soon</p>
                </a>

                
                <a href = "https://github.com/IshdoesCoding/Stock-Predictor"  target = "_blank" >
                    <button><img src ={stock_predictor} alt = "first app" /></button>

                    <h3>Stock Analytics</h3>
                    <p>will be in github soon</p>
                </a>
        
                <a href = "https://github.com/IshdoesCoding/Habit-Tracker"  target = "_blank" >
                    <button><img src ={habit_tracker} alt = "first app" /></button>
                    <h3>Habit Tracker</h3>
                    <p>will be in github soon</p>
                </a>
 
        
            </div>

        
        
        </section>
    );
}

export default Projects;