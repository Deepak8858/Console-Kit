import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OtpVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  // const [confirmationResult, setConfirmationResult] = useState(null);

  // useEffect(() => {
  //   // In a real scenario, confirmationResult would be passed via navigation params
  //   // from the screen that initiated phone number verification (e.g., Signup or LoginWithPhone)
  //   if (route.params?.confirmationResult) {
  //     setConfirmationResult(route.params.confirmationResult);
  //   }
  // }, [route.params]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { // Assuming OTP is 6 digits
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
    setLoading(true);
    // --- Placeholder for actual OTP verification logic ---
    // In a real implementation with Firebase Phone Auth:
    // try {
    //   if (!confirmationResult) {
    //     throw new Error("Confirmation data not found. Please try sending OTP again.");
    //   }
    //   await confirmationResult.confirm(otp);
    //   // If successful, onAuthStateChanged in AuthLoadingScreen will handle navigation
    //   // to UserDashboardScreen. No explicit navigation needed here.
    //   Alert.alert('Success', 'Phone number verified successfully!'); // Or just let AuthLoading handle it
    // } catch (error) {
    //   Alert.alert('Verification Failed', error.message);
    // }
    // --- End of placeholder ---

    // Current placeholder behavior:
    Alert.alert('OTP Verification (Placeholder)', `OTP entered: ${otp}. Actual verification with Firebase Phone Auth needs to be fully integrated with the preceding step (e.g., phone number input and signInWithPhoneNumber call).`);
    setLoading(false);
    // navigation.navigate('UserDashboardScreen'); // Example navigation on "success"
  };

  const handleResendOtp = () => {
    // --- Placeholder for actual Resend OTP logic ---
    // This would typically involve re-sending the OTP using the phone number
    // and potentially re-initializing the reCAPTCHA verifier.
    // const phoneNumber = route.params?.phoneNumber;
    // if (phoneNumber) {
    //   // Call your function to resend OTP here, e.g., using auth.signInWithPhoneNumber(...)
    //   Alert.alert('OTP Resent (Placeholder)', `A new OTP would be sent to ${phoneNumber}.`);
    // } else {
    //   Alert.alert('Error', 'Phone number not available to resend OTP.');
    // }
    // --- End of placeholder ---
    Alert.alert('Resend OTP (Placeholder)', 'Resend OTP functionality would be implemented here.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your phone number.
        {/* In a real app, you might show the phone number: `sent to ${route.params?.phoneNumber}` */}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendOtp} style={styles.linkButton}>
        <Text style={styles.linkText}>Didn't receive code? Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
        <Text style={styles.linkText}>Go Back</Text>
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
    fontSize: 18,
    textAlign: 'center',
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
