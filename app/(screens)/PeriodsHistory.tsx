import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

function PeriodsHistory() {
  const navigation = useNavigation();

  const getPastMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 5; i++) {
      const pastDate = new Date(currentDate);
      pastDate.setMonth(currentDate.getMonth() - i);
      const year = pastDate.getFullYear();
      const month = String(pastDate.getMonth() + 1).padStart(2, '0');
      months.push(`${year}-${month}`);
    }
    return months;
  };

  const pastMonths = getPastMonths();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.heading}>📅 Periods History</Text>
        <Text style={styles.subHeading}>Track your cycle with ease</Text>
      </View>

      {pastMonths.map((month, index) => (
        <View key={index} style={styles.calendarContainer}>
          <Text style={styles.monthHeader}>
            {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
          <Calendar
            current={month}
            hideExtraDays={true}
            firstDay={1}
            disableMonthChange={true}
            enableSwipeMonths={false}
            hideArrows={true}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              monthTextColor: '#FF69B4', // Pink color for the month header
              dayTextColor: '#000000', // Black dates
              textDayFontWeight: 'normal', // Changed to 'normal' to remove bold from dates
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'normal', // Weekday headers already normal
              selectedDayBackgroundColor: '#FF69B4',
              selectedDayTextColor: '#fff',
              todayTextColor: '#000000', // Black today date
              arrowColor: '#FF69B4',
              textSectionTitleColor: '#FF69B4', // Pink for section titles
              textDisabledColor: '#d3d3d3',
              dotColor: '#FF69B4',
              selectedDotColor: '#fff',
            }}
            style={styles.calendar}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Keep this black for heading
  },
  subHeading: {
    fontSize: 14,
    color: 'grey', // Subheading in grey
    marginTop: 4,
  },
  calendarContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#8B004F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#d28ca4', // Border color for the calendar container
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'brown', // Month header color (noted inconsistency, see below)
    marginBottom: 10,
    textAlign: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#d28ca4',
    borderRadius: 12,
    width: '100%',
  },
});

export default PeriodsHistory;