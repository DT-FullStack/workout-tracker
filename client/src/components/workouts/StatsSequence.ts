export { }
// type Statistic = [number, string | undefined];
// export type StatCreator = () => Statistic | undefined;

// export interface GivesStats {
//   statMethods: () => StatCreator[]
// }

// export abstract class HasStatistics {
//   public abstract statMethods(): StatCreator[];
//   getStats = (): Statistic[] => {
//     const stats: Statistic[] = [];
//     for (const statMethod of this.statMethods()) {
//       const value = statMethod()
//       if (value) stats.push(value);
//     }
//     return stats;
//     // return stats.map(stat => stat.join(' '));
//   }
// }

