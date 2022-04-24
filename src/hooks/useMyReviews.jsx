import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const useMyReviews = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  return {
    reviews: data?.me.reviews,
    refetch,
  };
};

export default useMyReviews;
