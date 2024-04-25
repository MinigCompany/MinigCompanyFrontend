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
    const register = (nombre, pais, ciudad, email, universidad, password) =>{
    };

    // Login
    const login = async (email, password) =>{
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
                login,
                register,
                closeSession,
                checkUserAuthentication
            }}>
            {children}
        </AuthContext.Provider>
        );
}