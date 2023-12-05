import React from 'react'
import {View, Text} from 'react-native';
import { useAppSelector } from '../app/hooks';

const Counter = () => {
  const counterValue = useAppSelector(state => state.counter.value);

  return (
    <View>
      <Text>{counterValue}</Text>
    </View>
  )
}

export default Counter;