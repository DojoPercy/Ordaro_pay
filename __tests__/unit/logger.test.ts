import { logger } from '@/lib/logger';

describe('Logger', () => {
  const consoleSpy = {
    log: jest.spyOn(console, 'log').mockImplementation(),
    warn: jest.spyOn(console, 'warn').mockImplementation(),
    error: jest.spyOn(console, 'error').mockImplementation(),
    debug: jest.spyOn(console, 'debug').mockImplementation(),
  };

  afterEach(() => {
    Object.values(consoleSpy).forEach(spy => spy.mockClear());
  });

  afterAll(() => {
    Object.values(consoleSpy).forEach(spy => spy.mockRestore());
  });

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Test message', { key: 'value' });
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it('should include timestamp', () => {
      logger.info('Test message');
      const call = consoleSpy.log.mock.calls[0][0];
      expect(call).toMatch(/\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('warn', () => {
    it('should log warning messages', () => {
      logger.warn('Warning message');
      expect(consoleSpy.warn).toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should log error messages', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('debug', () => {
    it('should log debug messages', () => {
      logger.debug('Debug message');
      expect(consoleSpy.debug).toHaveBeenCalled();
    });
  });
});
