import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce/lib";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ selectedOrder, searchKeyword }) => {
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const getQueryParams = () => {
    switch (selectedOrder) {
      case "latest":
        return {};
      case "highest":
        return {
          orderBy: "RATING_AVERAGE",
        };
      case "lowest":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
        };
      default:
        return {};
    }
  };

  const queryParams = getQueryParams();
  queryParams.searchKeyword = debouncedSearchKeyword;

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: queryParams,
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;
