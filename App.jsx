import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OtpVerificationScreen from './screens/OtpVerificationScreen';
// import UserDashboardScreen from './screens/UserDashboardScreen'; // Remove this
import MainAppScreen from './screens/MainAppScreen'; // Add this
// Ensure firebaseConfig.js is created and Firebase is initialized,
// as AuthLoadingScreen depends on it.

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        {/* <Stack.Screen name="UserDashboardScreen" component={UserDashboardScreen} /> Change this */}
        <Stack.Screen name="MainAppScreen" component={MainAppScreen} /> {/* To this */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
