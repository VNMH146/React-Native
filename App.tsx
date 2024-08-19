
import { Alert, Button, FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ITodo {
  id: number;
  name: string;
}


export default function App() {

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    // Load todo list from storage when the app starts
    const loadTodoList = async () => {
      try {
        const storedTodoList = await AsyncStorage.getItem('todoList');
        if (storedTodoList) {
          setTodoList(JSON.parse(storedTodoList));
        }
      } catch (error) {
        console.error('Failed to load todo list from storage', error);
      }
    };

    loadTodoList();
  }, []);

  useEffect(() => {
    // Save todo list to storage whenever it changes
    const saveTodoList = async () => {
      try {
        await AsyncStorage.setItem('todoList', JSON.stringify(todoList));
      } catch (error) {
        console.error('Failed to save todo list to storage', error);
      }
    };

    saveTodoList();
  }, [todoList]);

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddTodo = () => {
    if (!todo) {
      Alert.alert("Please enter a task");
      return;
    }
    setTodoList([...todoList, { id: randomInteger(2, 2000), name: todo }])
    setTodo("");
  }

  const handleDeleteTodo = (id: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>ToDo App</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            style={styles.todoInput}
            onChangeText={(value) => setTodo(value)}
          ></TextInput>
          <Button title="Add Task"
            onPress={handleAddTodo}
          ></Button>
        </View>


        <View style={styles.body}>
          <FlatList
            data={todoList}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                  onPress={() => {
                    handleDeleteTodo(item.id);
                  }}>
                  <Text style={styles.todoItem}>{item.name}</Text>
                </Pressable>
              )
            }}

          ></FlatList>

        </View>

      </View>
    </TouchableWithoutFeedback>

  )


}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",

  },
  header: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 40,
  },
  todoInput: {
    borderWidth: 1,
    borderBlockColor: "black",
    padding: 5,
    marginHorizontal: 15,
    margin: 15,
    flex: 1,
  },
  body: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  todoItem: {
    fontSize: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
  },

})


