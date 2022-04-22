import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-between",
    // backgroundColor: theme.colors.white,
  },
  createReviewText: {
    color: "white",
    textAlign: "center",
  },
});

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository owner name is required"),
  ownerName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
});

const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: "",
  review: "",
};

const ItemSeparator = () => <View style={{ height: 15 }} />;

const ReviewForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput
      name="ownerName"
      placeholder="Repository owner name"
      style={styles.input}
    />
    <ItemSeparator />
    <FormikTextInput
      name="repositoryName"
      placeholder="Repository name"
      style={styles.input}
    />
    <ItemSeparator />
    <FormikTextInput
      name="rating"
      placeholder="Rating between 0 and 100"
      style={styles.input}
    />
    <ItemSeparator />
    <FormikTextInput name="text" placeholder="Review" style={styles.input} />
    <ItemSeparator />
    <Pressable onPress={onSubmit} style={theme.button}>
      <Text style={styles.createReviewText}>Create a review</Text>
    </Pressable>
  </View>
);

export const ReviewContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

const CreateReview = () => {
  let navigate = useNavigate();

  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const data = await createReview({
        repositoryName,
        ownerName,
        rating,
        text,
      });
      console.log(data);
      navigate(`/${data.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
