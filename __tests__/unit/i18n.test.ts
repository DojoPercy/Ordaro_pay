import { i18n } from '@/lib/i18n';

describe('i18n', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  describe('t', () => {
    it('should return translation for key', () => {
      const translation = i18n.t('home.title');
      expect(translation).toBe('Secure Payment Processing for Restaurants');
    });

    it('should return key if translation not found', () => {
      const translation = i18n.t('non.existent.key');
      expect(translation).toBe('non.existent.key');
    });

    it('should support different locales', () => {
      const enTranslation = i18n.t('home.title', 'en');
      const frTranslation = i18n.t('home.title', 'fr');
      expect(enTranslation).not.toBe(frTranslation);
    });
  });

  describe('setLocale', () => {
    it('should set current locale', () => {
      i18n.setLocale('fr');
      expect(i18n.getLocale()).toBe('fr');
    });

    it('should not set invalid locale', () => {
      const currentLocale = i18n.getLocale();
      i18n.setLocale('invalid' as any);
      expect(i18n.getLocale()).toBe(currentLocale);
    });
  });

  describe('getSupportedLocales', () => {
    it('should return array of supported locales', () => {
      const locales = i18n.getSupportedLocales();
      expect(locales).toContain('en');
      expect(locales).toContain('fr');
      expect(locales).toContain('es');
      expect(locales).toContain('de');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency for current locale', () => {
      i18n.setLocale('en');
      const formatted = i18n.formatCurrency(100);
      expect(formatted).toContain('100');
    });
  });

  describe('formatDate', () => {
    it('should format date for current locale', () => {
      const date = new Date('2025-12-25');
      const formatted = i18n.formatDate(date);
      expect(formatted).toBeTruthy();
    });
  });
});
