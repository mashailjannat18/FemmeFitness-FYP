import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

type ExerciseDetailType = {
  exercise_name: string;
  image: string;
  exercise_description: string;
  video_url: string;
};

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDetailType | null>(null);

  useEffect(() => {
    if (id) fetchExerciseDetail(id);
  }, [id]);

  const fetchExerciseDetail = async (exerciseId: string) => {
    try {
      const { data, error } = await supabase
        .from('Exercises')
        .select('exercise_name, image, exercise_description, video_url')
        .eq('id', exerciseId)
        .single();

      if (error) {
        console.error('Error fetching exercise detail:', error.message);
      } else {
        setExerciseDetail(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  if (!exerciseDetail) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{exerciseDetail.exercise_name}</Text>
      </View>

      <Image source={{ uri: exerciseDetail.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.description}>{exerciseDetail.exercise_description}</Text>

        <Text style={styles.title}>Video</Text>
        <Text style={styles.videoLink}>{exerciseDetail.video_url}</Text>
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
    image: {
        width: '100%',
        height: 230,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 30
    },
    content: {
        paddingHorizontal: 18,
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
    videoLink: {
        fontSize: 16,
    }
});
