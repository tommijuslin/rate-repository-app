import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = () => {
  let { repoId } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repoId },
    fetchPolicy: "cache-and-network",
  });

  return { data: data ? data.repository : undefined, loading, error };
};

export default useRepository;
