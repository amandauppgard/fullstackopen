import { useMutation, useApolloClient } from '@apollo/client/react';
import { AUTHENTICATE_USER, CREATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE_USER);

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    await createUser({ variables: {
      user: { username, password }
    }});

    const { data } = await authenticate({ variables: {
      credentials: { username, password }
    }});

    await authStorage.setAccessToken(data.authenticate.accessToken);

    await apolloClient.resetStore();

    return data;
  };

  return [signUp];
};

export default useSignUp;