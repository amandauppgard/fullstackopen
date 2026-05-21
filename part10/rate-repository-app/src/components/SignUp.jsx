/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { View, TextInput, Button, Text, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be under 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be under 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});


export const SignUpForm = ({ onSubmit }) => {
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
      <Text>Password Confirmation</Text>
      <TextInput
        style = {[styles.input, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? styles.inputError : null]}
        onChangeText={formik.handleChange('passwordConfirmation')}
        value={formik.values.passwordConfirmation}
        placeholder="Password Confirmation"
        secureTextEntry
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style = {{color: 'red', paddingVertical: 10}}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable style={styles.button} onPress = {formik.handleSubmit}>
        <Text style = {{color: 'white', fontWeight: 'bold'}}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }

  return <SignUpForm onSubmit={onSubmit}/>
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


export default SignUp;
