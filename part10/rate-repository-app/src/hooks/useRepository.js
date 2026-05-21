import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network'
  });

  const repository = data?.repository || null;

  return { repository, loading };
};

export default useRepository;