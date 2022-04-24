import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce/lib";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ first, selectedOrder, searchKeyword }) => {
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

  const variables = getQueryParams();
  variables.searchKeyword = debouncedSearchKeyword;
  variables.first = first;

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
