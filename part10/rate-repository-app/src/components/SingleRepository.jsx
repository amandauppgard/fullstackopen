import React from 'react';
import { View, StyleSheet, Image, Text, Pressable, Linking, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import { format } from 'date-fns';

const formatNumbers = (number) => {
  if (number <= 1000) return number;
  return Math.round(number / 100) / 10 + "k";
};

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
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
    button: {
        margin: 5,
        padding: 10,
        backgroundColor: '#0366d6',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    reviewContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
    },
    ratingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#0366d6',
        borderRadius: 30,
        borderWidth: 2,
        width: 40,
        height: 40,
        marginRight: 8,
        marginLeft: 8,
    },
    rating: {
        color: '#0366d6',
        fontWeight: 'bold',
    },
    reviewTextContainer: {
        flex: 1,
        textWrap: 'wrap',
    },
    reviewUsername: {
        fontWeight: 'bold',
    },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, loading } = useRepository(id);
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!repository) {
        return <Text>Repository not found</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <View>
                        <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
                    </View>
                    <View>
                        <Text>{repository.fullName}</Text>
                        <Text>{repository.description}</Text>
                        <Text>{repository.language}</Text>
                    </View>

                </View>
                <View style={styles.numberContainer}>
                    <View>
                        <Text>{formatNumbers(repository.stargazersCount)}</Text>
                        <Text>Stars</Text>
                    </View>
                    <View>
                        <Text>{formatNumbers(repository.forksCount)}</Text>
                        <Text>Forks</Text>
                    </View>
                    <View>
                        <Text>{formatNumbers(repository.reviewCount)}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View>
                        <Text>{formatNumbers(repository.ratingAverage)}</Text>
                        <Text>Rating</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Pressable onPress={() => Linking.openURL(repository.url)}>
                        <Text style={styles.buttonText}>Open in GitHub</Text>
                    </Pressable>
                </View>
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={repository.reviews.edges.map((edge) => edge.node)}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewContainer}>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                        <View style={styles.reviewTextContainer}>
                            <Text style={styles.reviewUsername}>{item.user.username}</Text>
                            <Text>{format(new Date(item.createdAt), 'd MMM yyyy')}</Text>
                            <Text style={{marginTop: 5}}>{item.text}</Text>
                        </View>

                    </View>
                )}
            />
        </View>
    );
}

export default SingleRepository;