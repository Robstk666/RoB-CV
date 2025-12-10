import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownCircle, Mail, Phone, MapPin, Download, Rocket, Briefcase, Award, TrendingUp, X, ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { EXPERIENCES, PROJECTS, SKILLS, HERO_IMAGE_URL } from './constants';
import { HandDrawnArrow, CurvedArrow } from './components/HandDrawnArrow';
import { Project, Experience } from './types';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: PROJECT MODAL ---
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation in
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, 
      { scale: 0.9, opacity: 0, y: 20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
    );
  }, []);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleClose = () => {
    gsap.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, { 
      opacity: 0, 
      duration: 0.2, 
      onComplete: onClose 
    });
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-neutral-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-lime-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        {/* IMAGE GALLERY SECTION (Left/Top) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-neutral-800 group overflow-hidden">
          <img 
            src={project.images[currentImageIndex]} 
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          
          {/* Gallery Controls */}
          {project.images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur text-white rounded-full hover:bg-lime-400 hover:text-black transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur text-white rounded-full hover:bg-lime-400 hover:text-black transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-lime-400' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* INFO SECTION (Right/Bottom) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-neutral-900">
           <div className="mb-2">
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest border border-lime-400/20 px-2 py-1 rounded">
                {project.category}
              </span>
           </div>
           <h2 className="font-display text-4xl uppercase text-white mb-6">{project.name}</h2>
           
           <div className="space-y-4 text-neutral-300 leading-relaxed text-sm md:text-base border-l-2 border-white/10 pl-4">
              <p>{project.description}</p>
           </div>

           <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                Gallery
              </div>
              <div className="flex gap-2">
                {project.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-12 h-8 rounded overflow-hidden border transition-all ${idx === currentImageIndex ? 'border-lime-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const clientsPanelRef = useRef<HTMLDivElement>(null);
  const contactPanelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isMobileDnaOpen, setIsMobileDnaOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Setup
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Smooth scrubbing effect
        },
      });

      // --- SEQUENCE 0: HERO FADE OUT ---
      // Name stays for a bit (0-10% scroll), then fades out
      tl.to(heroNameRef.current, {
        opacity: 0,
        scale: 0.8,
        y: -100,
        duration: 2,
        ease: "power2.inOut"
      }, "start+=0.5"); // Start slightly later

      // Scroll Indicator fades out immediately
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.5
      }, "start");

      // Character "Wakes Up" - Comes from bottom
      // Start hidden at bottom (set in CSS/Inline), then move up
      tl.fromTo(characterRef.current, 
        { opacity: 0, y: 150, filter: "brightness(0.5)" },
        {
          opacity: 1,
          y: 50, // Final position
          filter: "brightness(1.1)",
          duration: 3,
          ease: "power2.out"
        }, "start"
      );


      // --- SEQUENCE 1: THE GATE OPENS (Experience & DNA) ---
      // Left Panel slides in from left
      tl.fromTo(leftPanelRef.current, 
        { x: "-120%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 5, ease: "power2.out" },
        "scene1"
      );

      // Right Panel slides in from right
      tl.fromTo(rightPanelRef.current,
        { x: "120%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 5, ease: "power2.out" },
        "scene1"
      );

      // --- SEQUENCE 2: CLIENTS & EXTRA SKILLS ---
      // Clients panel slides up from bottom left
      tl.fromTo(clientsPanelRef.current,
        { y: "150%", opacity: 0, scale: 0.8 },
        { y: "0%", opacity: 1, scale: 1, duration: 4, ease: "back.out(1.2)" },
        "scene2"
      );

      // --- SEQUENCE 3: CONTACT REVEAL ---
      // Fade out content slightly to focus on contact overlay (simulated by scale up of contact button)
      tl.fromTo(contactPanelRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
        "scene3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to find project from experience company name
  const handleExperienceClick = (experience: Experience) => {
    // Try to find a project that includes the company name or vice versa
    const found = PROJECTS.find(p => 
      p.name.toLowerCase().includes(experience.company.toLowerCase()) || 
      experience.company.toLowerCase().includes(p.name.toLowerCase()) ||
      // Manual mapping for cases where names differ significantly
      (experience.company.includes("FINT") && (p.name.includes("FINT") || p.name.includes("Парк Отель"))) ||
      (experience.company.includes("Акимбо") && p.name.includes("Акимбо")) ||
      (experience.company.includes("ЦВИ") && p.name.includes("ЦВИ")) ||
      (experience.company.includes("Центр Визуального Искусства") && p.name.includes("ЦВИ")) ||
      (experience.company.includes("Сайты за 72 часа") && p.name.includes("Сайты за 72 часа"))
    );

    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <div className="bg-neutral-900 text-white selection:bg-lime-400 selection:text-black">
      {/* 
        SCROLL SPACER 
        This div provides the physical height for the scrollbar. 
        The actual content is sticky inside.
      */}
      <div ref={containerRef} className="h-[400vh] relative">
        
        {/* STICKY VIEWPORT - Content lives here */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* BACKGROUND LAYER: Massive Name */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h1 
              ref={heroNameRef}
              className="font-display text-[12vw] md:text-[13vw] leading-none text-neutral-800 uppercase tracking-tighter text-center whitespace-nowrap opacity-100 mix-blend-color-dodge select-none"
            >
              ГРЖИМАЙЛО <br /> РОБЕРТ
            </h1>
          </div>

          {/* MIDDLE LAYER: The Character (Central Figure) */}
          {/* Initial state: Hidden (opacity 0), moved down. Controlled by GSAP */}
          <div 
            ref={characterRef}
            className="absolute z-10 w-full h-full flex items-end justify-center pointer-events-none pb-0 opacity-0 translate-y-20"
          >
             {/* 
               ВАШЕ ФОТО:
             */}
            <div className="relative w-auto h-[70vh] md:h-[90vh] flex justify-center items-end">
               <img 
                 src={HERO_IMAGE_URL} 
                 alt="Роберт Гржимайло"
                 className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] grayscale hover:grayscale-0 transition-all duration-700"
                 style={{ 
                   maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', 
                   WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' 
                 }}
               />
               
               {/* Overlay Name for context if hero text fades too much */}
               <div className="absolute bottom-16 w-full text-center px-4 z-20">
                  <p className="text-lime-400 font-bold tracking-[0.3em] text-xs md:text-sm drop-shadow-lg uppercase bg-neutral-900/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    Business Development Manager
                  </p>
               </div>

               {/* Gradient overlay to blend bottom of torso into page if photo cuts off abruptly */}
               <div className="absolute bottom-0 left-[-50%] right-[-50%] h-40 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent z-10"></div>
            </div>
          </div>

          {/* FRONT LAYER: The Content Gates */}
          
          {/* LEFT PANEL: Creative DNA & Projects */}
          {/* 
              MOBILE BEHAVIOR: Fixed Header (Collapsible)
              DESKTOP BEHAVIOR: Absolute Side Panel
          */}
          <div 
            ref={leftPanelRef}
            className={`
              transition-all duration-300 ease-in-out
              /* Mobile Styles */
              fixed top-0 left-0 w-full z-[60] bg-neutral-900 border-b border-white/10 shadow-2xl
              flex flex-col
              /* Desktop Styles override */
              md:absolute md:top-0 md:left-0 md:w-1/3 md:h-full md:bg-transparent md:border-none md:shadow-none md:z-20 md:p-12 md:justify-center
              ${isMobileDnaOpen ? 'h-auto max-h-[85vh]' : 'h-[70px] md:h-full'}
            `}
          >
             {/* CONTENT CONTAINER - Handles scrolling for mobile when open, centered for desktop */}
            <div className={`
              w-full h-full md:my-auto md:min-h-min overflow-hidden 
              /* Desktop Overflow Fix: Enable scroll if content is tall (8 projects) */
              md:max-h-screen md:overflow-y-auto custom-scrollbar
              ${isMobileDnaOpen ? 'overflow-y-auto' : ''}
            `}>
              
              {/* CARD CONTAINER */}
              {/* MOBILE: Transparent to let wrapper color show. DESKTOP: Blurred. */}
              <div className="bg-transparent md:bg-neutral-900/80 md:backdrop-blur-md md:border md:border-white/10 p-4 md:p-8 md:rounded-3xl md:shadow-2xl md:transform md:-rotate-2 md:transition-transform md:hover:rotate-0 md:duration-500 group">
                
                {/* HEADER ROW (Always visible on mobile) */}
                <div 
                  className="flex items-center justify-between md:justify-start gap-3 md:mb-6 cursor-pointer md:cursor-default"
                  onClick={() => setIsMobileDnaOpen(!isMobileDnaOpen)}
                >
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-400 rounded-full text-black shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                        <TrendingUp size={24} />
                      </div>
                      <h2 className="font-display text-xl md:text-3xl uppercase tracking-wide text-white">Проф ДНК</h2>
                   </div>
                   {/* Toggle Icon (Mobile Only) */}
                   <div className="md:hidden text-lime-400">
                      {isMobileDnaOpen ? <ChevronUp /> : <ChevronDown />}
                   </div>
                </div>

                {/* EXPANDABLE CONTENT (Hidden on mobile unless open) */}
                <div className={`space-y-6 text-neutral-300 mt-6 ${isMobileDnaOpen ? 'block' : 'hidden md:block'}`}>
                  <div className="flex justify-between">
                      <div>
                         <p className="text-4xl font-bold text-white mb-1">12+</p>
                         <p className="text-[10px] uppercase tracking-wider text-neutral-500">Лет опыта</p>
                      </div>
                      <div className="text-right">
                         <p className="text-4xl font-bold text-lime-400 mb-1">4</p>
                         <p className="text-[10px] uppercase tracking-wider text-neutral-500">Запуска с «0»</p>
                      </div>
                  </div>
                  
                  <p className="leading-relaxed border-t border-white/10 pt-6 mt-6 text-sm">
                    <span className="text-white font-semibold">Нахожу возможности для роста и превращаю их в прибыль.</span>
                  </p>
                  <p className="leading-relaxed text-sm">
                    Запускаю проекты, вывожу бизнесы на самоокупаемость и масштабирую продажи. Увеличивал выручку на <span className="text-lime-400 font-bold">23-48%</span> в HoReCa и генерировал <span className="text-lime-400 font-bold">10M+</span> в IT-продажах.
                  </p>

                  <div className="relative pt-4 hidden md:block">
                     <HandDrawnArrow className="w-16 h-16 text-lime-400 absolute -right-4 -top-4 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     <div className="flex flex-wrap gap-2">
                       <span className="text-xs bg-white/10 px-2 py-1 rounded">Problem Solver</span>
                       <span className="text-xs bg-white/10 px-2 py-1 rounded">Startupper</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* MEGA CLIENTS (Inside expandable area on mobile) */}
              <div 
                ref={clientsPanelRef} 
                className={`mt-4 md:mt-8 bg-neutral-900/90 border border-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-sm ${isMobileDnaOpen ? 'block' : 'hidden md:block'}`}
              >
                 <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
                   <Award size={14} className="text-lime-400" /> Проекты & Компании
                 </h3>
                 <div className="grid grid-cols-2 gap-2 opacity-80">
                   {PROJECTS.map((project) => (
                     <button 
                      key={project.name} 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent closing header
                        setActiveProject(project);
                      }}
                      className="text-[11px] font-semibold text-center p-2 bg-white/5 rounded hover:bg-white/10 hover:text-lime-400 transition-all cursor-pointer border border-transparent hover:border-lime-400/30 active:scale-95"
                     >
                       {project.name}
                     </button>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Career Journey */}
          {/* 
              MOBILE: Full screen below header, scrollable.
              DESKTOP: Absolute Right Panel.
              FIX: use !left-auto to ensure right positioning on desktop
          */}
          <div 
             ref={rightPanelRef}
             className="absolute top-0 left-0 w-full h-full md:w-1/3 md:!left-auto md:right-0 p-4 md:p-12 flex flex-col justify-start md:justify-center z-20 pointer-events-auto pt-[80px] md:pt-12 overflow-y-auto custom-scrollbar md:overflow-visible"
          >
             <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl transform md:rotate-2 transition-transform hover:rotate-0 duration-500 h-fit md:max-h-[85vh] md:overflow-y-auto custom-scrollbar mb-24 md:mb-0">
                <div className="flex items-center gap-3 mb-8 sticky top-0 bg-neutral-900/95 p-2 -m-2 z-10 md:static md:bg-transparent md:p-0 md:m-0">
                   <div className="p-2 bg-white text-black rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                     <Briefcase size={24} />
                   </div>
                   <h2 className="font-display text-3xl uppercase tracking-wide">Карьера</h2>
                </div>
                
                <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8">
                   {EXPERIENCES.map((job, idx) => {
                     // Check if this experience has a linked project to make it clickable
                     const isClickable = PROJECTS.some(p => 
                        p.name.toLowerCase().includes(job.company.toLowerCase()) || 
                        job.company.toLowerCase().includes(p.name.toLowerCase()) ||
                        (job.company.includes("FINT") && (p.name.includes("FINT") || p.name.includes("Парк Отель"))) ||
                        (job.company.includes("Акимбо") && p.name.includes("Акимбо")) ||
                         (job.company.includes("ЦВИ") && p.name.includes("ЦВИ")) ||
                         (job.company.includes("Центр Визуального Искусства") && p.name.includes("ЦВИ")) ||
                         (job.company.includes("Сайты за 72 часа") && p.name.includes("Сайты за 72 часа"))
                     );

                     return (
                       <div 
                        key={idx} 
                        className={`relative group ${isClickable ? 'cursor-pointer' : ''}`}
                        onClick={() => isClickable && handleExperienceClick(job)}
                       >
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-neutral-900 border-2 transition-all ${isClickable ? 'border-lime-400 group-hover:bg-lime-400 group-hover:shadow-[0_0_10px_rgba(163,230,53,0.8)]' : 'border-neutral-600'}`}></div>
                          
                          <h3 className="font-bold text-base text-white group-hover:text-lime-400 transition-colors uppercase flex items-center gap-2">
                            {job.role}
                            {isClickable && <ArrowDownCircle size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-opacity text-lime-400" />}
                          </h3>
                          <p className="text-neutral-300 text-sm font-semibold">{job.company}</p>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                             <span>{job.period}</span>
                          </div>
                          <div className="inline-block mt-2 px-2 py-0.5 rounded bg-white/5 text-[10px] text-neutral-400 border border-white/5">
                             {job.type}
                          </div>
                       </div>
                     );
                   })}
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2"><Rocket size={14}/> Навыки</h3>
                   <div className="flex flex-wrap gap-2">
                      {SKILLS.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-300 border border-white/5 hover:border-lime-400/50 hover:text-white transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* SCROLL INDICATOR (Fades out) */}
          <div ref={scrollIndicatorRef} className="absolute bottom-5 z-30 flex flex-col-reverse items-center gap-2 animate-bounce mix-blend-difference">
             <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Смахни</p>
             <ArrowDownCircle className="text-lime-400 w-8 h-8" />
          </div>

          {/* FOOTER / CONTACT (Always visible late scroll) */}
          <div ref={contactPanelRef} className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-50 flex flex-col gap-4 items-end">
             <button className="group relative flex items-center gap-3 bg-lime-400 text-neutral-900 px-6 py-3 rounded-full font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                <span className="uppercase tracking-wide">Скачать CV</span>
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
             </button>
             
             <div className="bg-neutral-900/90 backdrop-blur border border-white/10 p-4 rounded-xl flex flex-col gap-2 text-sm text-neutral-400 min-w-[250px] shadow-2xl">
                <a href="mailto:rob.akimbo@mail.ru" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                  <Mail size={16} className="text-lime-400 group-hover:text-white transition-colors" /> rob.akimbo@mail.ru
                </a>
                <a href="tel:+79625630763" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                  <Phone size={16} className="text-lime-400 group-hover:text-white transition-colors" /> +7 (962) 563-07-63
                </a>
                <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                  <MapPin size={16} className="text-lime-400 group-hover:text-white transition-colors" /> Москва, Россия
                </div>
             </div>
          </div>

          {/* DECORATIVE ELEMENTS */}
          <CurvedArrow className="absolute top-[20%] right-[25%] w-24 h-24 text-lime-400 opacity-20 rotate-45 pointer-events-none" />

          {/* MODAL */}
          {activeProject && (
            <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
