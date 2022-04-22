import { FlatList, View, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";

import theme from "../../theme";
import { useState } from "react";

const ItemSeparator = () => <View style={theme.separator} />;

const OrderPicker = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={{ backgroundColor: "#ebebeb" }}>
      <Picker
        style={{ marginHorizontal: 15 }}
        selectedValue={selectedOrder}
        onValueChange={(itemValue, itemIndex) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
}) => {
  let navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/${id}`);
  };
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => handlePress(item.id)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <OrderPicker
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      }
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");

  const { repositories } = useRepositories({ selectedOrder });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
