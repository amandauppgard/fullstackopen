import { useQuery } from '@apollo/client/react';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useGetReviews = (includeReviews = false) => {
  const { data, loading, error } = useQuery(
    GET_AUTHORIZED_USER,
    {
      variables: { includeReviews },
      fetchPolicy: 'cache-and-network',
    }
  );

  return {
    authorizedUser: data?.me,
    loading,
    error,
  };
};

export default useGetReviews;