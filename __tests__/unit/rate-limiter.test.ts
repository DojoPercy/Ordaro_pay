import { rateLimiter } from '@/lib/rate-limiter';

describe('RateLimiter', () => {
  beforeEach(() => {
    rateLimiter.reset('test-user');
  });

  describe('check', () => {
    it('should allow requests within limit', () => {
      const result = rateLimiter.check('test-user');
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBeGreaterThan(0);
    });

    it('should track request count', () => {
      rateLimiter.check('test-user');
      const result = rateLimiter.check('test-user');
      expect(result.remaining).toBeLessThan(100);
    });

    it('should return reset time', () => {
      const result = rateLimiter.check('test-user');
      expect(result.resetTime).toBeGreaterThan(Date.now());
    });
  });

  describe('reset', () => {
    it('should reset rate limit for identifier', () => {
      rateLimiter.check('test-user');
      rateLimiter.reset('test-user');
      const result = rateLimiter.check('test-user');
      expect(result.remaining).toBe(99);
    });
  });
});
