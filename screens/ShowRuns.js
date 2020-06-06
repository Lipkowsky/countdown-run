import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addRun, fetchRuns } from "../actions/user";

class ShowRuns extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, runs: [], loading: true };
  }

  async componentWillMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",

      async () => {
        this.state.loading = true;
        //Load data when focus on screen;
        await this.props.fetchRuns(this.props.user.uid);
        this.setState({
          error: this.props.error,
          runs: this.props.runs,
          loading: this.props.loading,
        });
      }
    );
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text>Błąd {this.state.error.message}</Text>
        </View>
      );
    }

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Show runs</Text>
        {this.state.runs.map((el) => (
          <Text>
            {el.name}: {el.where}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addRun, fetchRuns }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    runs: state.user.items,
    loading: state.user.loading,
    error: state.user.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowRuns);
