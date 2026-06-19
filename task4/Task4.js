import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Task4() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('task4_theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {}
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('task4_theme', newTheme);
    } catch (e) {}
  };

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDark ? styles.darkText : styles.lightText]}>
        Поточна тема: {isDark ? 'Темна' : 'Світла'}
      </Text>
      <Button title="Змінити тему" onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    transition: 'background-color 0.5s ease', // Note: React Native does not support CSS transitions directly like this, but I'll use it for structure or just rely on state re-render. For "smooth" change in RN we usually use Animated, but the prompt said "No need to do anything fancy". However, I can use a simple background color change.
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#333333',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
});
