// app/add.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const STORAGE_KEY = 'habits';

export default function AddHabit() {
  const [name, setName] = useState('');
  const router = useRouter();

  const saveHabit = async () => {
    if (!name.trim()) return;
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const habits = stored ? JSON.parse(stored) : [];
    const newHabit = { id: Date.now().toString(), name: name.trim(), done: false };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...habits, newHabit]));
    router.replace('/testung'); // alebo `router.back()` na návrat
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Habit Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <TouchableOpacity onPress={saveHabit} style={styles.button}>
        <Text style={styles.buttonText}>Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 8 },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18 },
});
