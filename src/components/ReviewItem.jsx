import { View, StyleSheet, Pressable } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";
import { Alert } from "react-native";

import Text from "./Text";
import { DELETE_REVIEW } from "../graphql/mutations";

import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "column",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 20,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    borderRadius: 5,
    paddingVertical: 20,
    marginLeft: 15,
    flex: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  ratingText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
});

const ReviewItem = ({ review, myReviews, refetch }) => {
  let navigate = useNavigate();

  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");
  const user = myReviews ? review.repository.fullName : review.user.username;

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/${review.repository.id}`);
  };

  const handleDeleteClick = () => {
    const handleDelete = async () => {
      await deleteReview({ variables: { id: review.id } });
      refetch();
    };

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleDelete(),
        },
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={{ flexDirection: "row" }}>
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
      <View style={styles.buttonContainer}>
        {myReviews && (
          <>
            <Pressable onPress={handleViewRepository} style={styles.viewButton}>
              <Text style={theme.buttonText}>View repository</Text>
            </Pressable>
            <Pressable onPress={handleDeleteClick} style={styles.deleteButton}>
              <Text style={theme.buttonText}>Delete review</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
