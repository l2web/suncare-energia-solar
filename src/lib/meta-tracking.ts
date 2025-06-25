interface MetaEventData {
  eventName: string;
  userData?: {
    clientUserAgent?: string;
    fbp?: string;
    fbc?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    contentName?: string;
    contentCategory?: string;
    contents?: Array<{
      id: string;
      quantity: number;
      title?: string;
    }>;
  };
}

interface LeadData {
  nome: string;
  cidade: string;
  custoEnergia: string;
  telefone?: string;
}

class MetaTracking {
  private accessToken: string;
  private pixelId: string;
  private apiUrl: string;

  constructor() {
    this.accessToken = 'EAAjN7D8nXCIBO7u0ZBm2jALSkmUbJ1ZBeoaeTUkcZAZBIu2yIX3QowyHjwormTZBeP5ZAJSkonNHyDEqKxea3Yi0R2B2NkEvx8M1PEYTYNIQqOk7cZAOzyujMMfUZCmyilrjrWo0yhyFXcatoJgD1YjZApXQrfVQoTmwSNZC7XA93EZCeb0Meay5dVe2zE9SogQ66gdvwZDZD';
    this.pixelId = '612824875159097'; // Pixel ID fornecido
    this.apiUrl = `https://graph.facebook.com/v18.0/${this.pixelId}/events`;
  }

  private generateEventId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Função para aguardar o Meta Pixel carregar
  private waitForFbq(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof (window as any).fbq !== 'undefined') {
        resolve();
      } else {
        const checkFbq = () => {
          if (typeof (window as any).fbq !== 'undefined') {
            resolve();
          } else {
            setTimeout(checkFbq, 100);
          }
        };
        checkFbq();
      }
    });
  }

  private getCookieValue(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  private getClientUserAgent(): string {
    return navigator.userAgent;
  }

  private getFbp(): string | null {
    return this.getCookieValue('_fbp');
  }

  private getFbc(): string | null {
    return this.getCookieValue('_fbc');
  }

  async trackEvent(eventData: MetaEventData): Promise<void> {
    try {
      const eventId = this.generateEventId();
      const timestamp = Math.floor(Date.now() / 1000);

      // Tracking apenas via Conversions API
      const payload = {
        data: [
          {
            event_name: eventData.eventName,
            event_time: timestamp,
            event_id: eventId,
            event_source_url: window.location.href,
            action_source: 'website',
            user_data: {
              client_ip_address: '', // Will be filled by Meta
              client_user_agent: this.getClientUserAgent(),
              fbp: this.getFbp(),
              fbc: this.getFbc(),
              ...eventData.userData
            },
            custom_data: eventData.customData || {}
          }
        ],
        access_token: this.accessToken
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Meta Conversions API error:', errorText);
      } else {
        console.log('✅ Meta Conversions API event tracked:', eventData.eventName);
      }

      // Tracking via Meta Pixel (frontend)
      await this.waitForFbq();
      const fbq = (window as any).fbq;
      
      if (fbq) {
        if (eventData.eventName === 'InitiateCheckout') {
          fbq('track', 'InitiateCheckout', {
            content_name: eventData.customData?.contentName || '',
            content_category: eventData.customData?.contentCategory || ''
          }, { eventID: eventId });
          console.log('✅ Meta Pixel InitiateCheckout tracked');
        } else if (eventData.eventName === 'Lead') {
          fbq('track', 'Lead', {
            content_name: eventData.customData?.contentName || ''
          }, { eventID: eventId });
          console.log('✅ Meta Pixel Lead tracked');
        }
      }

    } catch (error) {
      console.error('❌ Error tracking Meta event:', error);
    }
  }

  async trackInitiateCheckout(leadData: LeadData): Promise<void> {
    await this.trackEvent({
      eventName: 'InitiateCheckout',
      customData: {
        contentName: 'Energia Solar - Orçamento',
        contentCategory: 'Energia Solar',
        contents: [
          {
            id: 'solar-quote',
            quantity: 1,
            title: `Orçamento Energia Solar - ${leadData.cidade}`
          }
        ]
      }
    });
  }


}

// Instância singleton
export const metaTracking = new MetaTracking();

// Função auxiliar para fácil uso
export const trackWhatsAppClick = async (leadData: LeadData) => {
  await metaTracking.trackInitiateCheckout(leadData);
};

export default MetaTracking; 