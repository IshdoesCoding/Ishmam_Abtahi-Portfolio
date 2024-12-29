import './App.css';
import Hero from './sections/Hero/Hero';
import Project from './sections/Projects/Projects';
import Skills from "./sections/Skills/Skills";
import Contact from "./sections/Contact/Contact";
import Navbar from "./sections/Navbar/Navbar";

function App() {
  return <> 
    <Navbar/>
    <Hero /> 
    <Project/> 
    <Skills/>
    <Contact/>
  </>;
}

export default App;
