import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    color: theme.colors.textPrimary,
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
