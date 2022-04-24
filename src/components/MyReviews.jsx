import { View, FlatList } from "react-native";

import Text from "./Text";
import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";

import theme from "../theme";

const ItemSeparator = () => <View style={theme.separator} />;

const MyReviewsContainer = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} myReviews={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const MyReviews = () => {
  const { reviews } = useMyReviews();

  if (!reviews) {
    <Text>Loading...</Text>;
  }

  return <MyReviewsContainer reviews={reviews} />;
};

export default MyReviews;
