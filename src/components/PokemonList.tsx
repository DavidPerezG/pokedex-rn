import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { PokemonClient } from 'pokenode-ts';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPokemon } from '../features/pokemon/pokemonSlice';
import { add, addByAmount, decrement, decrementByAmount } from '../features/counter/counterSlice';
import Pokemon, { Stats } from '../models/Pokemon';
import { Colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const PokemonList = () => {

  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(state => state.pokemon);
  const counter = useAppSelector(state => state.counter);
  const [loading, setLoading] = useState<boolean>(false);
  const [porcentageStats, setPorcentagesStats] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchPokemon = () => {
      const client = new PokemonClient();
      client.getPokemonById(counter.value)
        .then(response => {
          const currentPokemonStats: Stats = {
            hp: response.stats[0].base_stat,
            attack: response.stats[1].base_stat,
            defense: response.stats[2].base_stat,
            specialAttack: response.stats[3].base_stat,
            specialDefense: response.stats[4].base_stat,
            speed: response.stats[5].base_stat,
          };
          const newPokemon: Pokemon = {
            id: response.id,
            name: response.name,
            type: response.types[0].type?.name?.toString(),
            typeTwo: response.types[1]?.type?.name?.toString(),
            height: response.height,
            weight: response.weight,
            stats: currentPokemonStats,
            image: response.sprites.front_default?.toString(),
            move: response.moves[0]?.move?.name?.toString(),
            color: Colors[response.types[0].type?.name?.toString() as keyof typeof Colors],
            colorTwo: Colors[response.types[1]?.type?.name?.toString() as keyof typeof Colors]
          };
          dispatch(setPokemon(newPokemon));
          checkPorcentageValue(newPokemon);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchPokemon();

  }, [counter, dispatch])

  const handleIncrement = () => {
    dispatch(add());
  }

  const handleDecrement = () => {
    console.log('decrementado')
    dispatch(decrement());
  }

  const handleIncrementByAmount = (amount: number) => {
    dispatch(addByAmount(amount));
  }

  const handleDecrementByAmount = (amount: number) => {
    dispatch(decrementByAmount(amount));
  }

  const checkPorcentageValue = (pokemon: Pokemon) => {
    let hp = pokemon?.stats?.hp || 0;
    let attack = pokemon?.stats?.attack || 0;
    let defense = pokemon?.stats?.defense || 0;
    let specialAttack = pokemon?.stats?.specialAttack || 0;
    let specialDefense = pokemon?.stats?.specialDefense || 0;
    let speed = pokemon?.stats?.speed || 0;

    let array = [hp, attack, defense, specialAttack, specialDefense, speed,];
    let maxValue = Math.max(...array);

    let porcentageStats = {
      hp: ((hp * 100) / maxValue),
      attack: ((attack * 100) / maxValue),
      defense: ((defense * 100) / maxValue),
      specialAttack: ((specialAttack * 100) / maxValue),
      specialDefense: ((specialDefense * 100) / maxValue),
      speed: ((speed * 100) / maxValue),
    }

    setPorcentagesStats(porcentageStats);
  }

  return (

    <View style={[styles.container, { backgroundColor: `${currentPokemon.color}` }]}>
      <ImageBackground resizeMode='contain' style={{ height: '100%' }} imageStyle={{
        position: 'absolute',
        top: 0,
        height: '45%'
      }} source={require('../../assets/pokeball.png')}>
        <View style={styles.header}>
          <Text style={[styles.text, { fontSize: 35 }]}>{currentPokemon.name}</Text>
          <Text style={styles.text}>{currentPokemon.id}</Text>
        </View>
        <View style={styles.topContainer}>
          <View style={styles.column}>
            <TouchableOpacity onPress={() => handleDecrement()}>
              <Icon size={50} color="white" name="angle-left" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDecrementByAmount(10)}>
              <Icon size={50} color="white" name="angle-double-left" />
            </TouchableOpacity>
          </View>
          <View>
            {
              loading
                ? <ActivityIndicator color={'white'} size={160} />
                : <Image style={styles.image} source={{ uri: currentPokemon.image }} />
            }
          </View>

          <View style={styles.column}>
            <TouchableOpacity onPress={() => handleIncrement()}>
              <Icon size={50} color="white" name="angle-right" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIncrementByAmount(10)}>
              <Icon size={50} color="white" name="angle-double-right" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bodyInfoContainer}>
            <View>
              <Text style={styles.smallText}>Height:</Text>
              <Text style={styles.smallText}>{currentPokemon.height?.toString().slice(0, -1) + "." + currentPokemon.height?.toString().slice(-1)} m</Text>
            </View>
            <View style={{ height: '70%', width: 3, backgroundColor: 'white' }} />
            <View>
              <Text style={styles.smallText}>Weight:</Text>
              <Text style={styles.smallText}>{currentPokemon.weight?.toString().slice(0, -1) + "." + currentPokemon.weight?.toString().slice(-1)} kg</Text>
            </View>
          </View >
          <View style={styles.typesContainer}>
            <View style={[styles.typeContainer, { backgroundColor: `${currentPokemon.color}` }]}>
              <Text style={styles.smallText}>{currentPokemon.type}</Text>
            </View>
            {
              currentPokemon.typeTwo &&
              <View style={[styles.typeContainer, { backgroundColor: `${currentPokemon.colorTwo}` }]}>
                <Text style={styles.smallText}>{currentPokemon.typeTwo}</Text>
              </View>
            }
          </View>
          <View style={{ margin: 30 }}>
            <View style={styles.row}>
              <View style={{ width: '40%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'right', paddingRight: 10 }]}>Hp</Text>
              </View>
              <View style={styles.lineStats} />
              <View style={{ width: '10%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'center', }]}>{currentPokemon.stats?.hp}</Text>
              </View>
              <View style={[styles.loadingBarContainer,]}>
                <View style={
                  [styles.fillerBarContainer,
                  {
                    width: `${porcentageStats.hp.toString() + '%'}`,
                    backgroundColor: `${currentPokemon.color}`
                  }]}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ width: '40%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'right', paddingRight: 10 }]}>Attack</Text>
              </View>
              <View style={styles.lineStats} />
              <View style={{ width: '10%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'center', }]}>{currentPokemon.stats?.attack}</Text>
              </View>
              <View style={[styles.loadingBarContainer,]}>
                <View style={
                  [styles.fillerBarContainer,
                  {
                    width: `${porcentageStats.attack.toString() + '%'}`,
                    backgroundColor: `${currentPokemon.color}`
                  }]}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ width: '40%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'right', paddingRight: 10 }]}>Defense</Text>
              </View>
              <View style={styles.lineStats} />
              <View style={{ width: '10%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'center', }]}>{currentPokemon.stats?.defense}</Text>
              </View>
              <View style={[styles.loadingBarContainer,]}>
                <View style={
                  [styles.fillerBarContainer,
                  {
                    width: `${porcentageStats.defense.toString() + '%'}`,
                    backgroundColor: `${currentPokemon.color}`
                  }]}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ width: '40%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'right', paddingRight: 10 }]}>Special Attack</Text>
              </View>
              <View style={styles.lineStats} />
              <View style={{ width: '10%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'center', }]}>{currentPokemon.stats?.specialAttack}</Text>
              </View>
              <View style={[styles.loadingBarContainer,]}>
                <View style={
                  [styles.fillerBarContainer,
                  {
                    width: `${porcentageStats.specialAttack.toString() + '%'}`,
                    backgroundColor: `${currentPokemon.color}`
                  }]}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ width: '40%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'right', paddingRight: 10 }]}>Special Defense</Text>
              </View>
              <View style={styles.lineStats} />
              <View style={{ width: '10%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'center', }]}>{currentPokemon.stats?.specialDefense}</Text>
              </View>
              <View style={[styles.loadingBarContainer,]}>
                <View style={
                  [styles.fillerBarContainer,
                  {
                    width: `${porcentageStats.specialDefense.toString() + '%'}`,
                    backgroundColor: `${currentPokemon.color}`
                  }]}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ width: '40%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'right', paddingRight: 10 }]}>Speed</Text>
              </View>
              <View style={styles.lineStats} />
              <View style={{ width: '10%' }}>
                <Text style={[styles.verySmallText, { textAlign: 'center', }]}>{currentPokemon.stats?.speed}</Text>
              </View>
              <View style={[styles.loadingBarContainer,]}>
                <View style={
                  [styles.fillerBarContainer,
                  {
                    width: `${porcentageStats.speed.toString() + '%'}`,
                    backgroundColor: `${currentPokemon.color}`
                  }]}
                />
              </View>
            </View>

          </View>
        </View>
      </ImageBackground >
    </View >

  )
}

const styles = StyleSheet.create({
  container: {
    height: `100%`,
  },
  header: {
    height: '10%',
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  bottomContainer: {
    height: '60%',
    width: '100%',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize'
  },
  smallText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  verySmallText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  image: {
    width: 160,
    height: 160,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  bodyInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#b6b6b6fc',
    width: '90%',
    height: '20%',
    borderRadius: 40,
  },
  typesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  typeContainer: {
    height: 35,
    fontWeight: 'bold',
    width: 130,
    margin: 10,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingBarContainer: {
    width: '50%',
    height: 10,
    backgroundColor: '#b6b6b6fc',
    borderRadius: 40,
  },
  fillerBarContainer: {
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  lineStats: {
    height: '100%',
    width: 1,
    backgroundColor: '#b6b6b6fc'
  }
});

export default PokemonList;