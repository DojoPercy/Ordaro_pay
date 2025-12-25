interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;
  private enabled: boolean;

  constructor() {
    this.enabled = process.env.RATE_LIMIT_ENABLED === 'true';
    this.config = {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    };

    // Cleanup expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    if (!this.enabled) {
      return { allowed: true, remaining: this.config.maxRequests, resetTime: 0 };
    }

    const now = Date.now();
    const entry = this.store[identifier];

    if (!entry || entry.resetTime < now) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.config.windowMs,
      };
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: this.store[identifier].resetTime,
      };
    }

    entry.count++;
    const allowed = entry.count <= this.config.maxRequests;
    const remaining = Math.max(0, this.config.maxRequests - entry.count);

    return {
      allowed,
      remaining,
      resetTime: entry.resetTime,
    };
  }

  reset(identifier: string): void {
    delete this.store[identifier];
  }
}

export const rateLimiter = new RateLimiter();
