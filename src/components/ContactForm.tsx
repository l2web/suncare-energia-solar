import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Zap, Award, Clock, DollarSign, User, Phone, MapPin, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackWhatsAppClick } from '@/lib/meta-tracking';

interface FormData {
  nome: string;
  telefone: string;
  cidade: string;
  custoEnergia: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    cidade: '',
    custoEnergia: ''
  });

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
  };

  // Função para formatar valor monetário
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const numberValue = parseInt(numbers) / 100;
    return numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Verificar se todos os campos estão preenchidos
  useEffect(() => {
    const { nome, telefone, cidade, custoEnergia } = formData;
    const isComplete = nome.trim() !== '' && 
                      telefone.trim() !== '' && 
                      cidade.trim() !== '' && 
                      custoEnergia.trim() !== '';
    setIsFormComplete(isComplete);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'telefone') {
      value = formatPhone(value);
    } else if (field === 'custoEnergia') {
      const numbers = value.replace(/\D/g, '');
      if (numbers) {
        value = formatCurrency(value);
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    const message = `Nome do cliente: ${formData.nome}
Cidade: ${formData.cidade}
Custo mensal de energia: R$ ${formData.custoEnergia}
Olá, quero saber mais sobre energia solar!`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = async () => {
    try {
      // Rastrear evento Meta InitiateCheckout
      await trackWhatsAppClick({
        nome: formData.nome,
        cidade: formData.cidade,
        custoEnergia: formData.custoEnergia,
        telefone: formData.telefone
      });
      
      console.log('✅ Meta InitiateCheckout event tracked successfully');
    } catch (error) {
      console.error('❌ Error tracking Meta event:', error);
    }
    
    // Abrir WhatsApp
    const phoneNumber = '5567998031541';
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configurar EmailJS
      emailjs.init('yx5DWBpHMJylXr6Jm');

      // Preparar dados para o template
      const emailData = {
        to_name: 'SunCare',
        to_email: 'suncaren8n@gmail.com',
        from_name: formData.nome,
        from_email: 'noreply@suncare.com.br',
        client_name: formData.nome,
        client_phone: formData.telefone,
        client_city: formData.cidade,
        client_energy_cost: formData.custoEnergia,
        submit_date: new Date().toLocaleString('pt-BR'),
        message: `Novo lead recebido do site:
        
Nome: ${formData.nome}
Telefone: ${formData.telefone}
Cidade: ${formData.cidade}
Custo mensal de energia: R$ ${formData.custoEnergia}
Data: ${new Date().toLocaleString('pt-BR')}`,
      };

      // Enviar email
      await emailjs.send(
        'service_a6z2tob',
        'template_zz0hlad',
        emailData
      );

      setSubmitStatus('success');
      
      // Limpar formulário após sucesso
      setTimeout(() => {
        setFormData({
          nome: '',
          telefone: '',
          cidade: '',
          custoEnergia: ''
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error: any) {
      console.error('Erro ao enviar email:', error);
      
      // Log detalhado do erro para debug
      if (error.text) {
        console.error('Detalhes do erro EmailJS:', error.text);
      }
      if (error.status) {
        console.error('Status do erro:', error.status);
      }
      
      setSubmitStatus('error');
      
      // Reset error status após 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (action: 'submit' | 'whatsapp') => {
    if (!isFormComplete) return;
    
    if (action === 'whatsapp') {
      handleWhatsAppClick();
    }
  };

  return (
    <section id="contact-form" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-suncare-blue-50/30 to-suncare-blue-100/20" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-suncare-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-suncare-blue-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Modern card design */}
        <Card className="shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-white/80">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-suncare-blue-600 via-suncare-blue-700 to-suncare-blue-800" />
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative text-center py-8 md:py-12">
              <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Send className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <CardTitle className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                  Solicite um Orçamento Gratuito
                </CardTitle>
              </div>
              <p className="text-suncare-blue-100 text-sm md:text-lg max-w-2xl mx-auto">
                Descubra quanto você pode economizar com energia solar. Preencha os dados e receba sua proposta personalizada.
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Nome */}
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="nome" className="flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base">
                    <User className="w-3 h-3 md:w-4 md:h-4 text-suncare-blue-600" />
                    Nome Completo *
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="h-10 md:h-12 border-2 border-gray-200 focus:border-suncare-blue-500 focus:ring-suncare-blue-500/20 rounded-xl transition-all duration-200"
                    required
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="telefone" className="flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 text-suncare-blue-600" />
                    Telefone *
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    placeholder="(67) 99999-9999"
                    maxLength={15}
                    className="h-10 md:h-12 border-2 border-gray-200 focus:border-suncare-blue-500 focus:ring-suncare-blue-500/20 rounded-xl transition-all duration-200"
                    required
                  />
                </div>

                {/* Cidade */}
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="cidade" className="flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-suncare-blue-600" />
                    Cidade *
                  </Label>
                  <Input
                    id="cidade"
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    placeholder="Digite sua cidade"
                    className="h-10 md:h-12 border-2 border-gray-200 focus:border-suncare-blue-500 focus:ring-suncare-blue-500/20 rounded-xl transition-all duration-200"
                    required
                  />
                </div>

                {/* Custo de Energia */}
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="custoEnergia" className="flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base">
                    <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-suncare-blue-600" />
                    Quanto você paga por mês de energia? *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm md:text-base">
                      R$
                    </span>
                    <Input
                      id="custoEnergia"
                      type="text"
                      value={formData.custoEnergia}
                      onChange={(e) => handleInputChange('custoEnergia', e.target.value)}
                      placeholder="0,00"
                      className="h-10 md:h-12 pl-10 md:pl-12 border-2 border-gray-200 focus:border-suncare-blue-500 focus:ring-suncare-blue-500/20 rounded-xl transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Botão WhatsApp */}
              <div className="space-y-3 md:space-y-4 pt-4 md:pt-6">
                <Button
                  type="button"
                  onClick={() => handleButtonClick('whatsapp')}
                  className={`w-full h-12 md:h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base md:text-lg font-semibold rounded-xl shadow-lg transition-all duration-500 transform ${
                    isFormComplete 
                      ? 'opacity-100 hover:shadow-xl hover:scale-[1.02] cursor-pointer animate-pulse-glow' 
                      : 'opacity-30 cursor-not-allowed hover:scale-100 hover:shadow-lg'
                  }`}
                  disabled={!isFormComplete}
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  🚀 Falar com Consultor no WhatsApp
                </Button>
                
                {!isFormComplete && (
                  <div className="text-center text-gray-500 py-4 md:py-6 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <p className="font-medium text-sm md:text-base">Preencha todos os campos para ativar os botões</p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Enhanced benefits section - moved here for mobile visibility */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="group text-center p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-suncare-blue-500 to-suncare-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg md:text-xl text-suncare-blue-800 mb-2 md:mb-3">Economia Imediata</h3>
            <p className="text-gray-600 text-sm md:text-base">Reduza sua conta de energia em até 95% desde o primeiro mês</p>
          </div>
          
          <div className="group text-center p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-suncare-blue-500 to-suncare-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg md:text-xl text-suncare-blue-800 mb-2 md:mb-3">Garantia Total</h3>
            <p className="text-gray-600 text-sm md:text-base">25 anos nos painéis e 12 anos no inversor</p>
          </div>
          
          <div className="group text-center p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-suncare-blue-500 to-suncare-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg md:text-xl text-suncare-blue-800 mb-2 md:mb-3">Instalação Rápida</h3>
            <p className="text-gray-600 text-sm md:text-base">Sistema funcionando em menos de 30 dias com garantia total</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
