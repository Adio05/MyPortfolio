import React from 'react';
import { ArrowUpRight, Database, CalendarDays } from 'lucide-react';

const projects = [
  {
    title: 'Engra Timetable',
    category: 'Web Application',
    description: 'A weekly lecture timetable application designed to help students organise class schedules across devices.',
    highlights: [
      'Create and edit classes with course details, locations, notes, and colours',
      'View schedules by week, day, or agenda',
      'Detect timetable clashes and view suggested available time slots',
      'Save schedules locally, with Firebase sign-in and shared cloud sync support'
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase'],
    githubUrl: 'https://github.com/Adio05/Smart-Timetable',
    Icon: CalendarDays,
    linkLabel: 'View Smart Timetable on GitHub'
  },
  {
    title: 'Sales table in PostgreSQL',
    category: 'Database Practice',
    description: 'A small PostgreSQL exercise where I created a sales table, added sample data, and queried the results.',
    highlights: [
      'Created a table for sales practice',
      'Inserted sample records',
      'Ran SQL queries to inspect the data'
    ],
    technologies: ['PostgreSQL', 'SQL', 'VS Code'],
    githubUrl: 'https://github.com/Adio05/sales-database-practice',
    Icon: Database,
    linkLabel: 'View sales database on GitHub'
  }
];

export const ProjectsSection: React.FC = () => (
  <section id="projects" className="py-20 md:py-28 bg-[#09130e] border-t border-[#182d22]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-[#4ade80] mb-2">Selected work</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Projects</h2>
        <p className="text-sm text-[#9eb6a8] max-w-xl mt-3">
          A selection of my software development work and database practice.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(({ title, category, description, highlights, technologies, githubUrl, Icon, linkLabel }) => (
          <article key={title} className="rounded-2xl bg-[#0c1812] border border-[#1f3a2c] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-[#14261c] border border-[#2b4b39] flex items-center justify-center text-[#4ade80]">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-xs text-[#8ca89a]">{category}</p>
              </div>
            </div>
            <p className="text-sm text-[#a2beb0] mb-4">{description}</p>
            <ul className="text-sm text-[#a2beb0] space-y-2 list-disc list-inside mb-5">
              {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <p className="text-xs text-[#8ca89a] mb-5">
              <span className="font-semibold text-[#b8d0c2]">Technologies:</span> {technologies.join(' · ')}
            </p>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-[#4ade80] hover:text-[#86efac]">
              {linkLabel}<ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);