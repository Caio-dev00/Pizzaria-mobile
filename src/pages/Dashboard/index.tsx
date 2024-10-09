import React, {useContext, useState} from 'react';
import { Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StackParamsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';


export default function Dashboard() {

  const [ table, setTable ] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const { signOut } = useContext(AuthContext)


  async function handleOpenTable(){
    if(table === ''){
      return;
    }

    const response = await api.post('/order', {
      table: Number(table)
    })

    const { id } = response.data;

    navigation.navigate('Order', { number: table, order_id: id })

    setTable('');
    
    
  }
  

  return (
    <SafeAreaView  style={styles.container}>

        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sair</Text>
        </TouchableOpacity>

        <Text  style={styles.title}> Novo pedido </Text>
        <TextInput
          style={styles.input}
          placeholder='Numero da mesa'
          placeholderTextColor="#949494"
          keyboardType='numeric'
          value={table}
          onChangeText={setTable}
        />

        <TouchableOpacity style={styles.button} onPress={handleOpenTable}>
          <Text style={styles.buttonText}> Abrir mesa </Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1a1a1a'
  },

  title:{
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 24
  },

  input:{
    width: '95%',
    height: 60,
    backgroundColor: '#131313',
    padding: 15,
    borderRadius: 4,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20
  },

  button: {
    width: '95%',
    height: 50,
    backgroundColor: '#fd3939',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },

  signOutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#ff5555',
    borderRadius: 5,
  },

  signOutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }

})