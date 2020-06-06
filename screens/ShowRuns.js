import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addRun, getRuns } from "../actions/user";

class ShowRuns extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      async () => {
        //Load data when focus on screen;
        await this.props.getRuns(this.props.user.uid);
        this.setState({ data: this.props.user.runs });
        console.log(this.state.data);
      }
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    if (this.state.data == undefined) {
      return (
        <View>
          <Text>>Brak biegów</Text>
        </View>
      );
    }

    const postItems = this.state.data.map((post) => (
      <View key={post.name}>
        <Text>{post.name}</Text>
        <Text>{post.where}</Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <Text>Show runs</Text>
        {postItems}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowRuns);
