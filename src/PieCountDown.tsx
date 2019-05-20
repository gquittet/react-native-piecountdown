import React from "react";
import { StyleSheet, View } from "react-native";
import { EventEmitter } from "events";
import { Timer } from "./Timer";
import { CircularPieChart } from "./CircularPieChart";
import { CountDown } from "./CountDown";

export interface Props {
  time: number;
}

interface State {
  time: number;
  label: string;
}

export class PieCountDown extends React.Component<Props, State> {

  private _emitter: EventEmitter;
  private clock: CountDown;

  constructor(props: Props) {
    super(props);
    this._emitter = new EventEmitter();
    this.clock = new CountDown(props.time, this._emitter);
    this.clock.start();
    this.state = { time: props.time, label: this.clock.toString() }
  }

  componentDidMount() {
    this._emitter.addListener('onPieCountDownUpdate', ({ time, toString }) => {
      this.updateTime(time, toString);
    });
  }

  componentWillUnmount(): void {
    this.clock.stop();
    this.clock.reset();
  }

  updateTime(time: number, toString: string): void {
    const timeInSecond = Math.round(time / (1 * this.clock.SECOND));
    this.setState({ ...this.state, time: timeInSecond, label: toString });
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <CircularPieChart
          min={0}
          max={this.props.time - 1}
          current={this.state.time - 1}
        />
        <Timer time={this.state.label}></Timer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
