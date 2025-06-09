import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, SafeAreaView } from 'react-native';
import { auth } from '../firebaseConfig';
import Form from '../components/Form'; // Import the form

export default function MainAppScreen() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await auth.signOut();
      // AuthLoadingScreen will handle navigation to LoginScreen
    } catch (error) {
      console.error("Logout Error: ", error);
      Alert.alert("Logout Failed", "An error occurred while logging out.");
      setLoggingOut(false);
    }
  };

  // Welcome message construction
  const user = auth.currentUser;
  const welcomeMessage = user ? `Welcome, ${user.displayName || user.email || 'User'}` : 'Welcome!';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>{welcomeMessage}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={loggingOut}>
          {loggingOut ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.logoutButtonText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* The Form component might have its own ScrollView.
          If Form.jsx is already a ScrollView, nesting might not be ideal.
          Assuming Form.jsx is a View that might scroll internally, or is fine in a View.
          The original App.jsx wrapped Form in a SafeAreaView. Here, Form is within MainAppScreen's structure.
          Let's ensure Form can take up the remaining space.
      */}
      <Form />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111', // Dark theme background
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a', // Slightly different background for header
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  welcomeText: {
    fontSize: 16,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#1e64e1', // Consistent button color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Form component will take the rest of the space.
  // Ensure Form.jsx styles are compatible with being embedded.
  // The original Form.jsx used padding: 20, backgroundColor: '#111' in its own container.
  // This should be fine.
});
