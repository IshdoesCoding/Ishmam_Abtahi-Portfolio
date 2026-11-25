import './App.css';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Arcade from './components/Arcade';
import Footer from './components/Footer';
import { GameProvider } from './game/GameContext';
import GameHUD from './game/GameHUD';
import Sparkles from './components/Sparkles';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <GameProvider>
        <div className="min-h-screen bg-[#47517d]">
          <Sparkles />
          <Navbar />
          <main><Hero /><About /><Projects /><Experience /><Skills /><Contact /><Arcade /></main>
          <Footer />
          <GameHUD />
        </div>
      </GameProvider>
    </MotionConfig>
  );
}
