import { ButtonProps } from "semantic-ui-react"

export interface ExponentialChangeI {
  min: number
  max: number
  step: number
  initial: number
  value: number
  decimals: number
  setValue?: (value: number) => void
  transformValue?: (value: number) => any
  onError?: (...args: any[]) => void
}

class AppExponentialChange implements ExponentialChangeI {
  min = 0;
  max = 10;
  initial = 0;
  value = 0;
  step = 1;
  decimals = 0;
  timer!: ReturnType<typeof setInterval>;
  direction: 'up' | 'down' = 'up';
  iteration: number = 1
  interval: number = 300
  error: string | null = null;
  onChange?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  setValue?: (value: number) => any
  transformValue?: (value: any) => any
  _setValue = (value: number) => {
    this.value = value;
    if (this.setValue) this.setValue(value);
  }

  get displayValue(): string {
    return this.transformValue ? this.transformValue(this.value) : this.value.toFixed(this.decimals)
  }

  constructor(private props?: Partial<ExponentialChangeI>) {
    Object.assign(this, props);
  }

  toInitial = () => this._setValue(this.initial);
  resetCounter = () => { this.iteration = 1 }
  setInterval = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.adjust, this.interval);
  }

  start = (direction: 'down' | 'up') => {
    this.direction = direction;
    this.resetCounter();
    this.setInterval();
    this.adjust();
  }
  stop = () => {
    if (this.onChange) this.onChange();
    clearInterval(this.timer);
    this.interval = 300;
  }
  adjust = () => {
    const { value, step, direction } = this;
    let next = value;
    direction === 'up'
      ? next += step
      : next -= step

    if (this.check(next)) {
      next = parseFloat(next.toFixed(this.decimals));
      this.iteration++;
      this._setValue(next);
      if (this.iteration === 5 || this.iteration % 10 === 0) this.faster();
    }
  }
  faster = () => {
    if (this.interval / 2 > 1) {
      this.interval = this.interval / 2;
      this.setInterval();
    }
  }
  check = (next: number): boolean => {
    if (next > this.max) {
      this._setValue(this.max);
      this.error = `max value is ${this.max}`;
      clearInterval(this.timer);
    } else if (next < this.min) {
      this._setValue(this.min);
      this.error = `min value is ${this.min}`;
      clearInterval(this.timer);
    } else if (Number.isNaN(Number(next))) {
      this.error = `numbers only`;
      clearInterval(this.timer);
    } else this.error = null;
    if (this.onError) this.onError(this.error);
    // if (this.error && this.onError) this.onError(this.error);
    else if (this.error) console.error(this.error);
    return this.error === null;
  }

}


export default AppExponentialChange