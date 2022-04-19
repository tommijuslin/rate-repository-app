import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    backgroundColor: theme.colors.appBar,
  },
  text: {
    color: "white",
    marginHorizontal: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/sign">
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;
