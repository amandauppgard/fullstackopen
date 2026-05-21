import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ title, to, onPress }) => {
  if (to) {
    return (
      <Link to={to} component={Pressable}>
        <Text style={styles.title}>{title}</Text>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;