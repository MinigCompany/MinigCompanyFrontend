import react,  {useContext, useState,useEffect} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { CheckBox, Icon } from '@rneui/themed';
import styles from '../styles/stylesLogin';
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [check1, setCheck1] = useState(false);
    const {loginM} = useContext(AuthContext);
  	return (
      <View style={styles.container}>
      <View>
          <Image style={styles.image}
              source={require('../../assets/Logo.png')}></Image>
          <View style={styles.containerTwo}>
            <Text style={styles.textoBien} >Iniciar Sesión</Text>
            <Text style={styles.TextoIngr} >Inicie sesión en su cuenta para continuar el proceso</Text>
            <View style={styles.txtInput}>
                <TextInput  
                    value={username}
                    placeholder="Ingrese su correo electrónico"
                    onChangeText={text => setUsername(text)}
                    />
            </View>
            <View style={styles.txtInput}>
                <TextInput secureTextEntry={true} 
                    value={password}
                    placeholder="Ingrese su contraseña"
                    onChangeText={text => setPassword(text)}
                    />
            </View>
            <View style={styles.IconText}> 
            <CheckBox
              center
              title="Recordar Cuenta"
              checked={check1}
              onPress={() => setCheck1(!check1)}
            />
            </View>
            <TouchableOpacity onPress={() =>{loginM(username, password)}}
                style={styles.colorBtn}>
            <Text style={styles.colorTxtBtn}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.colorTxtBtnOlvidar}>¿Olvidó su contraseña?</Text>
            </TouchableOpacity>
            <Text style={styles.colorTxtBtnOlvidar}>o</Text>
            <View style={styles.IconText}>
                <Text style={{right: -22,}}>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.colorTxtBtnRegistro}>Registrarse</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
  </View>
    )
}


export default Login;