import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Import calendar component
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'; // Import navigation types
import { RootTabParamList } from './NavigationTypes'; // Import the param list

// Define the navigation prop type
type NavigationProp = BottomTabNavigationProp<RootTabParamList, 'OvulationTracker'>;

export default function OvulationTracker() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>(); // Initialize navigation with correct types

  // Handle date selection from the calendar
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7); // Get current month in 'YYYY-MM' format

  // Function to navigate to Periods screen
  const navigateToPeriods = () => {
    navigation.navigate('Periods'); // Correctly navigate to the Periods screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Calendar on top */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth}  // Set current month
          onDayPress={handleDayPress}
          monthFormat={'yyyy MM'} // Format to display year and month
          markingType={'dot'} // Marking type for selected dates
          markedDates={{
            [selectedDate || '']: {
              selected: true,
              selectedColor: '#ff69b4', // Pink color for selected date
              selectedTextColor: 'white',
            },
          }}
          style={styles.calendar}
          horizontal={true} // Enable horizontal scrolling
          pagingEnabled={false} // Disable paging between months
          showSixWeeks={false} // Only show the current month
          firstDay={1} // Start the week on Monday
          theme={{
            selectedDayBackgroundColor: '#ff69b4', // Pink background for selected date
            selectedDayTextColor: 'white',
            todayTextColor: '#ff69b4', // Pink color for today's date
            arrowColor: '#ff69b4', // Pink color for the navigation arrows
            monthTextColor: '#ff69b4', // Pink color for the month name
            dayTextColor: '#333', // Dark text color for days
            textDayFontWeight: 'bold', // Bold text for days
            textMonthFontWeight: 'bold', // Bold text for month name
            textDayHeaderFontWeight: 'bold', // Bold text for day headers
            todayBackgroundColor: '#fff', // White background for today's box
            backgroundColor: '#fff', // White background for the calendar
          }}
        />
      </View>

      {/* Cycle Day Text */}
      <Text style={styles.cycleDayText}>Cycle Day</Text>

      {/* Phase Text */}
      <Text style={styles.phaseText}>Phase</Text>

      {/* Log Period TouchableOpacity */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={navigateToPeriods} style={styles.optionButton}>
          <Text style={styles.optionText}>Log Period</Text>
        </TouchableOpacity>
      </View>

      {/* My Cycles Text */}
      <Text style={styles.myCyclesText}>My Cycles</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Ensure background color is white
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 350, // Adjust calendar height as needed
    width: '100%',
  },
  cycleDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  phaseText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '40%', // Adjust width to make the button smaller
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5, // Reduce padding for a smaller button
    alignSelf: 'center', // Center the button horizontally
  },
  optionButton: {
    backgroundColor: '#ff69b4', // Pink color for the button
    borderRadius: 5,
    paddingVertical: 10, // Padding for button height
    alignItems: 'center', // Center text inside button
  },
  optionText: {
    fontSize: 16,
    color: 'white', // Text color
    fontWeight: 'bold',
  },
  myCyclesText: {
    fontSize: 16,
    marginTop: 20,
    color: '#555',
    textAlign: 'center',
  },
});
