import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function Task3() {
  const [seconds, setSeconds] = useState(60);
  const [inputSeconds, setInputSeconds] = useState('60');
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(intervalRef.current);
      Alert.alert('Час вийшов!', 'Таймер досяг нуля.');
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(parseInt(inputSeconds) || 0);
  };

  const handleInputChange = (text) => {
    setInputSeconds(text);
    if (!isActive) {
      setSeconds(parseInt(text) || 0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Таймер: {seconds}с</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputSeconds}
        onChangeText={handleInputChange}
        placeholder="Стартове значення (сек)"
      />
      <View style={styles.row}>
        <Button title="Старт" onPress={startTimer} disabled={isActive || seconds === 0} />
        <Button title="Пауза" onPress={pauseTimer} disabled={!isActive} />
        <Button title="Скидання" onPress={resetTimer} />
      </View>
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
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  }
});
