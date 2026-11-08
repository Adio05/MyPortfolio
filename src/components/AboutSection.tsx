import React from 'react';
import { Code2, Database } from 'lucide-react';

export const AboutSection: React.FC = () => (
  <section id="about" className="py-20 md:py-28 bg-[#0b1610] border-t border-[#182d22]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-[#4ade80] mb-2">About me</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Software engineering, with a growing data focus</h2>
        <p className="text-sm text-[#a2beb0] leading-relaxed max-w-3xl mt-4">I’m a Software Engineering student who enjoys learning how applications are designed and built. Through academic, personal and collaborative web projects, I’ve been developing my programming and problem-solving skills. I’m now extending that foundation into Data Engineering, with a focus on Python, SQL, relational databases and data pipelines.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="rounded-2xl bg-[#0c1812] border border-[#1f3a2c] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Code2 className="w-5 h-5 text-[#4ade80]" /><h3 className="text-lg font-bold text-white">Software development</h3></div>
          <p className="text-sm text-[#a2beb0] leading-relaxed">I have worked on website projects using modern web technologies, including React, JavaScript and TypeScript. I’m continuing to strengthen my understanding of programming fundamentals, application structure, debugging and version control.</p>
        </article>
        <article className="rounded-2xl bg-[#0c1812] border border-[#1f3a2c] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Database className="w-5 h-5 text-[#38bdf8]" /><h3 className="text-lg font-bold text-white">Growing into data engineering</h3></div>
          <p className="text-sm text-[#a2beb0] leading-relaxed">I’m building my foundations in SQL and PostgreSQL and learning Python to work with data. My next steps are to strengthen database skills, practise data cleaning and build small end-to-end projects before moving on to orchestration and cloud tools.</p>
        </article>
      </div>
    </div>
  </section>
);