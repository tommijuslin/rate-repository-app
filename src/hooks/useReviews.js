import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = () => {
  let { repoId } = useParams();

  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { id: repoId },
    fetchPolicy: "cache-and-network",
  });

  return {
    data: data ? data.repository.reviews : undefined,
    loading,
    error,
  };
};

export default useReviews;
