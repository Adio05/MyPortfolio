import React from 'react';
import { ROADMAP_MILESTONES } from '../data/portfolioData';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 md:py-28 bg-[#09130e] border-t border-[#182d22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4ade80] mb-2">
              <span>04 / Growth Trajectory</span>
              <span aria-hidden="true" className="text-[#325241]">·</span>
              <span>Learning Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              One Step at a Time
            </h2>
          </div>
          <p className="text-sm text-[#9eb6a8] max-w-md">
            A transparent log of milestones completed, skills actively in development, and the engineering targets ahead.
          </p>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ROADMAP_MILESTONES.map((step) => {
            const isCompleted = step.status === 'Completed';
            const isInProgress = step.status === 'In Progress';

            return (
              <div
                key={step.number}
                className="relative rounded-2xl bg-[#0c1812] border border-[#1f3a2c] p-6 lg:p-7 flex flex-col justify-between hover:border-[#2f5941] transition-all"
              >
                <div>
                  {/* Step Number + Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-bold text-[#4ade80]">
                      {step.number}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" />
                          <span className="text-[#4ade80] font-semibold">Completed</span>
                        </>
                      ) : isInProgress ? (
                        <>
                          <Clock className="w-3.5 h-3.5 text-[#38bdf8] animate-spin" />
                          <span className="text-[#38bdf8] font-semibold">In Progress</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" />
                          <span className="text-[#a78bfa]">Upcoming Target</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#8ca89a] mb-1">
                    {step.period}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#a2beb0] leading-relaxed mb-6">
                    {step.summary}
                  </p>

                  {/* Key Learnings */}
                  <div className="mb-6 space-y-2 border-t border-[#193224] pt-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#8ca89a]">
                      Core Milestones:
                    </div>
                    <ul className="text-xs text-[#c8ded1] space-y-1.5 list-disc list-inside">
                      {step.keyLearnings.map((learning, idx) => (
                        <li key={idx} className="leading-snug">
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Tools List */}
                <div className="pt-4 border-t border-[#193224] flex items-center justify-between text-xs font-mono text-[#8ca89a]">
                  <span>Toolkit:</span>
                  <div className="flex items-center gap-2 text-[#c8ded1]">
                    {step.toolsUsed.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {idx < step.toolsUsed.length - 1 && (
                          <span className="text-[#325241]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
