import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
export default function App() {

  const [todoText, setTodoText] = useState('');
  const [todoList, setTodoList] = useState([]);
  function textInputChange(textChanged) {
    setTodoText(textChanged);
  }
  function addToDo() {
    setTodoList((currentTodoList) => [...currentTodoList, todoText]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Todo List'
          style={styles.textInPut}
          onChangeText={textInputChange}
        ></TextInput>
        <Button title='Add' onPress={addToDo}></Button>
      </View>
      <View style={styles.todoList}>
        {todoList.map((todo) => <Text key={todo}>{todo}</Text>)}
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 60,
    flex: 1
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    paddingBottom: 30,
    flex: 1,
    alignItems: 'center'
  },
  textInPut: {
    borderWidth: 2,
    borderColor: 'green',
    width: '85%',
    marginRight: 10,
    padding: 3.5
  },
  todoList: {
    flex: 6
  }
})


