import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
        <Text style={{ color: 'black', fontSize: 34 }}>
          Hello World!
        </Text>
      </View>
    </NavigationContainer>
  );
}
