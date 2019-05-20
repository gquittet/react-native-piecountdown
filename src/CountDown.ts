import { EventEmitter } from "events";

export class CountDown {

  public readonly MILLISECOND = 1;
  public readonly SECOND = 1000 * this.MILLISECOND;

  private _time: number;
  private _interval: number | NodeJS.Timeout;

  private _emitter: EventEmitter;

  constructor(time: number = 0, emitter: EventEmitter) {
    this._time = time * this.SECOND;
    this._interval = 0;
    this._emitter = emitter;
  }

  start(): void {
    this.stop();
    this._interval = setInterval(_ => {
      this.time -= 1 * this.SECOND;
      this._emitter.emit('onPieCountDownUpdate', {
        time: this.time, toString: this.toString()
      });
    }, 1 * this.SECOND);
  }

  stop(): void {
      clearInterval(<number>this._interval);
  }

  reset(): void {
    this._time = 0;
  }

  isFinished(): boolean {
    return this.time <= 0;
  }

  getTimeAsDate(): Date {
    return new Date(this._time);
  }

  formatTimeFragment(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  set time(value: number) {
    if (!this.isFinished()) {
      this._time = value;
      if (this.isFinished()) {
        this.finished();
      }
    } else {
      this.finished();
    }
  }

  private finished() {
    this.stop();
    this.reset();
    this._emitter.emit('onPieCountDownFinished');
  }

  get time(): number {
    return this._time;
  }

  toString(): string {
    const date: Date = this.getTimeAsDate();
    const hours = this.formatTimeFragment(date.getUTCHours());
    const minutes = this.formatTimeFragment(date.getUTCMinutes());
    const seconds = this.formatTimeFragment(date.getUTCSeconds());
    const formatedHours = `${hours}:${minutes}:${seconds}`;
    return formatedHours;
  }
}
