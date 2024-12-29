import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OvulationTracker() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ovulation Tracker</Text>
      <Text style={styles.description}>
        Track your ovulation cycle and get helpful insights!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
