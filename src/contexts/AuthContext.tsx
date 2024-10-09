import React, { useState, createContext, ReactNode, useEffect} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

type AuthContextData= {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}


export const AuthContext = createContext({} as AuthContextData);


export default function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user.name;


    useEffect(() => {
        
        async function getUser(){

            const userInfo = await AsyncStorage.getItem('@pizzaria');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false);

        }

        getUser();

    }, [])

    async function signIn({ email, password }: SignInProps){
        setLoadingAuth(true);

        try{

            const response = await api.post('/session', {
                email,
                password
            })

            const { id, name, token } = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@pizzaria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token,
            })

            setLoadingAuth(false);

        }catch(err: any){
            console.log("Erro ao acessar!", err);

            if (err.response) {
                console.log("Status do erro:", err.response.status); // Log do status do erro
                console.log("Dados do erro:", err.response.data); // Log dos dados do erro
    
                // Exibir uma mensagem específica dependendo do status HTTP
                if (err.response.status === 400) {
                    Alert.alert('Erro', 'Email ou senha incorretos!');
                } else {
                    Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
                }
            } else {
                // Erro genérico (pode ser de conexão ou outro)
                Alert.alert('Erro', 'Ocorreu um erro de comunicação. Verifique sua conexão.');
            }
            setLoadingAuth(false);
        }
    }


    async function signOut(){
        await AsyncStorage.clear()
        .then( () => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }


    return(
        <AuthContext.Provider value={{ 
            user,
            isAuthenticated, 
            signIn, 
            signOut, 
            loading, 
            loadingAuth 
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}