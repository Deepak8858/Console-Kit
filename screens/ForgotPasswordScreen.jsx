import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Adjust path if firebaseConfig is elsewhere
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    // Optional: basic email format regex check, but Firebase will validate too
    // const emailRegex = /\S+@\S+\.\S+/;
    // if (!emailRegex.test(email)) {
    //   Alert.alert('Error', 'Please enter a valid email address.');
    //   return;
    // }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Email Sent',
        'If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).'
      );
      navigation.navigate('LoginScreen'); // Navigate back to login after sending
    } catch (error) {
      // Common errors: 'auth/user-not-found', 'auth/invalid-email'
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
         Alert.alert(
          'Password Reset Email Sent',
          'If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).'
        );
        // For security, don't reveal if user exists. So, still navigate to login.
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', error.message);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address below and we'll send you a link to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Sending Link...' : 'Send Reset Link'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.linkButton}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e64e1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#1e64e1',
    fontSize: 14,
  }
});
