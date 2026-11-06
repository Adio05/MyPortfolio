import React, { useState, useEffect } from 'react';
import { Moon, Sun, Terminal, Menu, X } from 'lucide-react';
interface NavbarProps { darkMode: boolean; setDarkMode: (val: boolean) => void; }
export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Learning', href: '#roadmap' }];
  return <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#09110d]/90 backdrop-blur-md border-b border-[#21352a]/60 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-center justify-between gap-5 h-20">
      <a href="#top" className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white hover:text-[#4ade80] whitespace-nowrap"><span className="w-8 h-8 rounded-lg bg-[#14261c] border border-[#2b4b39] flex items-center justify-center text-[#4ade80]"><Terminal className="w-4 h-4" /></span><span>MOYINOLUWA<span className="text-[#4ade80]">.DATA</span></span></a>
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9eb6a8]">{navLinks.map(link => <a key={link.label} href={link.href} className="hover:text-white">{link.label}</a>)}</nav>
      <div className="flex items-center gap-3"><button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg text-[#9eb6a8] hover:text-white hover:bg-[#14261c]" title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-label="Toggle visual theme">{darkMode ? <Sun className="w-4 h-4 text-[#fbbf24]" /> : <Moon className="w-4 h-4" />}</button><a href="#contact" className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-[#09110d] bg-[#4ade80] hover:bg-[#86efac] rounded-lg">Contact</a><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-[#9eb6a8]" aria-label="Toggle navigation menu">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button></div>
    </div></div>
    {mobileMenuOpen && <nav className="md:hidden bg-[#0c1812] border-b border-[#21352a] px-6 py-5 space-y-3 shadow-xl">{navLinks.map(link => <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#c8ded1] hover:text-[#4ade80] py-2">{link.label}</a>)}<a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#4ade80] py-2">Contact</a></nav>}
  </header>;
};

