import { Text, View } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <Text>
      Full name: {item.fullName}
      {"\n"}
      Description: {item.description}
      {"\n"}
      Language: {item.language}
      {"\n"}
      Forks: {item.forksCount}
      {"\n"}
      Stars: {item.stargazersCount}
      {"\n"}
      Rating: {item.ratingAverage}
      {"\n"}
      Reviews: {item.reviewCount}
    </Text>
  );
};

export default RepositoryItem;
