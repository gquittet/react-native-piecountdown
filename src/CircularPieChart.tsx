import React from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Svg } from "expo";

export interface Props {
  current: number;
  min?: number;
  max: number;
}

interface State {
  now: number;
  pending: number;
  animatedValue: Animated.Value;
}

const { Circle } = Svg;

export class CircularPieChart extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const current = props.current;
    const min = props.min || 0;
    const max = props.max;

    this.state = {
      now: map(current, min, max, 0, 100),
      pending: map(max - current, min, max, 0, 100),
      animatedValue: new Animated.Value(map(current, min, max, 0, 100))
    };

    this.state.animatedValue.addListener(({ value }) => {
      this.setState({
        ...this.state,
        now: value,
        pending: 100 - value
      })
    })
  }

  componentWillReceiveProps(props: Props): void {
    const current = props.current;
    const min = props.min || 0;
    const max = props.max;

    const value = map(current, min, max, 0, 100) > 0 ?
      map(current, min, max, 0, 100) : 0;

    Animated.timing(this.state.animatedValue, {
      toValue: value,
      duration: 1000,
      easing: Easing.linear,
      delay: 0,
      useNativeDriver: true
    }).start();
  }

  render(): JSX.Element {
    return (
      <Animated.View style={styles.container}>
        <Svg height="330" width="330" viewBox="0 0 50 50">
          <Circle
            cx="50%"
            cy="50%"
            // 100 / 2 * pi
            r="15.9154943092"
            fill="transparent"
            stroke="#DDD"
            strokeWidth="5"
            strokeOpacity="0.5"
          />
          <Circle
            cx="50%"
            cy="50%"
            // 100 / 2 * pi
            r="15.9154943092"
            fill="transparent"
            stroke="#000"
            strokeWidth="5"
            strokeOpacity="0.5"
            strokeDasharray={[this.state.now, this.state.pending]}
            strokeDashoffset="25"
          />
        </Svg>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1
  }
});

const map = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  const result = (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  return result;
}
