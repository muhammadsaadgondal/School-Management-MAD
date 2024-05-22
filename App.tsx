import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import InfoCard from './src/Components/InfoCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ManageClasses from './src/Screens/ManageClasses';


const App = () => {

  return (
    <SafeAreaProvider>

      <SafeAreaView>

       
        <ManageClasses />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
