import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ selectedOrder }) => {
  const getOrder = () => {
    switch (selectedOrder) {
      case "latest":
        return {};
      case "highest":
        return { orderBy: "RATING_AVERAGE" };
      case "lowest":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        console.log("Something went wrong.");
    }
  };

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: getOrder(),
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;
