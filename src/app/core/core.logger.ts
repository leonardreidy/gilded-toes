export interface CoreLoggerITF {
    log(message: string, type: LogType): void;
  }
  
  export enum LogType {
    INFO = 'info',
    ERROR = 'error',
    WARN = 'warn',
  }
  
  export abstract class CoreLogger implements CoreLoggerITF {
  
    constructor(protected logger = console) {
      this.logger = logger;
    }
    
    public log(message: string, type: LogType) {
      type === LogType.INFO ? this.info(message) : this.error(message);
    }
  
    private info(message: string) {
      this.logger.log(message);
    }
    
    private error(message: string) {
      this.logger.error(message);
    }
  
    abstract warn(message: string): void;
  }