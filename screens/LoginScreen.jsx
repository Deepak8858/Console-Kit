import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Adjust path if firebaseConfig is elsewhere
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // New state

  const validateLogin = () => {
    let currentErrors = {};
    if (!email.trim()) currentErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) currentErrors.email = 'Email is invalid.';
    if (!password) currentErrors.password = 'Password is required.';
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) { // Call validation
      setLoading(false); // Ensure loading is reset if validation fails early
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation to UserDashboardScreen is handled by AuthLoadingScreen's onAuthStateChanged
      // console.log('User logged in successfully!'); // Optional: for debugging
    } catch (error) {
      // Display Firebase errors in a general way or specific if needed
      setErrors({ general: error.message }); // Example for general error display
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => { setEmail(text); if (errors.email || errors.general) setErrors({}); }}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => { setPassword(text); if (errors.password || errors.general) setErrors({}); }}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.linkButton}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={() => Alert.alert('Coming Soon!', 'Google Sign-In will be implemented later.')}>
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && ( // Apple Sign-In is typically iOS only
          <TouchableOpacity style={[styles.socialButton, styles.appleButton]} onPress={() => Alert.alert('Coming Soon!', 'Apple Sign-In will be implemented later.')}>
            <Text style={styles.socialButtonTextWhite}>Sign in with Apple</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={styles.linkButton}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#111', // Assuming dark theme from previous form
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e64e1', // Blue color from previous form
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#1e64e1', // Blue color
    fontSize: 14,
  },
  socialLoginContainer: {
    marginVertical: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google Red
  },
  appleButton: {
    backgroundColor: '#000000', // Apple Black
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10, // If adding icons later
  },
   socialButtonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  errorText: {
    color: '#ff7675',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5
  }
});
