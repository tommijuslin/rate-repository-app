import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import Text from "../Text";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../../graphql/queries";

const SingleRepository = () => {
  let { repoId } = useParams();

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id: repoId },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    console.log(error);
  }

  return <RepositoryItem item={data.repository} showButton={true} />;
};
export default SingleRepository;
