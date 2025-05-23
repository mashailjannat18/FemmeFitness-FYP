import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const GoalSetting = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    {
      title: 'Lose Weight',
      description: 'Burn fat & get lean',
      icon: <Feather name="trending-down" size={28} color="#b03060" />,
    },
    {
      title: 'Gain Weight',
      description: 'Healthy weight increase',
      icon: <Feather name="trending-up" size={28} color="#b03060" />,
    },
    {
      title: 'Muscle Build',
      description: 'Build strength & power',
      icon: <MaterialIcons name="fitness-center" size={28} color="#b03060" />,
    },
    {
      title: 'Stay Fit',
      description: 'Maintain your wellness',
      icon: <MaterialIcons name="self-improvement" size={28} color="#b03060" />,
    },
  ];

  const scaleAnimations = goals.map(() => new Animated.Value(1));

  const handlePress = (index: number, goal: string) => {
    Animated.sequence([
      Animated.timing(scaleAnimations[index], {
        toValue: 0.96,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimations[index], {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedGoal(goal);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Current Goal</Text>
        <View style={styles.currentGoalContainer}>
          <Text style={styles.selectedGoal}>
            {selectedGoal || 'Not selected yet'}
          </Text>
        </View>

        <Text style={styles.subHeading}>Edit your goal</Text>
        <View style={styles.cardsContainer}>
          {goals.map((goal, index) => (
            <Animated.View
              key={goal.title}
              style={[styles.cardContainer, { transform: [{ scale: scaleAnimations[index] }] }]}
            >
              <TouchableOpacity
                style={[styles.card, selectedGoal === goal.title && styles.selectedCard]}
                onPress={() => handlePress(index, goal.title)}
                activeOpacity={0.85}
              >
                <View style={styles.iconCircle}>{goal.icon}</View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{goal.title}</Text>
                  <Text style={styles.cardDescription}>{goal.description}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background for the entire screen
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF1493', 
    marginBottom: 12,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black', // Matching subheading color to fit theme
    marginVertical: 20,
    textAlign: 'center',
  },
  currentGoalContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#d48fb0', // Soft shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ffe0ea', // Subtle border to match the theme
  },
  selectedGoal: {
    fontSize: 18,
    color: '#b03060', // Deep color for selected goal
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  cardContainer: {
    width: width * 0.9,
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#f3c0d6', // Soft shadow color to match disease info style
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe0ea', // Subtle border
  },
  selectedCard: {
    borderColor: '#b03060', // Deep border color for selected goal
    borderWidth: 2,
    shadowColor: '#b03060', // Shadow color for selected goal
    shadowOpacity: 0.4,
    elevation: 8,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffe4ec', // Soft background color for icons
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    color: '#FF69B4', // Matching deep color for the title
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555', // Lighter color for the description
  },
});

export default GoalSetting;
