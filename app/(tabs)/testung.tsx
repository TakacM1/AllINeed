import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  AppState,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

import pes from '../../assets/images/pes.png';

const STORAGE_KEY = 'habits';
const LAST_OPEN_KEY = 'last_open_date';
const getTodayString = () => new Date().toISOString().slice(0, 10);


export default function Testung() {
  const [habits, setHabits] = useState<{ id: string; name: string; done: boolean }[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      await checkIfNewDay();
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        setHabits(JSON.parse(stored));
      } else {
        // ⬇️ Tu pridáme defaultné zvyky
        const defaultHabits = [
          { id: '1', name: '💊 Meds', done: false },
          { id: '2', name: '🧘 Meditating', done: false },
          { id: '3', name: '💪 Supplements', done: false },
        ];
        setHabits(defaultHabits);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHabits));
      }
    };
  
    init();
  
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkIfNewDay();
    });
  
    return () => sub.remove();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const checkIfNewDay = async () => {
    const today = getTodayString();
    const last = await AsyncStorage.getItem(LAST_OPEN_KEY);
    if (last !== today) {
      await AsyncStorage.setItem(LAST_OPEN_KEY, today);
      setHabits(prev => prev.map(h => ({ ...h, done: false })));
    }
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;
    const newOne = { id: Date.now().toString(), name: newHabit.trim(), done: false };
    setHabits([...habits, newOne]);
    setNewHabit('');
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  return (
    <ThemedView style={styles.container}>
      <ImageBackground source={pes} style={styles.image} resizeMode="cover">
        <ThemedView style={styles.overlay}>
          <ThemedText type="title" style={styles.title}>🌱 Habit Tracker</ThemedText>

          <ThemedView style={styles.inputRow}>
            <TextInput
              value={newHabit}
              onChangeText={setNewHabit}
              placeholder="New habit"
              placeholderTextColor="#ccc"
              style={styles.input}
            />
<TouchableOpacity onPress={() => router.push('/add')} style={styles.addButton}>
  <Text style={styles.addText}>＋</Text>
</TouchableOpacity>
          </ThemedView>

          <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ThemedView
                style={[
                  styles.habitRow,
                  item.done && styles.habitDoneRow,
                ]}
              >
                <TouchableOpacity
                  onPress={() => toggleHabit(item.id)}
                  style={styles.habitBox}
                >
                  <ThemedText style={styles.habitText}>
                    {item.done ? '✅' : '⬜️'} {item.name}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                  <ThemedText style={styles.deleteText}>🗑️</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
            style={{ width: '100%' }}
          />
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontSize: 22,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  habitDoneRow: {
    backgroundColor: '#c8e6c9', // svetlá zelená keď je hotové
  },
  habitBox: {
    flex: 1,
  },
  habitText: {
    fontSize: 18,
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
    paddingLeft: 10,
  },
});
