'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Code2, Briefcase, GraduationCap, MapPin, Mail, Github, Linkedin, Download, Heart } from 'lucide-react';

const skills = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'HTML/CSS'],
  'Backend': ['Node.js', 'Python', 'Express', 'REST APIs', 'GraphQL'],
  'Blockchain': ['Solidity', 'Hardhat', 'ethers.js', 'Chainlink', 'IPFS', 'Remix'],
  'Cloud & DevOps': ['AWS Lambda', 'DynamoDB', 'S3', 'Amplify', 'Cognito', 'Docker'],
  'Databases': ['Supabase', 'PostgreSQL', 'MongoDB', 'Firebase', 'DynamoDB'],
  'Tools': ['Git', 'VS Code', 'Figma', 'Postman', 'Vercel', 'Unity'],
};

const timeline = [
  { year: '2022 - Present', title: 'Computer Science Student', org: 'NIST, Odisha', desc: 'Pursuing CSE with focus on blockchain, cloud computing, and full-stack development.' },
  { year: '2023', title: 'Blockchain Developer (Freelance)', org: 'Various Clients', desc: 'Built decentralized applications, smart contracts, and Web3 solutions for startups.' },
  { year: '2024', title: 'Full-Stack Developer', org: 'Freelance & Projects', desc: 'Developed AR applications, QR ordering systems, and healthcare platforms.' },
  { year: '2025-26', title: 'Lead Developer & Freelancer', org: 'Bidyadhar.dev', desc: 'Running freelance practice, building innovative solutions across Web3, AR, and cloud.' },
];

export default function AboutPage() {
  const { locale } = useAppStore();

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-base-200/50 to-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold">{t('about.title', locale)}</h1>
              <div className="section-divider !mx-0"></div>
              <p className="text-base-content/70 leading-relaxed text-lg">{t('about.bio', locale)}</p>
              <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Odisha, India</span>
                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> bidyadhar.sahu.cse.2022@nist.edu</span>
              </div>
              <div className="flex gap-3">
                <a href="https://github.com/bidyadharsahu" target="_blank" className="btn btn-outline btn-sm gap-2"><Github className="w-4 h-4" /> GitHub</a>
                <a href="https://in.linkedin.com/in/bidyadhar-sahu" target="_blank" className="btn btn-outline btn-sm gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                <a href="#" className="btn btn-primary btn-sm text-white gap-2"><Download className="w-4 h-4" /> Resume</a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 overflow-hidden border-2 border-base-300/30 shadow-2xl">
                  <img src="/self.png" alt="Bidyadhar Sahu" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2"><Code2 className="w-8 h-8 text-primary" /> {t('about.skills', locale)}</h2>
          <div className="section-divider"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass-card p-6">
              <h3 className="font-semibold text-primary mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-base-200 rounded-lg text-sm text-base-content/70 hover:bg-primary/10 hover:text-primary transition-colors">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-base-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2"><Briefcase className="w-8 h-8 text-primary" /> Journey & {t('about.experience', locale)}</h2>
            <div className="section-divider"></div>
          </div>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30"></div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-base-300 mt-2"></div>}
                </div>
                <div className="glass-card p-6 flex-1 mb-4">
                  <span className="text-xs text-primary font-medium">{item.year}</span>
                  <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                  <p className="text-sm text-base-content/50">{item.org}</p>
                  <p className="text-sm text-base-content/60 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2"><Heart className="w-8 h-8 text-primary" /> Hobbies & Interests</h2>
          <div className="section-divider"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {['🎨 Painting', '🎬 Movies', '👨‍💻 Blockchain Experiments', '🌿 Nature', '📚 Tech Blogs', '🧘 Meditation', '🎵 Music', '✈️ Travel'].map((hobby) => (
            <div key={hobby} className="glass-card px-6 py-4 text-center hover:scale-105 transition-transform">
              <span className="text-lg">{hobby}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
