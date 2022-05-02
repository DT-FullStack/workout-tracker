import React from "react";
import { Label } from "semantic-ui-react";

type Statistic = [number, string] | string;
export type StatCreator = () => Statistic | undefined;


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
  // renderStatLabels = (): JSX.Element =>
  //   <React.Fragment>
  //     {this.getStats().map((stat, s) =>
  //       typeof stat === 'string'
  //         ? <Label key={s} content={stat} />
  //         : <Label key={s} content={stat[0]} detail={stat[1]} />)}
  //   </React.Fragment>

  createStat = (value: number, label?: string): StatCreator =>
    () => value && value !== 0
      ? label
        ? [value, label] : `${value}`
      : undefined;
  decimal = (value: number, decimals: number = 2): number => Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

