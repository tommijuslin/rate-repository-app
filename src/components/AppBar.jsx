import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";
import Constants from "expo-constants";

import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { GET_CURRENT_USER } from "../graphql/queries";

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

const AppBarTab = ({ to, text, onClick }) => (
  <Link to={to} onClick={onClick}>
    <Text style={styles.text}>{text}</Text>
  </Link>
);

const SignOutTab = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>Sign out</Text>
    </Pressable>
  );
};

const AppBar = () => {
  let navigate = useNavigate();
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const { data } = useQuery(GET_CURRENT_USER);

  const logout = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories" />
        {data && data.me ? (
          <>
            <AppBarTab to="/createreview" text="Create a review" />
            <AppBarTab to="/myreviews" text="My reviews" />
            <SignOutTab onPress={logout} />
          </>
        ) : (
          <>
            <AppBarTab to="/signin" text="Sign in" />
            <AppBarTab to="/signup" text="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
