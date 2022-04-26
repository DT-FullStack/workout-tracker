import React from "react";
import { Label } from "semantic-ui-react";

type Statistic = [number, string] | string;
export type StatCreator = () => Statistic | undefined;

// export interface GivesStats {
//   statMethods: () => StatCreator[]
// }

export abstract class HasStatistics {
  public abstract statMethods(): StatCreator[];
  getStats = (): Statistic[] => {
    const stats: Statistic[] = [];
    for (const statMethod of this.statMethods()) {
      const value = statMethod()
      if (value) stats.push(value);
    }
    return stats;
  }
  renderStatLabels = (): JSX.Element =>
    <React.Fragment>
      {this.getStats().map((stat, s) =>
        typeof stat === 'string'
          ? <Label key={s} content={stat} />
          : <Label key={s} content={stat[0]} detail={stat[1]} />)}
    </React.Fragment>
}

