import React from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import { useAppDispatch } from '../app/hooks';
import {add, decrement, addByAmount, decrementByAmount} from '../features/counter/counterSlice';

const ButtonRedux = () => {
  const dispatch = useAppDispatch();

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={()=> dispatch(add())}>
        <Text>Increment</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
        <Text>Decrement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> dispatch(addByAmount(10))}>
        <Text>Increment By 10</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(decrementByAmount(10))}>
        <Text>Decrement by 10</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ButtonRedux;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5359d6',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  }
});