import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.h1}>Create account</Text>
      <Text style={styles.sub}>Start for free. No credit card needed.</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#555"
        value={name}
        onChangeText={setName}
      />

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
        placeholder="Create a password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => router.replace('/(main)/home')}
      >
        <Text style={styles.btnPrimaryText}>Create account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.switchText}>
          Already have an account? <Text style={styles.switchLink}>Log in</Text>
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
  btnPrimary: {
    backgroundColor: '#4038d5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#4038d5',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimaryText: { color: 'white', fontSize: 16, fontWeight: '700' },
  switchText: { textAlign: 'center', fontSize: 14, color: '#94a3b8' },
  switchLink: { color: '#a89fff', fontWeight: '600' },
});