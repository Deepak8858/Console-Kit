import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // Adjust path if firebaseConfig is elsewhere

export default function AuthLoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        navigation.replace('MainAppScreen'); // Update this line
      } else {
        // No user is signed in
        navigation.replace('LoginScreen');
      }
    });
    return unsubscribe; // Unsubscribe on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111', // Add this
  },
  loadingText: { // For AuthLoadingScreen
     color: '#fff',
     marginTop: 10
  }
});
