import { LogType } from "@/core/core.logger";
import { CoreResultType, CoreRuleType, CoreRulesEngine } from "@/core/core.rules.engine";

export class InventoryRulesEngine<Rule extends CoreRuleType, Result extends CoreResultType> extends CoreRulesEngine {
  private initializeRules(baseRules: Map<string, { rule: Rule, result: Result }>) {
    for (const [key, base] of baseRules) {
      this.log(`Add rule: ${key}`, LogType.INFO);
      this.add(base.rule, base.result);
    }
  }

  public initialize(baseRules: Map<string, {rule: Rule, result: Result}>) {
    this.initializeRules(baseRules);
  }

  public add(rule: Rule, result: Result) {
    this.rules.set(rule, result)
  }

  public remove(rule: Rule) {
    this.log('NOT IMPLEMENTED', LogType.ERROR);
  }
}