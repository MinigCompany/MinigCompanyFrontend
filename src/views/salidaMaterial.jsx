import react,  {useContext, useState,useEffect} from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/stylesFormularios';
import { Dropdown } from 'react-native-element-dropdown';
const SalidaMaterial = () => {
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
  //ComboBox
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
];
const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);
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
        <Text style={styles.textoBien} >Registrar Salida de Material</Text>
        <Text style={styles.textoSecundario}>Ingrese los datos para la salida del material a los trabajadores</Text>
        <View >
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Seleccionar Material' : '...'}
            searchPlaceholder="Buscar..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
            />
        </View>
        <Text style={styles.textoSecundario} >Detalles de la salida</Text>
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
                placeholder="Nombre del trabajador"
                onChangeText={text => setNombres(text)}
                />
        <TextInput style={styles.txtInput} 
                value={Telefono}
                placeholder="Cantidad"
                keyboardType='number-pad'
                onChangeText={text => setTelefono(text)}
                />
        <TextInput style={styles.txtInput} 
                value={Email}
                placeholder="Observación"
                onChangeText={text => setEmail(text)}
                />
        <TextInput style={styles.txtInput} 
                value={Email}
                placeholder="Detalle"
                onChangeText={text => setEmail(text)}
                />
        <View  style={[styles.VistaBtnSeguidos,{marginTop:30}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Registros')}
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
export default SalidaMaterial;