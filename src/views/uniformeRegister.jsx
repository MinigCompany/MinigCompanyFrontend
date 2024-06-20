import react,  {useContext, useState,useEffect,useCallback} from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Modal,FlatList, Alert } from 'react-native';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';
import Icons from 'react-native-vector-icons/Fontisto';
import styles from '../styles/stylesFormularios';
import {saveUniform,updateUniform} from "../services/uniformServices";
import {dataCategoriesDroUniforme} from "../services/categoryServices";
import {dataUDMDroUniform} from "../services/udmServices";
let esNuevo=true;
const EntradaUniforme = ({route}) => {
  let nombreR;
  let cantidadR;
  let detalleR;
  let categoriaR;
  let udmR;
  if(route.params.uniformeR!=null){
    esNuevo=false;
    nombreR=route.params.uniformeR.nombreUniforme;
    cantidadR=route.params.uniformeR.cantidad;
    detalleR=route.params.uniformeR.detalle;
    categoriaR=route.params.uniformeR.categoria;
    udmR=route.params.uniformeR.udm;
  }
  const fetchCategorias = async () => {
    const data = await dataCategoriesDroUniforme();
    if(data){
      setAllCategorias(data);
    }
  };
  const fetchUDM = async () => {
    const data = await dataUDMDroUniform();
    if(data){
      setAllUdm(data);
    }
  };
  const navigation = useNavigation();
  const [detalle, setDetalle] = useState(detalleR);
  const [Nombre, setNombre] = useState(nombreR);
  const [cantidad, setCantidad] = useState(cantidadR==null?null:cantidadR+"");
  const [categoria, setCategoria] = useState(categoriaR);
  const [udm, setUdm] = useState(udmR);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusUdm, setIsFocusUdm] = useState(false);
  const [allCategorias, setAllCategorias] = useState([]);
  const [allUdm, setAllUdm] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [textoModal, setTextoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  useFocusEffect(
    useCallback(() => {
      fetchCategorias();
      fetchUDM();
    }, [])
  
  );
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
  //Guardar Uniforme
  let validar=()=>{
    if(esNuevo){
      if(cantidad==null || Nombre==null || detalle==null || categoria==null || textFechaIn== null || udm==null){
        Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
        return;
      }else{
        let uniforme = {
          nombreUniforme:Nombre,
          cantidad:parseInt(cantidad),
          udm:udm,
          detalle:detalle,
          categoria:categoria,
          fecha:textFechaIn,
        }
        saveUniform(uniforme);
        setTituloModal("Nueva Prenda-Uniforme");
        setTextoModal("La nueva prenda ha sido guardado correctamente")
        setModalVisible(true);
      }
    }else{
      let uniforme = {
        uniforme_ID:route.params.uniformeR._id,
        nombreUniforme:Nombre,
        cantidad:parseInt(cantidad),
        udm:udm,
        detalle:detalle,
        categoria:categoria,
        fecha:textFechaIn,
      }
      updateUniform(uniforme);
      esNuevo=true;
      setTituloModal("Prenda-Uniforme Actualizada");
      setTextoModal("La prenda ha sido actualizada correctamente")
      setModalVisible(true);
    }
  }
  return(
    <View style={styles.container}>
        <Text style={styles.textoBien} >Nueva Prenda de Uniforme</Text>
        <Text style={styles.textoSecundario}>Ingrese los datos de la prenda del uniforme</Text>
        <TouchableOpacity style={styles.txtInputFecha} title="Fecha Ingreso" onPress={showDatePicker}>
                <View style={styles.VistaBtnSeguidos}>
                <Icons  name='date' style={styles.circleIcon}/>
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
                value={Nombre}
                placeholder="Ingresar nombre del uniforme"
                onChangeText={text => setNombre(text)}
                />
        <TextInput style={styles.txtInput} 
                value={detalle}
                placeholder="Detalle"
                onChangeText={text => setDetalle(text)}
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
                value={cantidad}
                placeholder="Cantidad"
                keyboardType='number-pad'
                onChangeText={text => setCantidad(text)}
                />
        <Dropdown
          style={[styles.dropdown,{backgroundColor:"#FFFFFF",borderBottomWidth: 1,marginTop:10}, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={allCategorias}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Categoria' : '...'}
          searchPlaceholder="Buscar..."
          value={categoria}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategoria(item.value);
              setIsFocus(false);
          }}
        />
        <View  style={[styles.VistaBtnSeguidos,{marginTop:30}]}>
          <TouchableOpacity onPress={() => {prendas=[];navigation.navigate('Uniformes');}}
              style={styles.BotonCancelar}>
              <Text style={[styles.colorTxtBtn,{color:"#000000"}]}>Cancelar</Text>
          </TouchableOpacity> 
          <TouchableOpacity
              style={styles.BotonGuardar}
              onPress={validar}>
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
        <Icons  name='check' style={styles.circleIconCheck}/>
        <Text style={styles.textoSecundario}>{textoModal}</Text>
        <TouchableOpacity
            style={[styles.button, styles.buttonClose,{backgroundColor:"#05AB48",marginTop:10}]}
            onPress={() => {
              setModalVisible(!modalVisible);
              esNuevo=true;
              navigation.navigate('Uniformes');
              route.params.fnRefresh();}}>
            <Text style={styles.colorTxtBtn}>Entiendo</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>   
  </View>
  )
}
export default EntradaUniforme;