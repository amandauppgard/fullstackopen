import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    margin: 5,
    padding: 3,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RepositoryItem item={item} />
      )}

      ListHeaderComponent={
        <>
          <TextInput
            placeholder="Search repositories"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            style={styles.searchInput}
          />

          <Picker
            selectedValue={selectedOrder}
            onValueChange={(value) => setSelectedOrder(value)}
            style={styles.picker}
          >
            <Picker.Item
              label="Latest repositories"
              value="latest"
            />

            <Picker.Item
              label="Highest rated repositories"
              value="highest"
            />

            <Picker.Item
              label="Lowest rated repositories"
              value="lowest"
            />
          </Picker>
        </>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  let variables = {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    searchKeyword: debouncedSearchKeyword,
  };

  if (selectedOrder === 'highest') {
    variables = {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    };
  }

  if (selectedOrder === 'lowest') {
    variables = {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    };
  }

  const { repositories } = useRepositories(variables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;