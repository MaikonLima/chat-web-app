import { Injectable, LoggerService } from '@nestjs/common';

type LogMeta = Record<string, unknown>;

@Injectable()
export class AppLogger implements LoggerService {
  
  log(message: any, meta?: LogMeta) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta ?? '');
  }
  
  error(message: any, trace?: string, meta?: LogMeta) {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      meta ?? '',
      trace ?? '',
    );
  }
  
  warn(message: any, meta?: LogMeta) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta ?? '');
  }

  debug(message: any, meta?: LogMeta) {
    console.debug(
      `[DEBUG] ${new Date().toISOString()} - ${message}`,
      meta ?? '',
    );
  }
  
  verbose(message: any, meta?: LogMeta) {
    console.info(
      `[VERBOSE] ${new Date().toISOString()} - ${message}`,
      meta ?? '',
    );
  }
}
