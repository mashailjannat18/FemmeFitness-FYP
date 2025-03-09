import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

export default function MealDetail() {
  // State to hold the current selected day number
  const [dayNumber, setDayNumber] = useState<number | null>(null);

  useEffect(() => {
    // Default to day 1 when the component mounts (or you can set this to the first meal day)
    setDayNumber(1); // Change to 1 initially
  }, []);

  const handleMealClick = (mealDay: number) => {
    setDayNumber(mealDay);  // Update the dayNumber when a meal is clicked
  };

  return (
    <View style={styles.container}>
      {/* Pink bar with the day number */}
      <View style={styles.dayBar}>
        <Text style={styles.dayText}>Day {dayNumber}</Text>
      </View>

      {/* Content for the image and the nutrients */}
      <View style={styles.contentContainer}>
        {/* Meal Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'data:image/jpeg;base64,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' }} // Replace with your image URL
            style={styles.image}
          />
        </View>

        {/* Nutrients of the Day Text and Categories */}
        <View style={styles.nutrientsContainer}>
          <Text style={styles.nutrientsText}>Nutrients of the Day</Text>

          {/* Categories: Protein, Carbs, Fiber */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoryText}>Protein: 25g</Text>
            <Text style={styles.categoryText}>Carbs: 40g</Text>
            <Text style={styles.categoryText}>Fiber: 10g</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dayBar: {
    width: '100%',
    backgroundColor: '#ff69b4', // Pink color
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align to the top
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%', // Make image container take the full width
    height: 200,  // Set image height
  },
  image: {
    width: width,  // Make image width the same as screen width
    height: 200,   // Keep height fixed
  },
  nutrientsContainer: {
    marginTop: 20,       // Space between the image and text
    alignItems: 'flex-start', // Align text to the left
    width: '100%',       // Make the container take the full width
    paddingRight: 20,    // Add some padding to the right
  },
  nutrientsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesContainer: {
    marginTop: 10,  // Space between nutrients text and categories
  },
  categoryText: {
    fontSize: 16,
    color: '#555', // Slightly lighter color for the category text
    marginBottom: 5, // Add space between categories
  },
});
