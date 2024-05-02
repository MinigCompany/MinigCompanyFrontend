import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { Alert} from 'react-native';
import { BASE_URL } from '../src/config';
import { NavigationContainer, useNavigation } from "@react-navigation/native"; 

import { Navigation } from "../Navigation";
import * as RootNavigation from '../RootNavigation';
export const AuthContext = createContext();

function useCounter() {
    // Bien: nivel superior en un componente de función
  //  const navigation = useNavigation();
   //const [navigation] = useNavigation({});
   return console.log("mi token");
 }
 function createTwoButtonAlert (){
    Alert.alert(
      "Campos Inválidos",
      "Los credenciales están vacíos o son incorrectos",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  )};

  function createTwoButtonAlertRegistro (mensaje){
    Alert.alert(
      "Campos Inválidos",
      mensaje,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  )};
  function createRegistro (mensaje){
    Alert.alert(
      "Cuenta Creada",
      mensaje,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  )};

export const AuthProvider = ({children}) => {
    
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = props => (useNavigation());
    // Registro
    const registerM = (nombres, apellidos, telefono, correo, contrasenia,contraseniaConfir) =>{
      setIsLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            createTwoButtonAlertRegistro("Correo electrónico inválido");
            setIsLoading(false);
            return;
        }
        if (contrasenia.length < 8) {
            createTwoButtonAlertRegistro("La contraseña debe tener al menos 8 caracteres");
            setIsLoading(false);
            return;
        }
        if(contraseniaConfir!=contrasenia){
          createTwoButtonAlertRegistro("Las contraseñas no coinciden!!");
          setIsLoading(false);
          return;
        }
        axios.post(`${BASE_URL}/Autenticacion/Registro`,{
            nombres, apellidos, telefono, correo, contrasenia
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            const usuario = AsyncStorage.setItem('userData', JSON.stringify(userInfo));
            setIsLoading(false);
            if (usuario!=null){
                console.log("mi usuario", usuario);
                createRegistro("Tu usuario se a registrado con éxito");
                RootNavigation.navigate('Login');
            }
        }).catch(e =>{
            createTwoButtonAlertRegistro("Los credenciales están vacíos o son incorrectos");
            console.log(`error en registro ${e}`);
            setIsLoading(false);
        })
    };

    // Login
    const loginM = async (correo, contrasenia) =>{
      setIsLoading(true);
        axios.post(`${BASE_URL}/Autenticacion/login`,{
            correo,
            contrasenia
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo.status+"Hola");
            setUserInfo(userInfo);
            const token = AsyncStorage.setItem('userData', JSON.stringify(userInfo))
            if (userInfo.status){
                console.log("mi token", token);
                //navigation.navigate('Cuenta creada');Cuenta creada
                RootNavigation.navigate('Inventario');
            }
            setIsLoading(false);

        }).catch(e => {
            createTwoButtonAlert();
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    }
    const checkUserAuthentication = async () =>{        
    }


    //Cerrar sesion
    const closeSession = async () =>{
    }
    //
    return(
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                loginM,
                registerM,
                closeSession,
                checkUserAuthentication
            }}>
            {children}
        </AuthContext.Provider>
        );
}