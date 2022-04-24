import { View, FlatList } from "react-native";

import Text from "./Text";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import useRepository from "../hooks/useRepository";
import ReviewItem from "./ReviewItem";

import theme from "../theme";

const ItemSeparator = () => <View style={theme.separator} />;

const SingleRepositoryContainer = ({ repository, onEndReach }) => {
  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} myReview />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <RepositoryItem item={repository} showButton={true} />
          <ItemSeparator />
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const { repository, fetchMore } = useRepository({ first: 6 });

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <SingleRepositoryContainer
      repository={repository}
      onEndReach={onEndReach}
    />
  );
};

export default SingleRepository;
