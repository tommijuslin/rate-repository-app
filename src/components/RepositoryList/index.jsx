import { FlatList, View, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useState } from "react";

import OrderPicker from "./OrderPicker";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import SearchBar from "./SearchBar";

import theme from "../../theme";

const styles = StyleSheet.create({
  topContainer: {
    margin: 20,
    justifyContent: "space-between",
    height: 115,
  },
});

const ItemSeparator = () => <View style={theme.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
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
        <View style={styles.topContainer}>
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <OrderPicker
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        </View>
      }
      renderItem={renderItem}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    selectedOrder,
    searchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
