import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, GestureResponderEvent, LayoutChangeEvent } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from 'react-native';
import { setUserData } from "@/datafiles/userData";

const Question7: React.FC = () => {
  const [activityLevel, setActivityLevel] = useState<number | null>(null);
  const sliderWidth = useRef(0); 
  const sliderPosition = useRef(new Animated.Value(0)).current; 
  const router = useRouter(); 

  useEffect(() => {
  }, [activityLevel]);

  const onSliderLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    sliderWidth.current = width;
  };

  const handleSliderMove = (event: any) => {
    const { locationX } = event.nativeEvent;
    const newSliderValue = Math.max(0, Math.min(locationX, sliderWidth.current - 30)); 
    sliderPosition.setValue(newSliderValue);

    const newActivityLevel = newSliderValue / (sliderWidth.current - 30); 
    setActivityLevel(newActivityLevel);
  };

  const isNextDisabled = activityLevel === null;
  const handleNextPress = (e: GestureResponderEvent) => {
    if (isNextDisabled) {
      e.preventDefault(); 
    } else {
      setUserData("activityLevel", (activityLevel * 100).toFixed(0));  
      router.push("/(screens)/Question8");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Your Activity Level</Text>

      <View style={styles.labelsContainer}>
        <Text style={styles.label}>Not Active</Text>
        <Text style={styles.label}>Highly Active</Text>
      </View>

      <View
        style={styles.sliderContainer}
        onLayout={onSliderLayout}
        onStartShouldSetResponder={() => true}
        onResponderMove={handleSliderMove}
        onMoveShouldSetResponder={() => true} 
      >
        <Animated.View
          style={[styles.slider, { transform: [{ translateX: sliderPosition }] }]}
        />
      </View>

      <Text style={styles.sliderText}>
        {activityLevel === null
          ? "Drag the circle to select your activity level."
          : `Activity Level: ${(activityLevel * 100).toFixed(0)}%`}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/(screens)/Question6")}
          style={[styles.button, styles.backButton]}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextPress} 
          style={[styles.button, styles.nextButton, isNextDisabled && styles.disabled]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  sliderContainer: {
    width: "90%",
    height: 30,
    backgroundColor: "#ddd",
    borderRadius: 15,
    marginVertical: 20,
    justifyContent: "center",
    position: "relative", 
  },
  slider: {
    width: 30,
    height: 30,
    backgroundColor: "#d63384",
    borderRadius: 15,
    position: "absolute", 
    top: 0, 
  },
  sliderText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: "#a9a9a9", 
  },
  nextButton: {
    backgroundColor: "#d63384", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5, 
  },
});

export default Question7;
