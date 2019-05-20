import React from "react";
import { StyleSheet, View, Text, Animated, InteractionManager } from "react-native";

export interface Props {
  time: string;
}

interface State {
  time: string;
}

export class Timer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { time: props.time };
  }

  componentWillReceiveProps(props: Props): void {
    this.setState({ time: props.time });
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.clockText}>{this.state.time}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99
  },
  circle: {
    backgroundColor: "#0097A7",
    width: 200,
    height: 200,
    // borderColor: "#BDBDBD",
    // borderWidth: 1,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.65,
    elevation: 5
  },
  clockText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    color: '#FFF',
    fontSize: 26,
    textTransform: "uppercase",
    fontWeight: "bold"
  }
});
