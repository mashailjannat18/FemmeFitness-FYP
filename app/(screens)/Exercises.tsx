import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { AntDesign } from '@expo/vector-icons';

type Exercises = {
  id: number;
  exercise_name: string;
  image: string;
  repetitions: number;
};

export default function Exercises() {
  const { day = 'Day 1' } = useLocalSearchParams();
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercises[]>([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase
        .from('Exercises')
        .select('id, exercise_name, image, repetitions');

      if (error) {
        console.error('Error fetching exercises:', error.message);
      } else {
        setExercises(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const renderExercise = ({ item }: { item: Exercises }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => router.push(`/ExerciseDetail?id=${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.exercise_name}</Text>
        <Text style={styles.repetitions}>Reps: {item.repetitions}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{day}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.playButton}>
          <AntDesign name="play" size={100} color="#d63384" />
        </TouchableOpacity>
      </View>

      <View style={styles.fixedBar}>
        <View style={styles.barItem}>
          <Text style={styles.barTitle}>Calories:</Text>
          <Text style={styles.barValue}>200 kcal</Text>
        </View>
        <View style={styles.barItem}>
          <Text style={styles.barTitle}>Duration:</Text>
          <Text style={styles.barValue}>30 min</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Exercise for {day}</Text>
        <Text style={styles.description}>
          Here is the workout plan for {day}.
        </Text>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderExercise}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#d63384',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -25,
  },
  buttonContainer: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  playButton: {
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  fixedBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  barItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  barValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    elevation: 5,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
  },
  repetitions: {
    fontSize: 14,
    color: '#666',
  },
});
