/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, StyleSheet,Image, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    numberContainer: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-around",
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 5,
    },
    textContainer: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: "row",
    },
});

const formatNumbers = (number) => {
  if (number <= 1000) return number;
  return Math.round(number / 100) / 10 + "k";
};

const RepositoryItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <View testID="repositoryItem" style={styles.container}>
                <View style={styles.textContainer}>
                    <View>
                        <Image style={styles.image} source = {{ uri: item.ownerAvatarUrl}} />
                    </View>
                    <View>
                        <Text>{item.fullName} </Text>
                        <Text>{item.description}</Text>
                        <Text>{item.language}</Text>
                    </View>

                </View>
                <View style={styles.numberContainer}>
                    <View>
                        <Text>{formatNumbers(item.stargazersCount)} </Text>
                        <Text>Stars</Text>
                    </View>
                    <View>
                        <Text>{formatNumbers(item.forksCount)}</Text>
                        <Text>Forks</Text>
                    </View>
                    <View>
                        <Text>{formatNumbers(item.reviewCount)}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View>
                        <Text>{formatNumbers(item.ratingAverage)}</Text>
                        <Text>Rating</Text>
                    </View>

                </View>
            </View>
        </Pressable>
    )
}



export default RepositoryItem;