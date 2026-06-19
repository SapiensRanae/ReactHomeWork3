import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Task1() {
  const [count, setCount] = useState(0);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    loadCount();
  }, []);

  useEffect(() => {
    saveCount(count);
  }, [count]);

  useEffect(() => {
    if (autoUpdate) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoUpdate]);

  const loadCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem('task1_count');
      if (savedCount !== null) {
        setCount(parseInt(savedCount));
      }
    } catch (e) {}
  };

  const saveCount = async (value) => {
    try {
      await AsyncStorage.setItem('task1_count', value.toString());
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Лічильник: {count}</Text>
      <View style={styles.row}>
        <Button title="+" onPress={() => setCount(count + 1)} />
        <Button title="-" onPress={() => setCount(count - 1)} />
        <Button title="Скинути" onPress={() => setCount(0)} />
      </View>
      <Button 
        title={autoUpdate ? "Вимкнути авто" : "Увімкнути авто"} 
        onPress={() => setAutoUpdate(!autoUpdate)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  }
});
