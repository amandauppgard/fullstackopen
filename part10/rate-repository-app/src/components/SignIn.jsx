/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { View, TextInput, Button, Text, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});


export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style = {[styles.input, formik.touched.username && formik.errors.username ? styles.inputError : null]}
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.username}</Text>
      )}

      <Text>Password</Text>
      <TextInput
        style = {[styles.input, formik.touched.password && formik.errors.password ? styles.inputError : null]}
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress = {formik.handleSubmit}>
        <Text style = {{color: 'white', fontWeight: 'bold'}}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }

  return <SignInForm onSubmit={onSubmit}/>
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


export default SignIn;
