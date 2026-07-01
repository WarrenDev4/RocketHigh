import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.h1}>Welcome back</Text>
      <Text style={styles.sub}>Log in to your RocketHigh account.</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@email.com"
        placeholderTextColor="#555"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Your password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => router.replace('/(main)/home')}
      >
        <Text style={styles.btnPrimaryText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
        <Text style={styles.switchText}>
          Don't have an account? <Text style={styles.switchLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  content: { padding: 24, paddingTop: 80 },
  h1: { fontSize: 32, fontWeight: '800', color: 'white', marginBottom: 6 },
  sub: { fontSize: 14, color: '#94a3b8', marginBottom: 32 },
  label: { fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: 'white',
    marginBottom: 16,
  },
  forgotText: { color: '#a89fff', fontSize: 13, fontWeight: '500' },
  btnPrimary: {
    backgroundColor: '#4038d5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4038d5',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimaryText: { color: 'white', fontSize: 16, fontWeight: '700' },
  divider: { borderTopWidth: 0.5, borderTopColor: '#222', marginBottom: 20 },
  switchText: { textAlign: 'center', fontSize: 14, color: '#94a3b8' },
  switchLink: { color: '#a89fff', fontWeight: '600' },
});