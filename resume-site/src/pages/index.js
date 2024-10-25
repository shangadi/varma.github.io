import React, { useState, useEffect } from 'react';

const Resume = () => {
  const [theme, setTheme] = useState('light');
  const [openSections, setOpenSections] = useState({
    experience: false,  // Changed to false by default
    education: false,   // Changed to false by default
    skills: false,      // Changed to false by default
    projects: false     // Changed to false by default
  });
  const [mounted, setMounted] = useState(false);

  // Handle initial mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const themeStyles = {
    light: {
      background: 'bg-gradient-to-br from-gray-50 to-gray-100',
      card: 'bg-white',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      cardHover: 'hover:bg-gray-50',
      skillBadge: 'bg-gray-100 text-gray-700 border border-gray-200',
      border: 'border-gray-200',
      button: 'bg-white hover:bg-gray-50',
      headerBg: 'bg-white',
      gradient: 'from-blue-50 to-purple-50'
    },
    dark: {
      background: 'bg-gradient-to-br from-gray-900 to-gray-800',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      subtext: 'text-gray-400',
      cardHover: 'hover:bg-gray-700',
      skillBadge: 'bg-gray-700 text-gray-300 border border-gray-600',
      border: 'border-gray-700',
      button: 'bg-gray-800 hover:bg-gray-700',
      headerBg: 'bg-gray-800',
      gradient: 'from-blue-900 to-purple-900'
    }
  };

  const SectionCard = ({ title, children, isOpen, onToggle, icon }) => (
    <div 
      className={`mb-6 rounded-xl shadow-lg overflow-hidden border ${themeStyles[theme].card} 
        ${themeStyles[theme].border} transition-all duration-500 
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 flex justify-between items-center 
          ${themeStyles[theme].cardHover} transition-colors duration-300
          group hover:shadow-md`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className={`text-xl font-semibold ${themeStyles[theme].text}`}>{title}</h2>
        </div>
        <span 
          className={`w-6 h-6 flex items-center justify-center rounded-full 
            ${themeStyles[theme].skillBadge} transition-transform duration-300 
            ${isOpen ? 'rotate-180' : ''} group-hover:scale-110`}
        >
          ▼
        </span>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  // Rest of the component remains the same, just update the section renderings:

  return (
    <div className={`min-h-screen ${themeStyles[theme].background} transition-colors duration-500`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg ${themeStyles[theme].button} 
            transition-all duration-300 transform hover:scale-110 
            hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

{/* Header */}
<header className={`${themeStyles[theme].headerBg} shadow-lg transition-colors duration-500
        bg-gradient-to-r ${themeStyles[theme].gradient}`}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className={`text-5xl font-bold ${themeStyles[theme].text} mb-4`}>
              VARMA, GADIRAJU
            </h1>
            <p className={`text-2xl ${themeStyles[theme].subtext} mb-6`}>
              Devops / Cloud Engineer
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className={`flex items-center gap-2 ${themeStyles[theme].subtext} 
                transition-colors duration-300 hover:scale-105 transform`}>
                <span className="text-xl animate-bounce">📍</span>
                <span>Overland Park, KS</span>
              </div>
              
              <a href="mailto:john@example.com" 
                className={`flex items-center gap-2 ${themeStyles[theme].subtext} 
                  hover:scale-105 transition-all duration-300 hover:text-blue-500`}>
                <span className="text-xl animate-pulse">✉️</span>
                <span>gv.shanmukha@gmail.com</span>
              </a>
              
              <div className="flex gap-4 flex-wrap">
                {[
                  { name: 'GitHub', emoji: '💻', url: 'https://github.com' },
                  { name: 'LinkedIn', emoji: '🔗', url: 'https://linkedin.com' }
                ].map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full 
                      ${themeStyles[theme].button} ${themeStyles[theme].text} 
                      shadow-md hover:scale-105 transition-all duration-300
                      hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 
                      hover:text-white`}
                  >
                    <span>{link.emoji}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with updated section cards */}
      <main className="max-w-4xl mx-auto px-6 py-12">

      <SectionCard 
          title="Skills" 
          icon="🚀"
          isOpen={openSections.skills}
          onToggle={() => toggleSection('skills')}
        >
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'JavaScript', emoji: '📜' },
              { name: 'TypeScript', emoji: '💪' },
              { name: 'React', emoji: '⚛️' },
              { name: 'Node.js', emoji: '🟢' },
              { name: 'Python', emoji: '🐍' },
              { name: 'AWS', emoji: '☁️' },
              { name: 'Docker', emoji: '🐋' },
              { name: 'Git', emoji: '📚' }
            ].map((skill) => (
              <span 
                key={skill.name} 
                className={`px-4 py-2 rounded-full ${themeStyles[theme].skillBadge} 
                  transition-all duration-300 transform hover:scale-110 flex items-center gap-2`}
              >
                <span>{skill.emoji}</span>
                <span>{skill.name}</span>
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard 
          title="Certifications" 
          icon="💡"
          isOpen={openSections.projects}
          onToggle={() => toggleSection('projects')}
        >
          <div className="space-y-8">
            {[
              {
                title: "Terraform Associate (003)",
                description: "",
                color: "border-purple-500"
              },
              {
                title: "GCP: Associate Cloud Engineer",
                description: "",
                color: "border-orange-500"
              }
            ].map((project, index) => (
              <div key={index} className={`relative pl-4 border-l-2 ${project.color}`}>
                <h3 className={`text-lg font-semibold ${themeStyles[theme].text}`}>{project.title}</h3>
                <p className={`mt-2 ${themeStyles[theme].subtext}`}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard 
          title="Experience" 
          icon="💼"
          isOpen={openSections.experience}
          onToggle={() => toggleSection('experience')}
        >
          <div className="space-y-8">
            {[
              {
                title: "Senior Software Engineer - Tech Corp",
                period: "2020 - Present",
                achievements: [
                  "Led development of microservices architecture",
                  "Mentored junior developers and conducted code reviews",
                  "Implemented CI/CD pipelines reducing deployment time by 50%"
                ]
              },
              {
                title: "Software Engineer - StartUp Inc",
                period: "2018 - 2020",
                achievements: [
                  "Developed and maintained React-based front-end applications",
                  "Collaborated with UX team to implement responsive designs",
                  "Optimized application performance improving load times by 40%"
                ]
              }
            ].map((job, index) => (
              <div key={index} className="relative pl-4 border-l-2 border-blue-500">
                <h3 className={`text-lg font-semibold ${themeStyles[theme].text}`}>{job.title}</h3>
                <p className={`${themeStyles[theme].subtext} mb-2`}>{job.period}</p>
                <ul className={`space-y-2 ${themeStyles[theme].subtext}`}>
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard 
          title="Education" 
          icon="🎓"
          isOpen={openSections.education}
          onToggle={() => toggleSection('education')}
        >
          <div className="relative pl-4 border-l-2 border-green-500">
            <h3 className={`text-lg font-semibold ${themeStyles[theme].text}`}>MS in Computer Science</h3>
            <p className={`${themeStyles[theme].subtext}`}>Chicago State University, 2018</p>
          </div>
        </SectionCard>

      </main>
    </div>
  );
};

export default Resume;