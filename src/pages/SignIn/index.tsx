import React, { useState, useContext } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);
  
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");


  async function handleLogin(){
    
    if(email === '' || password === ''){

      alert("Preencha os campos corretamente!")
      setEmail('')
      setPassword('')
      return;
    }

    await signIn({ email, password })
      setEmail('')
      setPassword('')
  }



  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <View style={styles.areaInput}>
          <TextInput
            style={styles.input}
            placeholder='Digite seu email...'
            placeholderTextColor="#949494"
            value={email}
            onChangeText={ setEmail }
          />

          <TextInput
            style={styles.input}
            placeholder='Sua senha...'
            secureTextEntry={true}
            placeholderTextColor="#949494"
            value={password}
            onChangeText={ setPassword }
          />

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleLogin}>
            { loadingAuth ? (
              <ActivityIndicator size={16} color="#FFF"/>
            ): (
              <Text style={styles.btnText}> Acessar </Text>
            ) }
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020'
  },

  logo: {
    marginBottom: 18,
  },

  areaInput: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14
  },

  input: {
    width: '95%',
    height: 40,
    backgroundColor: '#1f1f1f',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#FFF'
  },

  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#fd3939',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },

  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  }
})