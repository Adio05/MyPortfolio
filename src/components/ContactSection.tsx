import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#09130e] border-t border-[#182d22] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#0e1d15] to-[#09130e] border border-[#234533] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4ade80]">
                <span>05 / Let's Connect</span>
                <span aria-hidden="true" className="text-[#325241]">·</span>
                <span>Open for Opportunities</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Have a project, tip, or entry-level opportunity?
              </h2>

              <p className="text-base text-[#a2beb0] max-w-xl leading-relaxed">
                I’m always eager to learn from experienced data engineers, collaborate on open-source pipelines, and contribute to forward-thinking teams.
              </p>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#09110d] bg-[#4ade80] hover:bg-[#86efac] rounded-xl transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#4ade80]/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>

            {/* Right Connect Box */}
            <div className="lg:col-span-5 bg-[#08120d] border border-[#1b3425] rounded-2xl p-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#8ca89a] pb-2 border-b border-[#1b3425]">
                Direct Contact Channels
              </div>

              {/* Email Row with Copy */}
              <div className="p-3.5 rounded-xl bg-[#0c1812] border border-[#1a3325] flex items-center justify-between">
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-[#8ca89a]">Email Address</div>
                  <div className="text-xs sm:text-sm font-medium text-white truncate font-mono">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-[#8ca89a] hover:text-[#4ade80] transition-colors rounded-lg bg-[#14261c] shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-[#4ade80]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn Link */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-[#0c1812] border border-[#1a3325] hover:border-[#2f5941] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#38bdf8]" />
                  <div>
                    <div className="text-[11px] font-mono text-[#8ca89a]">LinkedIn Network</div>
                    <div className="text-xs sm:text-sm font-medium text-white group-hover:text-[#4ade80] transition-colors">
                      moyinoluwaadio
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8ca89a] group-hover:text-[#4ade80] transition-colors" />
              </a>

              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-[#0c1812] border border-[#1a3325] hover:border-[#2f5941] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[#4ade80]" />
                  <div>
                    <div className="text-[11px] font-mono text-[#8ca89a]">GitHub Profile</div>
                    <div className="text-xs sm:text-sm font-medium text-white group-hover:text-[#4ade80] transition-colors">
                      github.com/Adio05
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8ca89a] group-hover:text-[#4ade80] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

