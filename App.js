import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import R from 'res/R'
import Launches from './src/screens/Launches';

export default function App() {
  return (
    <View style={R.palette.container}>
      <Launches />
      <StatusBar style="auto" />
    </View>
  );
}