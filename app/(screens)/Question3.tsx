import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { setUserData } from '../../datafiles/userData';

const Question3: React.FC = () => {
  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);
  const heightRange = Array.from({ length: 41 }, (_, i) => (3 + i * 0.1).toFixed(1)); 

  const handleHeightSelect = (height: string) => {
    const selected = parseFloat(height);
    setSelectedHeight(selected); 
    setUserData('height', selected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What is Your Height (ft)?</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedHeight?.toString()}
            onValueChange={handleHeightSelect}
            style={styles.picker}
          >
            {heightRange.map((height) => (
              <Picker.Item key={height} label={`${height} ft`} value={height} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Link href="/(screens)/Question2" style={[styles.button, styles.backButton]}>
          <Text style={styles.buttonText}>Back</Text>
        </Link>

        {selectedHeight !== null ? (
          <Link href="/(screens)/Question4" style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </Link>
        ) : (
          <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled={true}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
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
  optionsContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 5, 
    marginTop: 20,
  },
  pickerContainer: {
    width: '100%', 
  },
  picker: {
    height: 55,
    width: '100%',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
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

export default Question3;
