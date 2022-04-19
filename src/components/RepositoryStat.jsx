import { View } from "react-native";
import Text from "./Text";
import { shortenNumber } from "../utils";

const RepositoryStat = ({ stat, label }) => (
  <View style={{ flexDirection: "column" }}>
    <Text fontWeight="bold" style={{ textAlign: "center" }}>
      {shortenNumber(stat)}
    </Text>
    <Text color="textSecondary" style={{ textAlign: "center" }}>
      {label}
    </Text>
  </View>
);

export default RepositoryStat;
