import Text from "../Text";
import RepositoryItem from "./RepositoryItem";

import useRepository from "../../hooks/useRepository";

const SingleRepository = () => {
  const { repository, loading, error } = useRepository();

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    console.log(error);
  }

  return <RepositoryItem item={repository} showButton={true} />;
};

export default SingleRepository;
