import { ButtonProps } from "semantic-ui-react"

export interface ExponentialChangeI {
  min: number
  max: number
  step: number
  initial: number
  value: number
  decimals: number
  setValue: (value: number) => void
  onError?: (...args: any[]) => void
}

class AppExponentialChange implements ExponentialChangeI {
  min = 0;
  max = 10;
  initial = 0;
  value = 0;
  step = 1;
  decimals = 0;
  timer: ReturnType<typeof setInterval> | null = null;
  direction: 'up' | 'down' = 'up';
  iteration: number = 1
  interval: number = 300
  error: string | null = null;
  onChange?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  setValue = (value: number) => {
    this.value = value;
  }
  get displayValue(): string { return this.value.toFixed(this.decimals) }

  constructor(private props?: Partial<ExponentialChangeI>) {
    Object.assign(this, props);
  }

  toInitial = () => this.setValue(this.initial);
  resetCounter = () => {
    this.iteration = 0
    clearInterval(this.timer as unknown as number);
  }
  clearInterval = () => clearInterval(this.timer as unknown as number)
  // getDecimals = () => {
  //   function count(num: number): number {
  //     const string = `${num}`, hasDecimal = string.includes('.'), float = string.split('.').pop() || '';
  //     return hasDecimal ? float.length : 0;
  //   }
  //   return Math.max(count(this.value), count(this.step));
  // }
  start = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
    const { target } = ev;
    ev.preventDefault();
    this.resetCounter();
    this.timer = setInterval(this.adjust, this.interval);
    this.adjust();
  }
  stop = (ev: Event) => {
    console.log('stop', { ev });
    this.clearInterval();
    if (this.onChange) this.onChange(ev);
    if (this.timer) {
      if (this.onChange) this.onChange(ev);
      // clearInterval(this.timer);
      // this.timer = null;
    }
  }
  adjust = () => {
    const { value, step, direction } = this;
    let next = value;
    direction === 'up'
      ? next += step
      : next -= step

    if (this.check(next)) {
      this.setValue(parseFloat(next.toFixed(this.decimals)));
      if (this.iteration === 5 || this.iteration % 10 === 0) this.faster();
    }
  }
  faster = () => {
    if (this.interval / 2 > 1) this.interval = this.interval / 2;
    this.clearInterval();
    this.timer = setInterval(this.adjust, this.interval);
  }
  check = (next: number) => {
    if (next > this.max) {
      this.setValue(this.max);
      this.error = `max value is ${this.max}`;
      this.clearInterval();
    } else if (next < this.min) {
      this.setValue(this.min);
      this.error = `min value is ${this.min}`;
      this.clearInterval();
    } else if (Number.isNaN(Number(next))) {
      this.error = `numbers only`;
    } else this.error = null;
    if (this.error && this.onError) this.onError(this.error);
    return this.error === null;
  }

}


export default AppExponentialChange