import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Text from "./Text";

import theme from "../theme";

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

const ReviewItem = ({ review, myReviews }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  const user = myReviews ? review.repository.fullName : review.user.username;

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.circle}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text fontWeight="bold">{user}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <View style={styles.reviewTextContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
