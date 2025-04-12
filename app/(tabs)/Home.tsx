import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Svg, { Circle, LinearGradient, Defs, Stop, Path, Rect } from 'react-native-svg';

// Types
type Exercise = {
  image: string;
  exercise_name: string;
  calories_burn: number;
  repetitions: number;
  id: string;
};

type ProgressWithGradient = {
  title: string;
  value: number;
  target: number;
  gradientId: string;
  icon: string;
  unit: string;
};

type ProgressWithoutGradient = {
  title: string;
  value: number;
  target: number;
  icon: string;
  unit: string;
};

// Circular Progress Component
interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  gradientId: string;
  displayText?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 160,
  strokeWidth = 16,
  gradientId,
  displayText,
}): JSX.Element => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const stops =
    gradientId === 'caloriesBurntGradient'
      ? [
          { offset: '0%', stopColor: '#FF4040' },
          { offset: '100%', stopColor: '#8B0000' },
        ]
      : gradientId === 'caloriesGainedGradient'
      ? [
          { offset: '0%', stopColor: '#FF69B4' },
          { offset: '100%', stopColor: '#FF1493' },
        ]
      : [
          { offset: '0%', stopColor: '#BA55D3' },
          { offset: '100%', stopColor: '#4B0082' },
        ];

  return (
    <View style={{ position: 'relative', width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {stops.map((stop, index) => (
              <Stop key={index} offset={stop.offset} stopColor={stop.stopColor} />
            ))}
          </LinearGradient>
        </Defs>
        <Circle
          stroke="#E5E7EB"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={2}
        />
        <Circle
          stroke={`url(#${gradientId})`}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {displayText && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: gradientId === 'caloriesBurntGradient' ? '#FF4040' : 
                  gradientId === 'caloriesGainedGradient' ? '#FF69B4' : '#BA55D3'
          }}>
            {displayText}
          </Text>
        </View>
      )}
    </View>
  );
};

// Water Glass Component
interface WaterGlassProps {
  progress: number;
  size?: number;
}

const WaterGlass: React.FC<WaterGlassProps> = ({ progress, size = 120 }): JSX.Element => {
  const glassWidth = size * 0.7;
  const glassHeight = size * 1.2;
  const glassX = (size - glassWidth) / 2;
  const glassBottomY = size - 15;
  const glassTopY = 15;
  const waterMaxHeight = glassHeight - 40;
  const waterHeight = (progress / 100) * waterMaxHeight;
  const waterY = glassBottomY - waterHeight;

  const glassPath = `
    M ${glassX + 10},${glassTopY} 
    C ${glassX},${glassTopY + 20} ${glassX},${glassTopY + 40} ${glassX + 5},${glassTopY + 60} 
    L ${glassX + 15},${glassBottomY - 20} 
    C ${glassX + 10},${glassBottomY} ${glassX + glassWidth - 10},${glassBottomY} ${glassX + glassWidth - 15},${glassBottomY - 20} 
    L ${glassX + glassWidth - 5},${glassTopY + 60} 
    C ${glassX + glassWidth},${glassTopY + 40} ${glassX + glassWidth},${glassTopY + 20} ${glassX + glassWidth - 10},${glassTopY} 
    Z
  `;

  const waterPath = `
    M ${glassX + 15},${glassBottomY - 20} 
    C ${glassX + 10},${glassBottomY} ${glassX + glassWidth - 10},${glassBottomY} ${glassX + glassWidth - 15},${glassBottomY - 20} 
    L ${glassX + glassWidth - 5},${glassTopY + 60} 
    L ${glassX + glassWidth - 5},${waterY} 
    L ${glassX + 5},${waterY} 
    L ${glassX + 5},${glassTopY + 60} 
    Z
  `;

  return (
    <Svg width={size} height={size}>
      <Defs>
        <LinearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#E0F7FA" stopOpacity={0.6} />
          <Stop offset="50%" stopColor="#81D4FA" stopOpacity={0.8} />
          <Stop offset="100%" stopColor="#0288D1" stopOpacity={0.9} />
        </LinearGradient>
      </Defs>
      <Path d={glassPath} stroke="#B0B0B0" strokeWidth={1.5} fill="rgba(255, 255, 255, 0.1)" />
      <Path d={waterPath} fill="url(#waterGradient)" />
    </Svg>
  );
};

// Sleep Card Component
interface SleepCardProps {
  progress: number;
}

const SleepCard: React.FC<SleepCardProps> = ({ progress }): JSX.Element => {
  return (
    <View style={styles.sleepContainer}>
      <Svg width="100%" height="100%" style={styles.sleepBackground}>
        <Defs>
          <LinearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#9C27B0" />
            <Stop offset="100%" stopColor="#673AB7" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" rx="16" fill="url(#sleepGradient)" />
      </Svg>
      <View style={styles.sleepContent}>
        <Text style={styles.sleepIcon}>🌙</Text>
        <Text style={styles.sleepTitle}>Sleep</Text>
        <Text style={styles.sleepProgressText}>
          {progress}/{8} hrs
        </Text>
      </View>
    </View>
  );
};

// Helper Functions
function getCurrentMonth() {
  const now = new Date();
  return now.toLocaleString('default', { month: 'long', year: 'numeric' });
}

function getCurrentMonthDates() {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({ day: i.toString(), date: `${now.getFullYear()}-${now.getMonth() + 1}-${i}` });
  }
  return dates;
}

// Main Component
export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [exercises, setExercises] = useState<Exercise | null>(null);
  const dates = getCurrentMonthDates();
  const router = useRouter();
  const currentDateIndex = new Date().getDate() - 1;

  useEffect(() => {
    const fetchFirstExercise = async () => {
      const { data, error } = await supabase
        .from('Exercises')
        .select('image, exercise_name, calories_burn, repetitions, id')
        .limit(1)
        .single();
      if (error) {
        console.error('Error fetching exercise:', error);
      } else {
        setExercises(data);
      }
    };

    fetchFirstExercise();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => true;
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Streak Card */}
      <View style={[styles.card, styles.streakCard]}>
        <View style={styles.streakHeader}>
          <Text style={styles.streakTitle}>🔥 Current Streak</Text>
          <Text style={styles.streakDays}>7 days</Text>
        </View>
        <Text style={styles.month}>{currentMonth}</Text>

        <FlatList
          data={dates}
          keyExtractor={(item) => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
          renderItem={({ item, index }) => (
            <View style={[
              styles.dateItem, 
              index < 7 && styles.activeDateItem,
              index === currentDateIndex && styles.currentDateItem
            ]}>
              <Text style={[
                styles.dateDay,
                index === currentDateIndex && styles.currentDateText
              ]}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index % 7]}
              </Text>
              <Text style={[
                styles.dateText,
                index === currentDateIndex && styles.currentDateText
              ]}>
                {item.day}
              </Text>
              {index === currentDateIndex && (
                <View style={styles.currentDayIndicator} />
              )}
            </View>
          )}
        />
      </View>

      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressGrid}>
          {/* First row */}
          <View style={[styles.progressCard, { height: 260 }]}>
            <Text style={styles.progressIcon}>📈</Text>
            <Text style={styles.progressTitle}>Calories Gained</Text>
            <CircularProgress
              progress={(1500 / 2000) * 100}
              gradientId="caloriesGainedGradient"
              displayText="1500/2000 cal"
            />
          </View>

          <View style={[styles.progressCard, { height: 260 }]}>
            <Text style={styles.progressIcon}>🔥</Text>
            <Text style={styles.progressTitle}>Calories Burnt</Text>
            <CircularProgress
              progress={(300 / 500) * 100}
              gradientId="caloriesBurntGradient"
              displayText="300/500 cal"
            />
          </View>

          {/* Second row */}
          <View style={[styles.progressCard, { height: 260 }]}>
            <SleepCard progress={6} />
          </View>

          <View style={[styles.progressCard, { height: 260 }]}>
            <Text style={styles.progressIcon}>💧</Text>
            <Text style={styles.progressTitle}>Water</Text>
            <WaterGlass progress={(2 / 3) * 100} />
            <Text style={styles.progressText}>
              2/3 L
            </Text>
          </View>
        </View>
      </View>

      {/* Workout Card */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {exercises && (
          <TouchableOpacity
            style={[styles.card, styles.workoutCard]}
            onPress={() => router.push(`/ExerciseDetail?id=${exercises.id}`)}
          >
            <View style={styles.workoutRow}>
              <Image 
                source={{ uri: exercises.image }} 
                style={styles.workoutImage} 
              />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{exercises.exercise_name}</Text>
                <View style={styles.workoutStats}>
                  <View style={styles.workoutStatItem}>
                    <Text style={styles.workoutStatIcon}>🔥</Text>
                    <Text style={styles.workoutStatText}>{exercises.calories_burn} cal</Text>
                  </View>
                  <View style={styles.workoutStatItem}>
                    <Text style={styles.workoutStatIcon}>🔁</Text>
                    <Text style={styles.workoutStatText}>{exercises.repetitions} reps</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.workoutProgress}>
              <View style={[styles.progressBar, { width: '65%' }]}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressLabel}>65% completed</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Nutrition Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Nutrition</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  streakCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EC4899',
    paddingLeft: 16,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  streakDays: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EC4899',
  },
  month: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  dateList: {
    paddingVertical: 8,
  },
  dateItem: {
    width: 44,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeDateItem: {
    backgroundColor: '#FCE7F3',
    borderColor: '#EC4899',
  },
  currentDateItem: {
    width: 48,
    height: 72,
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },
  dateDay: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  currentDateText: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  currentDayIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  progressIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
  },
  sleepContainer: {
    borderRadius: 16,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  sleepBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sleepContent: {
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    padding: 16,
  },
  sleepIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#FFF',
  },
  sleepTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sleepProgressText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 8,
  },
  workoutCard: {
    padding: 0,
    overflow: 'hidden',
  },
  workoutRow: {
    flexDirection: 'row',
    padding: 16,
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  workoutStats: {
    flexDirection: 'row',
  },
  workoutStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutStatIcon: {
    marginRight: 4,
  },
  workoutStatText: {
    fontSize: 14,
    color: '#4B5563',
  },
  workoutProgress: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});