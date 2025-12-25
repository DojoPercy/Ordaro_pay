type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
}

class Logger {
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.logLevel];
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, data, error } = entry;
    let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    if (data) log += ` ${JSON.stringify(data)}`;
    if (error) log += ` ${error.stack}`;
    return log;
  }

  private sendToService(entry: LogEntry): void {
    if (typeof window === 'undefined') {
      // Server-side: could send to external logging service
      if (entry.level === 'error' && process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING) {
        // Send to Sentry or similar
        console.error('[LOGGING SERVICE]', entry);
      }
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'debug',
        message,
        data,
      };
      console.debug(this.formatLog(entry));
      this.sendToService(entry);
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'info',
        message,
        data,
      };
      console.log(this.formatLog(entry));
      this.sendToService(entry);
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'warn',
        message,
        data,
      };
      console.warn(this.formatLog(entry));
      this.sendToService(entry);
    }
  }

  error(message: string, error?: Error | any, data?: any): void {
    if (this.shouldLog('error')) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'error',
        message,
        error: error instanceof Error ? error : new Error(String(error)),
        data,
      };
      console.error(this.formatLog(entry));
      this.sendToService(entry);
    }
  }
}

export const logger = new Logger();
