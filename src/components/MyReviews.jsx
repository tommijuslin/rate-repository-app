import { View, FlatList } from "react-native";

import Text from "./Text";
import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";

import theme from "../theme";

const ItemSeparator = () => <View style={theme.separator} />;

const MyReviewsContainer = ({ reviews, refetch }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem review={item} myReviews={true} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const MyReviews = () => {
  const { reviews, refetch } = useMyReviews();

  if (!reviews) {
    <Text>Loading...</Text>;
  }

  return <MyReviewsContainer reviews={reviews} refetch={refetch} />;
};

export default MyReviews;
