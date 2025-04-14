import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const workoutDays = [
  {
    day: '1',
    title: 'Upper Body Strength',
    calories: '320 kcal',
    duration: '45 min'
  },
  {
    day: '2',
    title: 'Lower Body Workout',
    calories: '380 kcal',
    duration: '50 min'
  },
  {
    day: '3',
    title: 'Core & Abs',
    calories: '280 kcal',
    duration: '40 min'
  },
  {
    day: '4',
    title: 'Full Body HIIT',
    calories: '400 kcal',
    duration: '55 min'
  },
  {
    day: '5',
    title: 'Yoga & Stretching',
    calories: '250 kcal',
    duration: '60 min'
  }
];

export default function Workouts() {
  const router = useRouter();

  const navigateToExercises = (day: string) => {
    router.push(`../(screens)/Exercises?day=${day}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/2.jpg')} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Workout of the Day</Text>
        <Text style={styles.description}>
          Select a day to view its workout plan.
        </Text>

        <View style={styles.options}>
          {workoutDays.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToExercises(`Day ${item.day}`)} 
              style={styles.optionButton}
            >
              <View style={styles.dayContainer}>
                <View style={styles.dayNumberContainer}>
                  <Text style={styles.dayNumber}>{item.day}</Text>
                  <View style={styles.separator} />
                </View>
                
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>{item.title}</Text>
                  <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                      <MaterialIcons name="local-fire-department" size={14} color="#FFA500" />
                      <Text style={styles.metaText}>{item.calories}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <MaterialIcons name="access-time" size={14} color="#1E90FF" />
                      <Text style={styles.metaText}>{item.duration}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.rightSection}>
                  <View style={styles.separator} />
                  <MaterialIcons name="check-circle" size={24} color="#FF1493" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#FF1493',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
  },
  options: {
    marginTop: 16,
    paddingBottom: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    marginRight: 12,
  },
  separator: {
    height: 40,
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  workoutInfo: {
    flex: 1,
    marginHorizontal: 8,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
});