import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      if (seen) {
        router.replace('/(main)/home');
      } else {
        router.replace('/onboarding');
      }
    };
    checkOnboarding();
  }, []);

  return null;
}