import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { Alert} from 'react-native';
import { AUTH_URL } from '../src/config';
import { NavigationContainer, useNavigation } from "@react-navigation/native"; 
import * as RootNavigation from '../RootNavigation';
export const AuthContext = createContext();

let valor=true;
function useCounter() {
   return console.log("mi token");
 }
 function createTwoButtonAlert (){
    Alert.alert(
      "Campos Inválidos",
      "Usuario o contraseña incorrectos",
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
        axios.post(`${AUTH_URL}/Autenticacion/Registro`,{
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
            if(e.response.status===400){
            createTwoButtonAlertRegistro("El correo electronico ya se encuentra registrado");
            setIsLoading(false);
            }else{
            createTwoButtonAlertRegistro("Problema al registrar al usuario");
            setIsLoading(false);
            }
            
        })
    };

    // Login
    const loginM = async (correo, contrasenia) =>{
      setIsLoading(true);
        axios.post(`${AUTH_URL}/Autenticacion/login`,{
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
                RootNavigation.navigate('InventarioStack');
            }
            setIsLoading(false);

        }).catch(e => {
            createTwoButtonAlert();
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    }
    
    const checkUserAuthentication = async () =>{ 
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            //console.log('Usuario autenticado');
            if(valor){
              RootNavigation.navigate('InventarioStack');
              valor=false;
            }
        } else {
            RootNavigation.navigate('Login');
            //console.log('Usuario no autenticado');
        }
      } catch (error) {
          console.error('Error al verificar la autenticación:', error);
      }     
    }


    //Cerrar sesion
    const closeSession = async () =>{
      try {
        await AsyncStorage.removeItem('userData');
        //RootNavigation.navigate('Login');
        valor=true;
        console.log('Cierre de sesión exitoso');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
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
                checkUserAuthentication,
            }}>
            {children}
        </AuthContext.Provider>
        );
}