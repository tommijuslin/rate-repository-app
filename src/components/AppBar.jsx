import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingBottom: 15,
  },
  text: {
    color: "white",
    marginHorizontal: 20,
  },
});

const AppBarTab = ({ to, text }) => (
  <Link to={to}>
    <Text style={styles.text}>{text}</Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories" />
        <AppBarTab to="/sign" text="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
