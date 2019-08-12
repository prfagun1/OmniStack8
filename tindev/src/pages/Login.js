import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

//KeyboardAvoidingView é para subir a caixa de texto au digitar, somente para o IOS
//Platform identifica se é IOS ou Android

import api from '../services/api';

//O React identifica a melhor resolução do logo de acordo com o celular se a imagem tiver @2x, etc no fim
//A imagem recisa estar em png

import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [user, setUser] = useState('');

//Vazio indica que somente subira em tela uma vez
//Caso saia da aplicação e volte ou atualize busca o usuário gravado localmente
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user } )
            }
        })
    }, [])

    async function handleLogin() {
//para escrever no log
//console.log(user);

        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

//somente aceita string ou numérico
        await AsyncStorage.setItem('user', _id);

        console.log(_id);

        navigation.navigate('Main', { user: _id });

    }

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image source={logo} />
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite o seu usuário no Github"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    
    input:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

