import { useNavigate } from "react-router-native";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 20,
    justifyContent: "space-between",
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

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
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
      <View style={{ height: 10 }}></View>
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={{ height: 10 }}></View>
      <Pressable onPress={onSubmit} style={styles.signButton}>
        <Text style={styles.signText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignIn = () => {
  let navigate = useNavigate();

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
