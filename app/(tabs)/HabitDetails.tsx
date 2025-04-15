import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function HabitDetails() {
  const router = useRouter();
  const { id, name, done } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for: {name}</Text>
      <Text style={styles.text}>ID: {id}</Text>
      <Text style={styles.text}>Status: {done === 'true' ? '✅ Done' : '⬜ Not done'}</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  button: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontSize: 16 },
});
