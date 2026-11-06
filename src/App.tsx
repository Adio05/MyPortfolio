import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { RoadmapSection } from './components/RoadmapSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('portfolio-theme') !== 'light');
  useEffect(() => {
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);
  const handleExploreProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-[#0a120e] text-[#e3ece7]' : 'bg-[#f4f7f4] text-[#13221b]'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero onExploreProjects={handleExploreProjects} />
        <AboutSection />
        <ProjectsSection />
        <RoadmapSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

