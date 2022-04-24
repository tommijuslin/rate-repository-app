import { View, StyleSheet, Pressable } from "react-native";
import RepositoryStat from "./RepositoryStat";
import RepositoryInfo from "./RepositoryInfo";
import * as WebBrowser from "expo-web-browser";

import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  repoStats: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 50,
    justifyContent: "space-between",
  },
});

const RepositoryItem = ({ item, showButton }) => {
  const onSubmit = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryInfo
        avatar={item.ownerAvatarUrl}
        name={item.fullName}
        description={item.description}
        language={item.language}
      />
      <View style={styles.repoStats}>
        <RepositoryStat stat={item.stargazersCount} label="Stars" />
        <RepositoryStat stat={item.forksCount} label="Forks" />
        <RepositoryStat stat={item.reviewCount} label="Reviews" />
        <RepositoryStat stat={item.ratingAverage} label="Rating" />
      </View>
      {showButton && (
        <View style={{ marginTop: 15 }}>
          <Pressable onPress={onSubmit} style={theme.button}>
            <Text style={theme.buttonText}>Open in GitHub</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
