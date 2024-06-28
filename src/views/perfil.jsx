import React,  {useContext, useState,useEffect, useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import { Icon } from 'react-native-elements';
import { AuthContext } from "../../context/AuthContext";

const Perfil = ({route}) => {
    const [nombreUser, setNombreUser] = useState();
    const [ApellidoUser, setApellidoUser] = useState();
    const {closeSession,checkUserAuthentication} = useContext(AuthContext);
    useFocusEffect(
        useCallback(() => {
            getUser();
            const intervalId = setInterval(() => {
                checkUserAuthentication();
            }, 2000);
        }, [])
    );
    const getUser = async () =>{   
        try {
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            const aux =  JSON.parse(userData);
            //console.log("Usuario autenticado: "+ aux.usuario.nombre);
            setNombreUser(aux.usuario.nombre);
            setApellidoUser(aux.usuario.apellido)
          } 
        } catch (error) {
            console.error('Error al obtener:', error);
        }     
    }
    return(
        <View style={styles.container}>
            <View style={[styles.mainContainer,{flex: 1 }]}>
                <Text style={styles.txtInfoUser}>Hola, {nombreUser} {ApellidoUser}</Text>
                <Text style={styles.txtBien}>Bienvenida a Mining Company</Text>
                <View style={styles.VistaInventario}>
                    <Text style={styles.txtInventario}>Perfil</Text>
                </View>
                <View style={styles.VistaCodigo}>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:50,backgroundColor:"#F74747"}]} onPress={closeSession}>
                            <View style={styles.contenedorTexto}>
                                <Text style={styles.txtNewMaterial}>Cerrar Sesión</Text>
                            </View>
                            <View style={styles.contenedorImagen}>
                                <Icon name="close" type='font-awesome' size={25} color="#000000" />
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}
export default Perfil;