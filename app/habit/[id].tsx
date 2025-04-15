import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function HabitDetailScreen() {
  const { id, name, done } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Done: {done}</Text>
    </View>
  );
}

