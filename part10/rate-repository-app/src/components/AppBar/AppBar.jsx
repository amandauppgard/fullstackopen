import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client/react';

import { GET_USER } from '../../graphql/queries';
import useSignOut from '../../hooks/useSignOut';
import AppBarTab from './AppBarTab';
import App from '../../../App';

const styles = StyleSheet.create({
  appBarContainer: {
    padding: 10,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const me = data?.me;

  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.appBarContainer}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
      >
        <AppBarTab title="Repositories" to="/" />
        <AppBarTab title="Create a review" to="/review" />
        {me ? (
          <>
            <AppBarTab title="My reviews" to="/myreviews" />
            <AppBarTab
              title="Sign out"
              onPress={handleSignOut}
            />
           </>
        ) : (
          <>
            <AppBarTab
              title="Sign in"
              to="/signIn"
            />
            <AppBarTab
              title="Sign up"
              to="/signUp"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;