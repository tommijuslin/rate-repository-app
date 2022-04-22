import { View, StyleSheet, FlatList } from "react-native";
import { format } from "date-fns";

import Text from "../Text";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../../hooks/useRepository";
import useReviews from "../../hooks/useReviews";

import theme from "../../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  reviewInfo: {
    flexDirection: "column",
    flex: 1,
    marginHorizontal: 20,
  },
  reviewTextContainer: {
    marginTop: 5,
  },
  circle: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 60 / 2,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.circle}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <View style={styles.reviewTextContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={theme.separator} />;

const SingleRepository = () => {
  const repository = useRepository();
  const reviews = useReviews();

  if (repository.loading || reviews.loading) {
    return <Text>loading...</Text>;
  }

  if (repository.error || reviews.error) {
    console.log("ya dun goofed");
  }

  const reviewNodes = reviews
    ? reviews.data.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository.data} showButton={true} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepository;
