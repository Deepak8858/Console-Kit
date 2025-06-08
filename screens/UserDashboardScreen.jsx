import React, { useState } from 'react'; // Added useState
// Add TouchableOpacity, ActivityIndicator, Alert to imports
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
// useNavigation might not be needed if logout just relies on AuthLoadingScreen
// import { useNavigation } from '@react-navigation/native';


export default function UserDashboardScreen() {
  // const navigation = useNavigation(); // Keep if other navigation planned
  const [loggingOut, setLoggingOut] = useState(false); // For logout loading state

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await auth.signOut();
      // AuthLoadingScreen will handle navigation to LoginScreen
    } catch (error) {
      console.error("Logout Error: ", error);
      // Optionally, show an alert to the user
      Alert.alert("Logout Failed", "An error occurred while logging out.");
      setLoggingOut(false);
    }
    // No need to setLoggingOut(false) on success because the screen will unmount
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Text style={styles.welcomeText}>
        Welcome, {auth.currentUser?.displayName || auth.currentUser?.email || 'User'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loggingOut}>
        {loggingOut ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111', // Add this
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: { // Style similar to other auth screens
    backgroundColor: '#1e64e1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 150, // Ensure decent width
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
