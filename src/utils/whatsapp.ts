/**
 * WhatsApp Integration Utility
 * Handles WhatsApp redirection and message formatting
 */

export class WhatsAppService {
  private static getWhatsAppNumber(): string {
    // Get the WhatsApp number from environment variables
    const number = import.meta.env.VITE_TWILIO_WHATSAPP_NUMBER;
    if (!number) {
      console.warn('WhatsApp number not configured in environment variables');
      return '919917250558'; // Fallback number
    }
    // Remove any non-numeric characters except +
    return number.replace(/[^\d+]/g, '');
  }

  /**
   * Generate WhatsApp chat URL
   * @param message - Initial message to send
   * @param language - User's preferred language
   * @returns WhatsApp URL
   */
  static generateWhatsAppURL(message?: string, language: string = 'english'): string {
    const phoneNumber = this.getWhatsAppNumber();
    
    // Default messages in different languages
    const defaultMessages = {
      english: 'Hi Aarogya-AI! I need health information.',
      hindi: 'नमस्ते आरोग्य-AI! मुझे स्वास्थ्य जानकारी चाहिए।',
      odia: 'ନମସ୍କାର ଆରୋଗ୍ୟ-AI! ମୋତେ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଦରକାର।'
    };

    const defaultMessage = message || defaultMessages[language as keyof typeof defaultMessages] || defaultMessages.english;
    const encodedMessage = encodeURIComponent(defaultMessage);
    
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  }

  /**
   * Open WhatsApp chat
   * @param message - Initial message to send
   * @param language - User's preferred language
   */
  static openWhatsAppChat(message?: string, language: string = 'english'): void {
    const url = this.generateWhatsAppURL(message, language);
    
    // Open in new tab/window
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Check if WhatsApp is available on the device
   * @returns boolean indicating WhatsApp availability
   */
  static isWhatsAppAvailable(): boolean {
    // Check if running on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, WhatsApp app might be available
      return true;
    }
    
    // On desktop, WhatsApp Web is available
    return true;
  }

  /**
   * Get user-friendly WhatsApp button text based on device
   * @param language - User's preferred language
   * @returns Localized button text
   */
  static getButtonText(language: string = 'english'): string {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const buttonTexts = {
      english: isMobile ? 'Open WhatsApp' : 'Chat on WhatsApp Web',
      hindi: isMobile ? 'WhatsApp खोलें' : 'WhatsApp Web पर चैट करें',
      odia: isMobile ? 'WhatsApp ଖୋଲନ୍ତୁ' : 'WhatsApp Web ରେ ଚାଟ କରନ୍ତୁ'
    };

    return buttonTexts[language as keyof typeof buttonTexts] || buttonTexts.english;
  }
}