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
    margin: 20,
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

const ItemSeparator = () => <View style={{ height: 15 }} />;

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <ItemSeparator />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <ItemSeparator />
      <Pressable onPress={onSubmit} style={theme.button}>
        <Text style={theme.buttonText}>Sign in</Text>
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
