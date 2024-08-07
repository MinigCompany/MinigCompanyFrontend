import react,  {useContext, useState,useEffect, useCallback} from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Fontisto';
import styles from '../styles/stylesFormularios';
import { Dropdown } from 'react-native-element-dropdown';
import {dataMaterialDroCantidad} from "../services/materialServices";
import {saveSalida} from "../services/InputServices";
import {dataUDMDro} from "../services/udmServices";
import {dataTrabajadoresDro} from '../services/trabajadoresServices';
let esNuevo=true;
const SalidaMaterial = ({route}) => {
  const navigation = useNavigation();
  const [cantidad, setCantidad] = useState(null);
  const [observacion, setObservacion] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [udm, setUdm] = useState(null);
  const [allUdm, setAllUdm] = useState([]);
  const [isFocusUdm, setIsFocusUdm] = useState(false);
  const [trabajadores, setTrabajadores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [textoModal, setTextoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  //variables de estado para el Dropdown
  const [value, setValue] = useState(null);
  const [valueNombre, setValueNombre] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusDow, setIsFocusDow] = useState(false);
  //almacenar fecha
  const [textFechaIn, setTextIn] = useState(new Date);
  //Seleccionar Fecha
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    useFocusEffect(
      useCallback(() => {
          fetchMaterial();
          fetchUDM();
          fetchTrabajadores();
      }, [])
  );
  const fetchTrabajadores = async () => {
    const data = await dataTrabajadoresDro();
    if(data){
      setTrabajadores(data);
    }
  };
  const fetchMaterial = async () => {
    const data = await dataMaterialDroCantidad();
    if(data){
        setMaterials(data);
    }
  };
  const fetchUDM = async () => {
    const data = await dataUDMDro();
    if(data){
      setAllUdm(data);
    }
  };
  let validar=()=>{
    if(esNuevo){
      if(value!= null){
        if(cantidad==null || valueNombre==null || observacion==null || textFechaIn== null || udm==null ||
          cantidad=="" || valueNombre=="" || observacion=="" || textFechaIn== "" || udm==""
        ){
          Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
          return;
        }else{
          let salida = {
            idmaterial:value,
            nombreTrabajador:valueNombre,
            cantidad:parseInt(cantidad),
            udm:udm,
            observacion:observacion,
            fecha:textFechaIn
          }
          saveSalida(salida);
          setTituloModal("Salida de material");
          setTextoModal("El registro de salida de material ha sido guardado correctamente")
          setModalVisible(true);
        }
      }else{
        Alert.alert("Info.","Debe de elegir al menos un material");
      }
    }
  }

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
              style={[styles.dropdown,{marginTop:10}, isFocus && { borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={materials}
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
                <Icon  name='date' style={styles.circleIcon}/>
              <Text style={styles.textFecha}>Fecha: {valor1} </Text>
                </View>
        </TouchableOpacity> 
        <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
        <View style={[styles.viewTrabajador,{padding:10}]}>
            <Dropdown
              style={[styles.dropdownTra, isFocusDow && { borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={trabajadores}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusDow ? 'Trabajadores' : '...'}
              searchPlaceholder="Buscar..."
              value={valueNombre}
              onFocus={() => setIsFocusDow(true)}
              onBlur={() => setIsFocusDow(false)}
              onChange={item => {
                  setValueNombre(item.value);
                  setIsFocusDow(false);
              }}
            />
            <TouchableOpacity style={styles.btnTrabajador} title="Trabajador" onPress={() => navigation.navigate('NewTrabajador')} >
                <Icon  name='male' style={[styles.circleIcon,{fontSize:20}]}/>
            </TouchableOpacity> 
        </View>
        <TextInput style={styles.txtInput} 
                value={cantidad}
                placeholder="Cantidad"
                keyboardType='number-pad'
                onChangeText={text => setCantidad(text)}
                />
        <Dropdown
          style={[styles.dropdown,{backgroundColor:"#FFFFFF",borderBottomWidth: 1,marginTop:10}, isFocusUdm && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={allUdm}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusUdm ? 'Unidad de Medida' : '...'}
          searchPlaceholder="Buscar..."
          value={udm}
          onFocus={() => setIsFocusUdm(true)}
          onBlur={() => setIsFocusUdm(false)}
          onChange={item => {
            setUdm(item.value);
              setIsFocusUdm(false);
          }}
        />
        <TextInput style={styles.txtInput} 
                value={observacion}
                placeholder="Observación"
                onChangeText={text => setObservacion(text)}
                />
        <View  style={[styles.VistaBtnSeguidos,{marginTop:30}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Registros')}
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
        <Text style={[styles.modalText,{color:"#05AB48",}]}>{tituloModal}</Text>
        <Icon  name='check' style={styles.circleIconCheck}/>
        <Text style={styles.textoSecundario}>{textoModal}</Text>
        <TouchableOpacity
            style={[styles.button, styles.buttonClose,{backgroundColor:"#05AB48",marginTop:10}]}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('Registros');}}>
            <Text style={styles.colorTxtBtn}>Entiendo</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>     
  </View>
  )
}
export default SalidaMaterial;