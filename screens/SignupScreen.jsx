import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Adjust path if firebaseConfig is elsewhere
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Basic phone input for now
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // New state

  const validateSignup = () => {
    let currentErrors = {};
    if (!name.trim()) currentErrors.name = 'Name is required.';
    if (!email.trim()) currentErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) currentErrors.email = 'Email is invalid.';
    if (!password) currentErrors.password = 'Password is required.';
    else if (password.length < 6) currentErrors.password = 'Password must be at least 6 characters.';
    // Phone is optional, so no validation for it unless specific rules are set
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateSignup()) { // Call validation
      setLoading(false); // Ensure loading is reset
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User created. Now update profile.
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      // User is now signed up and signed in.
      // AuthLoadingScreen will handle navigation to UserDashboardScreen.
      // console.log('User signed up and profile updated successfully!'); // Optional
    } catch (error) {
      setErrors({ general: error.message }); // Example for general error display
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => { setName(text); if (errors.name || errors.general) setErrors({}); }}
        autoCapitalize="words"
        placeholderTextColor="#aaa"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

      <TextInput /* Phone input - no validation for now */
        style={styles.input}
        placeholder="Phone Number (Optional)"
        value={phone}
        onChangeText={setPhone} // No error clearing for phone as it's not validated yet
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.linkButton}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
    backgroundColor: '#1e64e1',
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
    marginTop: 10, // Adjusted margin
  },
  linkText: {
    color: '#1e64e1',
    fontSize: 14,
  },
  errorText: {
    color: '#ff7675',
    fontSize: 12,
    marginBottom: 10, // Or suitable value, adjust if inputs have less margin
    marginLeft: 5
  }
});
