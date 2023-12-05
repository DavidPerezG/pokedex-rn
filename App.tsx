import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PokemonList from './src/components/PokemonList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/app/store'
import Counter from './src/components/Counter';
import ButtonRedux from './src/components/ButtonRedux';
import { useAppSelector } from './src/app/hooks';

function MyApp() {
  const currentPokemon = useAppSelector(state => state.pokemon);
  return (
    <View style={[styles.container, { backgroundColor: `${currentPokemon.color}` }]}>
      <SafeAreaView>
        <PokemonList></PokemonList>
      </SafeAreaView>
    </View>
  );
}

export default function App() {

  return (
    <Provider store={store}>
      <MyApp></MyApp>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
