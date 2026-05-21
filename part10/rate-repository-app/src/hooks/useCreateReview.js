import { useMutation, useApolloClient } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({
    ownerName,
    repositoryName,
    rating,
    review,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: parseInt(rating),
          text: review,
        },
      },
    });

    await apolloClient.resetStore();

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;