
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Footer */}
      <footer className="bg-suncare-blue-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex flex-col items-center">
              <img 
                src="/03.png" 
                alt="Logo" 
                className="w-36 h-36 md:w-40 md:h-40 object-contain"
              />
              <p className="text-suncare-blue-200 -mt-2 md:-mt-3">
                Energia Solar em Dourados - MS
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3 text-suncare-blue-300">Contato</h4>
              <p className="text-sm text-suncare-blue-100">
                📱 <a href="https://wa.me/5567998031541" target="_blank" rel="noopener noreferrer" className="text-suncare-blue-100 hover:text-white transition-colors">(67) 99803-1541</a><br/>
                📧 contato@suncare.com.br
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-suncare-blue-300">Localização</h4>
              <p className="text-sm text-suncare-blue-100">
                📍 Rua Cuiabá, 2350, sala 04<br/>
                Jardim São Pedro, Dourados - MS<br/>
                CEP: 79802-031
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-suncare-blue-300">Garantia</h4>
              <p className="text-sm text-suncare-blue-100">
                ✅ 25 anos nos painéis<br/>
                ✅ 12 anos no inversor
              </p>
            </div>
          </div>
          
          <div className="border-t border-suncare-blue-700 pt-6">
            <p className="text-suncare-blue-200 text-sm">
              © 2024 SunCare. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
