import { LogType } from "./core.logger";

export type CoreRuleType = (domain: any, options?: any) => boolean;
export type CoreResultType = (item: any) => boolean;

export interface CoreDomainITF {
  [key: string]: any;
}

export interface CoreOutputITF {
  rule: CoreRuleType;
  result: any;
}

export interface CoreEvaluationITF extends CoreOutputITF {
  result: CoreResultType;
}

export interface CoreRulesEngineITF {
  add(rule: CoreRuleType, result: CoreResultType): void;
  evaluate(domain: CoreDomainITF): CoreEvaluationITF;
  remove(rule: CoreRuleType): void;
}

export abstract class CoreRulesEngine implements CoreRulesEngineITF {

  constructor(
    protected rules = new Map<CoreRuleType, CoreResultType>(),
    protected logger = console,
  ) {
    this.rules = rules;
    this.logger = logger;
  }

  protected log(message: string, type: LogType) {
    this.logger.log(message, type);
  }
  
  add(rule: CoreRuleType, result: CoreResultType) {
    this.rules.set(rule, result)
  }

  evaluate(domain: CoreDomainITF): CoreEvaluationITF {
    for ( const [ rule, result ] of this.rules ) {
      if ( rule(domain) ) return { rule, result, };
    }
    throw new Error('No rule found');
  }

  abstract remove(rule: CoreRuleType): void;
}