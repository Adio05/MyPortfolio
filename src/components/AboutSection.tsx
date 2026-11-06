import React from 'react';
import { Database, Terminal } from 'lucide-react';



export const AboutSection: React.FC = () => (
  <section id="about" className="py-20 md:py-28 bg-[#0b1610] border-t border-[#182d22]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-[#4ade80] mb-2">About me</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Learning by building</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="rounded-2xl bg-[#0c1812] border border-[#1f3a2c] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Database className="w-5 h-5 text-[#4ade80]" /><h3 className="text-lg font-bold text-white">Where I’m starting</h3></div>
          <p className="text-sm text-[#a2beb0] leading-relaxed">I’ve installed PostgreSQL, connected it to VS Code, and practiced creating a sales table, inserting sample data, and querying the results. I’m now learning Python so I can load data into a database automatically.</p>
        </article>
        <article className="rounded-2xl bg-[#0c1812] border border-[#1f3a2c] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Terminal className="w-5 h-5 text-[#38bdf8]" /><h3 className="text-lg font-bold text-white">What I’m learning</h3></div>
          <p className="text-sm text-[#a2beb0] leading-relaxed">SQL and PostgreSQL are my current focus. Next, I’m building my Python foundations and will use them to practice loading data into a database.</p>
          <a href="#contact" className="inline-block mt-5 text-xs font-semibold text-[#4ade80] hover:text-[#86efac]">Get in touch →</a>
        </article>
      </div>
    </div>
  </section>
);

