import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'


interface itemProps{
    data:{
        id: string;
        product_id: string;
        name: string;
        amount: number | string;
    };
    deleteItem: (item_id: string) => void;
}

export default function ListItem({ data, deleteItem }: itemProps) {

    function handleDeleteItem(){
        deleteItem(data.id);
    }

  return (
    <View style={styles.container}>
        <Text style={styles.item}> {data.amount} - {data.name} </Text>

        <TouchableOpacity onPress={ handleDeleteItem }>
            <Feather name='trash-2' color='#fd3939' size={25} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#131313',
        flex: 1,
        alignContent:'center',
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#8a8a8a8a'
    },

    item:{
        color: '#FFF',
        fontSize: 17
    }
})