import react,  {useContext, useState,useEffect} from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/stylesFormularios';
const Material = () => {
    const navigation = useNavigation();
    const [Telefono, setTelefono] = useState(null);
    const [Nombres, setNombres] = useState(null);
  const [Apellidos, setApellidos] = useState(null);
  const [Email, setEmail] = useState(null);
  const [passwordConfir, setpasswordConfir] = useState(null);
  const [password, setpassword] = useState(null);
//almacenar fecha
  const [textFechaIn, setTextIn] = useState(new Date);
  //Seleccionar Fecha
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
   const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
      const handleConfirm = (date) => {
        console.warn(date);
        setTextIn(date);
        hideDatePicker();
      };
      const valor1 = textFechaIn.toLocaleDateString();
  return(
    <View style={styles.container}>
        <Text style={styles.textoBien} >Nuevo Material</Text>
        <Text style={styles.textoSecundario}>Ingrese los datos del nuevo material</Text>
        <TouchableOpacity style={styles.txtInputFecha} title="Fecha Ingreso" onPress={showDatePicker}>
                <View style={styles.VistaBtnSeguidos}>
                <Icons  name='home' style={styles.circleIcon}/>
              <Text style={styles.textFecha}>Fecha: {valor1} </Text>
                </View>
        </TouchableOpacity> 
        <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
        <TextInput style={styles.txtInput} 
                value={Nombres}
                placeholder="Ingresar nombre del material"
                onChangeText={text => setNombres(text)}
                />
        <TextInput style={styles.txtInput} 
                value={Apellidos}
                placeholder="Precio(ex:0.25)"
                onChangeText={text => setApellidos(text)}
                /> 
        <TextInput style={styles.txtInput} 
                value={Telefono}
                placeholder="Cantidad"
                keyboardType='number-pad'
                onChangeText={text => setTelefono(text)}
                />
        <TextInput style={styles.txtInput} 
                value={Email}
                placeholder="Detalle"
                onChangeText={text => setEmail(text)}
                />
        <TextInput style={styles.txtInput} 
                value={Email}
                placeholder="Detalle"
                onChangeText={text => setEmail(text)}
                />
        <View  style={[styles.VistaBtnSeguidos,{marginTop:30}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Inventario')}
              style={styles.BotonCancelar}>
              <Text style={[styles.colorTxtBtn,{color:"#000000"}]}>Cancelar</Text>
          </TouchableOpacity> 
          <TouchableOpacity
              style={styles.BotonGuardar}>
              <Text style={styles.colorTxtBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>     
  </View>
  )
}
export default Material;