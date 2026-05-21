import React from 'react';
import { FlatList, View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import useGetReviews from '../hooks/useGetReviews';
import { format } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';

const formatNumbers = (number) => {
  if (number <= 1000) return number;
  return Math.round(number / 100) / 10 + "k";
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
  },
  ratingColumn: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0366d6',
    borderRadius: 30,
    borderWidth: 2,
    width: 40,
    height: 40,
  },
  rating: {
    color: '#0366d6',
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewUsername: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#0366d6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const ReviewItem = ({ review, deleteReview, handleViewRepository }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingColumn}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
      </View>

      <View style={styles.reviewContent}>
        <View style={styles.reviewTextContainer}>
          <Text style={styles.reviewUsername}>
            {review.user.username}
          </Text>

          <Text>
            {format(new Date(review.createdAt), 'd MMM yyyy')}
          </Text>

          <Text style={{ marginTop: 5 }}>
            {review.text}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.viewButton} onPress={() => handleViewRepository(review.repository.id)}>
            <Text style={styles.buttonText}>View Repository</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert(
                "Delete Review",
                "Are you sure you want to delete this review?",
                [
                  { text: "Cancel"},
                  { text: "Delete", onPress: () => deleteReview(review.id) }
                ]
              )
            }
          >
          <Text style={styles.buttonText}>Delete Review</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
};

const ReviewsView = () => {
  const [deleteReview] = useDeleteReview();
  const { authorizedUser, loading, error } = useGetReviews(true);
  const navigate = useNavigate();

  if (loading) return null;

  if (error) {
    console.log(error);
    return <Text>Error loading reviews</Text>;
  }

  const reviewNodes =
    authorizedUser?.reviews?.edges?.map(
      edge => edge.node
    ) ?? [];

  const handleViewRepository = (repositoryId) => {
    console.log(`Navigating to repository with id: ${repositoryId}`);
    navigate(`/repository/${repositoryId}`);
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} deleteReview={deleteReview} handleViewRepository={handleViewRepository} />
      )}
    />
  );
};

export default ReviewsView;