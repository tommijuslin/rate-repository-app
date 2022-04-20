import { View, StyleSheet } from "react-native";
import RepositoryStat from "./RepositoryStat";
import RepositoryInfo from "./RepositoryInfo";

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  repoStats: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 50,
    justifyContent: "space-between",
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
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
  </View>
);

export default RepositoryItem;
