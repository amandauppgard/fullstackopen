/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { View, TextInput, Button, Text, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  review: yup
    .string()
    .optional()
});


export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text>Repository Owner</Text>
      <TextInput
        style = {[styles.input, formik.touched.repositoryOwner && formik.errors.repositoryOwner ? styles.inputError : null]}
        onChangeText={formik.handleChange('repositoryOwner')}
        value={formik.values.repositoryOwner}
        placeholder="Repository Owner"
      />
      {formik.touched.repositoryOwner && formik.errors.repositoryOwner && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.repositoryOwner}</Text>
      )}

      <Text>Repository Name</Text>
      <TextInput
        style = {[styles.input, formik.touched.repositoryName && formik.errors.repositoryName ? styles.inputError : null]}
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
        placeholder="Repository Name"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.repositoryName}</Text>
      )}

      <Text>Rating</Text>
      <TextInput
        style = {[styles.input, formik.touched.rating && formik.errors.rating ? styles.inputError : null]}
        onChangeText={formik.handleChange('rating')}
        value={formik.values.rating}
        placeholder="Rating"
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.rating}</Text>
      )}

      <Text>Review</Text>
      <TextInput
        style = {[styles.input, formik.touched.review && formik.errors.review ? styles.inputError : null]}
        onChangeText={formik.handleChange('review')}
        value={formik.values.review}
        placeholder="Review"
        multiline
      />
      {formik.touched.review && formik.errors.review && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.review}</Text>
      )}
      <Pressable style={styles.button} onPress = {formik.handleSubmit}>
        <Text style = {{color: 'white', fontWeight: 'bold'}}>Submit Review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
  const { repositoryOwner, repositoryName, rating, review } = values;

    try {
      const data = await createReview({
        ownerName: repositoryOwner,
        repositoryName,
        rating: Number(rating),
        review,
      });

      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit}/>
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  inputError: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 6,
    paddingHorizontal: 8,
  },
});


export default CreateReview;
