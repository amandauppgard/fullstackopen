import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit with correct credentials when form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText('Username'),'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'secret',
        });
      });
    });
  });
});