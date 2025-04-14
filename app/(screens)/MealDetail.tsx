import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

// TypeScript interface for nutrients
interface Nutrient {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  value: number;
  color: string;
  name: string;
}

export default function MealDetail() {
  const { meal, day } = useLocalSearchParams();

  const nutrients: Nutrient[] = [
    { name: 'Protein', value: 60, color: '#8e44ad' },
    { name: 'Carbs', value: 40, color: '#e67e22' },
    { name: 'Fiber', value: 10, color: '#16a085' },
  ];

  const DonutChart: React.FC<DonutChartProps> = ({ value, color, name }) => {
    const radius = 60;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const percentage = value / 100;
    const strokeDashoffset = circumference * (1 - percentage);
    const svgSize = 140;

    return (
      <View style={styles.chartContainer}>
        <Text style={[styles.categoryText, { color }]}>{name}</Text>
        <Svg width={svgSize} height={svgSize} style={styles.chartSvg}>
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            rotation={-90}
            originX={svgSize / 2}
            originY={svgSize / 2}
          />
          <SvgText
            x={svgSize / 2}
            y={svgSize / 2}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="18"
            fill="#333"
          >
            {`${value}g`}
          </SvgText>
        </Svg>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.dayBar}>
          <Text style={styles.dayText}>{meal}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                'data:image/jpeg;base64,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', // fallback demo image
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.nutrientsTitle}>Nutrient Breakdown</Text>
        <View style={styles.chartRow}>
          {nutrients.map((nutrient) => (
            <DonutChart
              key={nutrient.name}
              value={nutrient.value}
              color={nutrient.color}
              name={nutrient.name}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 10,  // Added for additional padding
  },
  dayBar: {
    backgroundColor: '#f06292',
    width: width,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 20, // Added space before
    //marginBottom: 10, // Added space after
  },
  dayText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginVertical: 10,
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 10,
    overflow: 'hidden',
    //marginVertical: 15, // Increased spacing
  },
  image: {
    width: '100%',
    height: '60%',
  },
  nutrientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 0,
    color: '#444',
  },
  chartRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    margin: 10,
  },
  chartSvg: {
    marginTop: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Added chartContainer adjustments
  chartContainerUpdated: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
