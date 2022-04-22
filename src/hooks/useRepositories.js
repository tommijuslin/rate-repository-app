import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce/lib";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ selectedOrder, searchKeyword }) => {
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const getQueryParams = () => {
    switch (selectedOrder) {
      case "latest":
        return { searchKeyword: debouncedSearchKeyword };
      case "highest":
        return {
          orderBy: "RATING_AVERAGE",
          searchKeyword: debouncedSearchKeyword,
        };
      case "lowest":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
          searchKeyword: debouncedSearchKeyword,
        };
      default:
        return { searchKeyword: debouncedSearchKeyword };
    }
  };

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: getQueryParams(),
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;
