import react,  {useContext, useState,useEffect, useCallback} from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesFormularios';
import Icons from 'react-native-vector-icons/Fontisto';
import {saveTrabajador} from '../services/trabajadoresServices';
let esNuevo=true;
const Trabajador = ({route}) => {

    const navigation = useNavigation();
  const [telefono, setTelefono] = useState(null);
  const [nombres, setNombres] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [apellidos, setApellidos] = useState(null);
  const [email, setEmail] = useState(null);
  const [edad, setEdad] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  let validar=()=>{
    if(esNuevo){
        if(telefono==null || nombres==null || cedula==null || apellidos==null || email==null || edad== null ||
            telefono=="" || nombres=="" || cedula=="" || apellidos=="" || email=="" || edad==""
        ){
            Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
            return;
        }else{
            let trabajador = {
                cedula:cedula,
                nombres:nombres,
                apellidos:apellidos,
                telefono:telefono,
                correo:email,
                edad:parseInt(edad)
            }
            saveTrabajador(trabajador);
            setModalVisible(true);
        }
    }
  }
  return(
    <View style={styles.container}>
        <Text style={styles.textoBien} >Registrar nuevo trabajador</Text>
        <TextInput style={styles.txtInput} 
                value={cedula}
                placeholder="Ingresar Cédula"
                onChangeText={text => setCedula(text)}
                />
        <TextInput style={styles.txtInput} 
                value={nombres}
                placeholder="Ingresar Nombres"
                onChangeText={text => setNombres(text)}
                />
        <TextInput style={styles.txtInput} 
                value={apellidos}
                placeholder="Ingresar Apellidos"
                onChangeText={text => setApellidos(text)}
                /> 
        <TextInput style={styles.txtInput} 
                value={edad}
                placeholder="Ingrese su edad"
                keyboardType='number-pad'
                onChangeText={text => setEdad(text)}
                />
        <TextInput style={styles.txtInput} 
                value={telefono}
                placeholder="Ingrese su número telefónico"
                keyboardType='number-pad'
                onChangeText={text => setTelefono(text)}
                />
        
        <TextInput style={styles.txtInput} 
                value={email}
                placeholder="Ingrese su correo electrónico"
                onChangeText={text => setEmail(text)}
                />   
        <View  style={[styles.VistaBtnSeguidos,{marginTop:30}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}
              style={styles.BotonCancelar}>
              <Text style={[styles.colorTxtBtn,{color:"#000000"}]}>Cancelar</Text>
          </TouchableOpacity> 
          <TouchableOpacity
              style={styles.BotonGuardar} onPress={validar}>
              <Text style={styles.colorTxtBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal se cerro.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={[styles.modalText,{color:"#05AB48",}]}>Nuevo Trabajador</Text>
                <Icons  name='check' style={styles.circleIconCheck}/>
                <Text style={styles.textoSecundario}>El nuevo trabajador ha sido guardado correctamente</Text>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose,{backgroundColor:"#05AB48",marginTop:10}]}
                    onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.goBack();
                    esNuevo=true;}}>
                    <Text style={styles.colorTxtBtn}>Entiendo</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>       
  </View>
  )
}
export default Trabajador;