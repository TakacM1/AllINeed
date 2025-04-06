import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import pes from '../../../assets/images/pes.png';

export default function Testung() {
  return (
    <View style={styles.container}>
      <ImageBackground source={pes} style={styles.image} resizeMode="cover">
        <Text style={styles.text}>This is the test4 screen!</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
