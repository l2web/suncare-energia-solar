
import React from 'react';
import { Play, ArrowDown, Zap, Shield, Clock } from 'lucide-react';
import { GridBackground } from '@/components/ui/grid-background';

const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#contact-form');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-suncare-blue-900/20 via-transparent to-suncare-blue-800/10" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-suncare-blue-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-suncare-blue-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-suncare-blue-500/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[85vh] md:min-h-[90vh] px-4 py-4 md:py-6">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Logo with modern styling */}
          <div className="mb-4 md:mb-6 animate-fade-in">
            <div className="flex flex-col items-center">
              <img 
                src="/03.png" 
                alt="Logo" 
                className="w-40 h-40 md:w-60 md:h-60 lg:w-72 lg:h-72 object-contain"
              />
              <p className="text-suncare-blue-200 text-base md:text-lg lg:text-xl font-medium -mt-2 md:-mt-4 lg:-mt-6">
                Energia Solar em Dourados - MS
              </p>
            </div>
          </div>

          {/* Video Section with modern card - YouTube Video */}
          <div className="mb-3 md:mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-suncare-blue-400 to-suncare-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/pAGhMkIUb0U"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Main headlines with enhanced typography - smaller on mobile */}
          <div className="space-y-1 md:space-y-3 mb-3 md:mb-6">
            <h2 className="text-lg md:text-3xl lg:text-5xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <span className="bg-gradient-to-r from-white via-suncare-blue-100 to-white bg-clip-text text-transparent">
                Seu sistema de energia solar
              </span>
              <br />
              <span className="bg-gradient-to-r from-suncare-blue-300 to-suncare-blue-400 bg-clip-text text-transparent">
                funcional em menos de 30 dias
              </span>
            </h2>
            
            <p className="text-sm md:text-lg lg:text-xl text-suncare-blue-100 font-medium animate-fade-in max-w-4xl mx-auto" style={{ animationDelay: '0.9s' }}>
              Economize energia com a melhor empresa de Dourados
            </p>
          </div>

          {/* Feature cards - hidden on mobile, shown on desktop */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-suncare-blue-400 to-suncare-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Economia Imediata</h3>
              <p className="text-suncare-blue-200 text-sm">Reduza sua conta em até 95%</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-suncare-blue-400 to-suncare-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Garantia Total</h3>
              <p className="text-suncare-blue-200 text-sm">25 anos nos painéis</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-suncare-blue-400 to-suncare-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Instalação Rápida</h3>
              <p className="text-suncare-blue-200 text-sm">Menos de 30 dias</p>
            </div>
          </div>

          {/* Enhanced scroll indicator - now visible on mobile */}
          <div className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <div className="inline-flex flex-col items-center gap-2 md:gap-3 cursor-pointer group" onClick={scrollToNextSection}>
              <div className="w-8 h-12 md:w-10 md:h-16 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 md:h-3 bg-white rounded-full mt-2 md:mt-3 animate-bounce" />
              </div>
              <div className="flex items-center gap-1 md:gap-2 text-suncare-blue-200 group-hover:text-white transition-colors">
                <ArrowDown className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
                <span className="text-xs md:text-sm font-medium">Role para baixo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
