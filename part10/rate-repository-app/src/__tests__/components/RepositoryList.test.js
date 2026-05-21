import React from 'react';
import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

    render(
        <RepositoryListContainer repositories={repositories} />
    );

    const repositoryItems = screen.getAllByTestId('repositoryItem');

    const [firstRepository, secondRepository] =
    repositoryItems;

    const firstRepositoryTexts = within(firstRepository);

    expect(firstRepositoryTexts.getByText('jaredpalmer/formik')).toBeDefined();

    expect(firstRepositoryTexts.getByText('Build forms in React, without the tears')).toBeDefined();

    expect(firstRepositoryTexts.getByText('TypeScript')).toBeDefined();

    expect(firstRepositoryTexts.getByText('1.6k')).toBeDefined();

    expect(firstRepositoryTexts.getByText('21.9k')).toBeDefined();

    expect(firstRepositoryTexts.getByText('88')).toBeDefined();

    expect(firstRepositoryTexts.getByText('3')).toBeDefined();

    const secondRepositoryTexts =within(secondRepository);

    expect(secondRepositoryTexts.getByText('async-library/react-async')).toBeDefined();

    expect(secondRepositoryTexts.getByText('Flexible promise-based React data loader')).toBeDefined();

    expect(secondRepositoryTexts.getByText('JavaScript')).toBeDefined();

    expect(secondRepositoryTexts.getByText('69')).toBeDefined();

    expect(secondRepositoryTexts.getByText('1.8k')).toBeDefined();

    expect(secondRepositoryTexts.getByText('72')).toBeDefined();

    expect(secondRepositoryTexts.getByText('3')).toBeDefined();
    });
  });
});