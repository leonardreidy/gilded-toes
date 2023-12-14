import { CoreLogger } from "@/core/core.logger";

export class ServiceLogger extends CoreLogger {
    warn(message: string): void {
        throw new Error("ServiceLogger:Method:warn not implemented.");
    }
    
}