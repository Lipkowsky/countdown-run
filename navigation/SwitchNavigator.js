import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";
import Loading from "../screens/Loading";
import AddRun from "../screens/AddRun";
import ShowRuns from "../screens/ShowRuns";

const AppContainer = createStackNavigator({
  App: createBottomTabNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarIcon: ({ tintColor,  }) => (
            <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
          ),
          title: "Profil",
        },
      },
      NewRun: {
        screen: AddRun,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-add" size={24} color={tintColor}></Ionicons>
          ),
          title: "Dodaj bieg",
        },
        
      },
      ShowRuns: {
        screen: ShowRuns,
        navigationOptions: {
          tabBarIcon: ({ tintColor,  }) => (
            <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
          ),
          title: "Pokaz Biegi",
        },
      },
    },
    {
      tabBarOptions: {
        activeTintColor: "#000066",
        inactiveTintColor: "#B8BBC4",
      },
      navigationOptions: {
        headerShown: false,
      },
    }
  ),
});

const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: Signup,
    },
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteParams: "Profile",
    headerMode: 'none',
  }
);



export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppContainer,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
