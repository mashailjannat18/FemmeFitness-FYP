import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { setUserData } from '../../datafiles/userData'; 

const Question2: React.FC = () => {
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const router = useRouter(); 

  const handleWeightChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setSelectedWeight(text); 
    }
  };

  const handleNext = () => {
    console.log(`Next pressed, selectedWeight: ${selectedWeight}`); 
    
    if (selectedWeight === '') {
      Alert.alert('Field Required', 'Please enter your weight before proceeding.', [
        {
          text: 'OK',
        },
      ]);
    } else {
      setUserData('weight', selectedWeight);
      setTimeout(() => {
        router.push('/(screens)/Question3'); 
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What Is Your Weight (kg)?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your weight in kg"
        keyboardType="numeric"
        value={selectedWeight}
        onChangeText={handleWeightChange} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => router.push('/(screens)/Question1')} 
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedWeight === '' && styles.disabledButton]} 
          onPress={handleNext}
          disabled={selectedWeight === ''}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 200, 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#d63384',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#d63384',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#a9a9a9', 
  },
  disabledButton: {
    backgroundColor: '#a9a9a9', 
  },
});

export default Question2;
