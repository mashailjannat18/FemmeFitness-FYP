import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; 
import { setUserData } from '@/datafiles/userData'; 

type IntensityLevel = 'Beginner' | 'Mediocre' | 'Intense';

const Question8: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<IntensityLevel | null>(null);
  const router = useRouter(); 

  const handleNext = () => {
    if (!selectedLevel) {
      Alert.alert('Error', 'Please select a workout intensity level');
    } else {
      setUserData('intensityLevel', selectedLevel); 
      router.push('/(screens)/Question9');
    }
  };

  const handleBack = () => {
    router.push('/(screens)/Question7');
  };

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Select Your Workout Intensity</Text>

      <View style={styles.optionsContainer}>
        {['Beginner', 'Mediocre', 'Intense'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.option,
              selectedLevel === level ? styles.selectedOption : styles.unselectedOption,
            ]}
            onPress={() => setSelectedLevel(level as IntensityLevel)}
          >
            <Text style={[styles.optionText, selectedLevel === level && styles.selectedOptionText]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !selectedLevel ? styles.disabledButton : styles.activeButton]}
          onPress={handleNext}
          disabled={!selectedLevel}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#d63384',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '80%',
    marginBottom: 30,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bbb',
    backgroundColor: '#f8f8f8',
  },
  selectedOption: {
    backgroundColor: '#d63384',
    borderColor: '#d63384',
  },
  unselectedOption: {
    backgroundColor: 'white',
  },
  optionText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedOptionText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    elevation: 3,
  },
  backButton: {
    backgroundColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#d63384',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Question8;
