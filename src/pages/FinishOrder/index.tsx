import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';


type RouteDetailParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  }
}

type finishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {
  const route = useRoute<finishOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();


  async function handleFinish(){
    try{

      await api.put('/order/send', {
        order_id: route.params?.order_id
      })

      navigation.popToTop();

    }catch(err){
      console.log("ERRO AO FINALIZAR, tente mais tarde!")
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
      <Text style={styles.table}>Mesa {route.params?.number}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.txtButton}>Finalizar pedido</Text>
        <Feather size={20} name="shopping-cart" color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1a1a1a',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    alert:{
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12
    },

    table:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12
    },

    button:{
        backgroundColor: '#3ffda3',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        width: '65%',
        height: 40,
        borderRadius: 4
    },
    txtButton:{
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#1a1a1a'
    }
})