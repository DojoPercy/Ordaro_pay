type Locale = 'en' | 'fr' | 'es' | 'de';

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'home.title': 'Secure Payment Processing for Restaurants',
    'home.subtitle': 'Fast, reliable, and secure payment solutions',
    'home.cta': 'Get Started',
    'payment.title': 'Payment Details',
    'payment.amount': 'Amount',
    'payment.status': 'Status',
    'payment.success': 'Payment Successful',
    'payment.failed': 'Payment Failed',
    'payment.pending': 'Payment Pending',
    'error.title': 'Error',
    'error.message': 'An error occurred',
    'error.retry': 'Retry',
    'loading.title': 'Loading',
    'loading.message': 'Please wait...',
    'nav.home': 'Home',
    'nav.pay': 'Pay',
    'nav.security': 'Security',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',
    'footer.copyright': '© 2025 Ordaro. All rights reserved.',
  },
  fr: {
    'home.title': 'Traitement sécurisé des paiements pour les restaurants',
    'home.subtitle': 'Solutions de paiement rapides, fiables et sécurisées',
    'home.cta': 'Commencer',
    'payment.title': 'Détails du paiement',
    'payment.amount': 'Montant',
    'payment.status': 'Statut',
    'payment.success': 'Paiement réussi',
    'payment.failed': 'Paiement échoué',
    'payment.pending': 'Paiement en attente',
    'error.title': 'Erreur',
    'error.message': 'Une erreur est survenue',
    'error.retry': 'Réessayer',
    'loading.title': 'Chargement',
    'loading.message': 'Veuillez patienter...',
    'nav.home': 'Accueil',
    'nav.pay': 'Payer',
    'nav.security': 'Sécurité',
    'nav.privacy': 'Confidentialité',
    'nav.terms': 'Conditions',
    'footer.copyright': '© 2025 Ordaro. Tous droits réservés.',
  },
  es: {
    'home.title': 'Procesamiento seguro de pagos para restaurantes',
    'home.subtitle': 'Soluciones de pago rápidas, confiables y seguras',
    'home.cta': 'Comenzar',
    'payment.title': 'Detalles del pago',
    'payment.amount': 'Cantidad',
    'payment.status': 'Estado',
    'payment.success': 'Pago exitoso',
    'payment.failed': 'Pago fallido',
    'payment.pending': 'Pago pendiente',
    'error.title': 'Error',
    'error.message': 'Ocurrió un error',
    'error.retry': 'Reintentar',
    'loading.title': 'Cargando',
    'loading.message': 'Por favor espere...',
    'nav.home': 'Inicio',
    'nav.pay': 'Pagar',
    'nav.security': 'Seguridad',
    'nav.privacy': 'Privacidad',
    'nav.terms': 'Términos',
    'footer.copyright': '© 2025 Ordaro. Todos los derechos reservados.',
  },
  de: {
    'home.title': 'Sichere Zahlungsabwicklung für Restaurants',
    'home.subtitle': 'Schnelle, zuverlässige und sichere Zahlungslösungen',
    'home.cta': 'Jetzt starten',
    'payment.title': 'Zahlungsdetails',
    'payment.amount': 'Betrag',
    'payment.status': 'Status',
    'payment.success': 'Zahlung erfolgreich',
    'payment.failed': 'Zahlung fehlgeschlagen',
    'payment.pending': 'Zahlung ausstehend',
    'error.title': 'Fehler',
    'error.message': 'Ein Fehler ist aufgetreten',
    'error.retry': 'Wiederholen',
    'loading.title': 'Wird geladen',
    'loading.message': 'Bitte warten Sie...',
    'nav.home': 'Startseite',
    'nav.pay': 'Bezahlen',
    'nav.security': 'Sicherheit',
    'nav.privacy': 'Datenschutz',
    'nav.terms': 'Bedingungen',
    'footer.copyright': '© 2025 Ordaro. Alle Rechte vorbehalten.',
  },
};

class I18n {
  private locale: Locale;
  private defaultLocale: Locale = 'en';

  constructor() {
    const storedLocale = typeof window !== 'undefined' 
      ? localStorage.getItem('locale') as Locale
      : null;
    
    const envLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale;
    this.locale = storedLocale || envLocale || this.defaultLocale;
  }

  /**
   * Get translation for key
   */
  t(key: string, locale?: Locale): string {
    const currentLocale = locale || this.locale;
    return translations[currentLocale]?.[key] || translations[this.defaultLocale][key] || key;
  }

  /**
   * Set current locale
   */
  setLocale(locale: Locale): void {
    if (translations[locale]) {
      this.locale = locale;
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', locale);
      }
    }
  }

  /**
   * Get current locale
   */
  getLocale(): Locale {
    return this.locale;
  }

  /**
   * Get supported locales
   */
  getSupportedLocales(): Locale[] {
    return Object.keys(translations) as Locale[];
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number, locale?: Locale): string {
    const currentLocale = locale || this.locale;
    const currencyMap: Record<Locale, string> = {
      en: 'USD',
      fr: 'EUR',
      es: 'EUR',
      de: 'EUR',
    };

    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currencyMap[currentLocale],
    }).format(amount);
  }

  /**
   * Format date
   */
  formatDate(date: Date, locale?: Locale): string {
    const currentLocale = locale || this.locale;
    return new Intl.DateTimeFormat(currentLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  /**
   * Format time
   */
  formatTime(date: Date, locale?: Locale): string {
    const currentLocale = locale || this.locale;
    return new Intl.DateTimeFormat(currentLocale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }
}

export const i18n = new I18n();
