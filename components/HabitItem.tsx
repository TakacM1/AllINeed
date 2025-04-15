import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Props = {
  habit: { id: string; name: string; done: boolean };
  onToggle: () => void;
};

export default function HabitItem({ habit, onToggle }: Props) {
  const router = useRouter();

  const openDetail = () => {
    router.push({
      pathname: '/habit/[id]',
      params: {
        id: habit.id,
        name: habit.name,
        done: String(habit.done),
      },
    });
    
  };

  return (
    <TouchableOpacity onLongPress={openDetail} onPress={onToggle}>
      <ThemedView style={[styles.habitRow, habit.done && styles.done]}>
        <ThemedText style={styles.habitText}>
          {habit.done ? '✅' : '⬜️'} {habit.name}
        </ThemedText>
        <ThemedText style={styles.addSign}>＋</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  done: {
    backgroundColor: '#d1f7d6',
  },
  habitText: {
    fontSize: 18,
  },
  addSign: {
    fontSize: 20,
    color: '#888',
  },
});
