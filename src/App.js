import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './navigation/RootNavigator';
import { queryClient } from './query/queryClient';
import { AuthProvider } from './context/AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <RootNavigator />
      </QueryClientProvider>
    </AuthProvider>
  );
}
