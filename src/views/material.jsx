import react,  {useContext, useState,useEffect,useCallback} from "react";
import { Text, View, TextInput, TouchableOpacity, Alert,Modal } from 'react-native';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/Fontisto';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../styles/stylesFormularios';
import {saveMaterial,updateMaterial} from "../services/materialServices";
import {dataCategoriesDro} from "../services/categoryServices";
import {dataUDMDro} from "../services/udmServices";
let esNuevo=true;
const Material = ({route}) => {
  let nombreR;
  let cantidadR;
  let precioR;
  let detalleR;
  let categoriaR;
  let udmR;
  const fetchCategorias = async () => {
    const data = await dataCategoriesDro();
    if(data){
      setAllCategorias(data);
    }
  };
  const fetchUDM = async () => {
    const data = await dataUDMDro();
    if(data){
      setAllUdm(data);
    }
  };
  const navigation = useNavigation();
  const [cantidad, setCantidad] = useState(cantidadR==null?null:cantidadR+"");
  const [Nombres, setNombres] = useState(nombreR);
  const [precio, setPrecio] = useState(precioR);
  const [detalle, setDetalle] = useState(detalleR);
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
        //console.warn(date);
        setTextIn(date);
        hideDatePicker();
      };
      const valor1 = textFechaIn.toLocaleDateString();
  
  let validar=()=>{
    if(esNuevo){
      if(cantidad==null || Nombres==null || precio==null || detalle==null || categoria==null || textFechaIn== null || udm==null ||
        cantidad=="" || Nombres=="" || precio=="" || detalle=="" || categoria=="" || textFechaIn== "" || udm==""
      ){
        Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
        return;
      }else{
        let material = {
          nombreMaterial:Nombres,
          precio:parseFloat(precio),
          cantidad:parseInt(cantidad),
          udm:udm,
          detalle:detalle,
          categoria:categoria,
          fecha:textFechaIn
        }
        saveMaterial(material);
        setTituloModal("Nuevo Material");
        setTextoModal("El nuevo material ha sido guardado correctamente")
        setModalVisible(true);
      }
    }else{
      esNuevo=true;
      setTituloModal("Material Actualizada");
      setTextoModal("El material ha sido actualizado correctamente")
      setModalVisible(true);
    }
  }
  return(
    <View style={styles.container}>
        <Text style={styles.textoBien} >Nuevo Material</Text>
        <Text style={styles.textoSecundario}>Ingrese los datos del nuevo material</Text>
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
                value={Nombres}
                placeholder="Ingresar nombre del material"
                onChangeText={text => setNombres(text)}
                />
        <TextInput style={styles.txtInput} 
                value={precio}
                placeholder="Precio(ex:0.25)"
                keyboardType='numeric'
                onChangeText={text => setPrecio(text)}
                /> 
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
                value={detalle}
                placeholder="Detalle"
                onChangeText={text => setDetalle(text)}
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
          <TouchableOpacity onPress={() => {navigation.navigate('Inventario');esNuevo=true}}
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
        <Icons  name='check' style={styles.circleIconCheck}/>
        <Text style={styles.textoSecundario}>{textoModal}</Text>
        <TouchableOpacity
            style={[styles.button, styles.buttonClose,{backgroundColor:"#05AB48",marginTop:10}]}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('Inventario');
              esNuevo=true;}}>
            <Text style={styles.colorTxtBtn}>Entiendo</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>      
  </View>
  )
}
export default Material;