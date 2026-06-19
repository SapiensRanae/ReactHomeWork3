import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Task2() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('task2_tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {}
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('task2_tasks', JSON.stringify(newTasks));
    } catch (e) {}
  };

  const addTask = () => {
    if (task.trim()) {
      if (editingId) {
        setTasks(tasks.map(t => t.id === editingId ? { ...t, text: task } : t));
        setEditingId(null);
        Alert.alert('Оновлено', 'Завдання оновлено');
      } else {
        setTasks([...tasks, { id: Date.now().toString(), text: task }]);
        Alert.alert('Додано', 'Нове завдання додано');
      }
      setTask('');
    }
  };

  const editTask = (item) => {
    setTask(item.text);
    setEditingId(item.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    Alert.alert('Видалено', 'Завдання видалено');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список справ</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Введіть завдання"
      />
      <Button title={editingId ? "Оновити" : "Додати"} onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editTask(item)}>
                <Text style={styles.edit}>Редагувати</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.delete}>Видалити</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  edit: {
    color: 'blue',
  },
  delete: {
    color: 'red',
  }
});
