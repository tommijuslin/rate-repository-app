import { useMutation, useApolloClient } from "@apollo/client";

import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [authenticate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await authenticate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
