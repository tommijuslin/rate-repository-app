import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 20,
    justifyContent: "space-between",
    minHeight: 200,
  },
  input: {
    color: theme.colors.textPrimary,
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  signButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 20,
    justifyContent: "center",
  },
  signText: {
    color: "white",
    textAlign: "center",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={styles.signButton}>
        <Text style={styles.signText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
