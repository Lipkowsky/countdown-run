import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addRun, getRuns } from "../actions/user";


class AddRun extends React.Component {


  addRun = () => {
    this.props.addRun(this.props.user.uid);
    this.props.navigation.push('ShowRuns')
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Run</Text>
              <Button title="Dodaj bieg" onPress={this.addRun} />
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
  return bindActionCreators({ addRun, getRuns }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRun);
