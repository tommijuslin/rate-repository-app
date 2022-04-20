import { View, Image, StyleSheet } from "react-native";
import Text from "../Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  repoInfo: {
    flexDirection: "row",
    margin: 20,
  },
  repoInfoLine: {
    flexDirection: "column",
    marginLeft: 20,
    flex: 1,
  },
  avatar: {
    display: "flex",
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    alignSelf: "baseline",
    borderRadius: 5,
    padding: 5,
  },
});

const RepositoryInfo = ({ avatar, name, description, language }) => (
  <View style={styles.repoInfo}>
    <Image style={styles.avatar} source={{ uri: avatar }} />
    <View style={styles.repoInfoLine}>
      <View style={{ paddingBottom: 5 }}>
        <Text fontWeight="bold">{name}</Text>
      </View>
      <View style={{ paddingBottom: 5 }}>
        <Text color="textSecondary">{description}</Text>
      </View>
      <View style={styles.language}>
        <Text style={{ color: "white" }}>{language}</Text>
      </View>
    </View>
  </View>
);

export default RepositoryInfo;
