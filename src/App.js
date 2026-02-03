import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Appnavigator from './navigation/Appnavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Appnavigator />
    </NavigationContainer>
  );
}
