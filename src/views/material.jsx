import react,  {useContext, useState,useEffect} from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/Fontisto';
import styles from '../styles/stylesFormularios';
import {saveMaterial,updateMaterial} from "../services/materialServices";
let esNuevo=true;
const Material = ({route}) => {
  let nombreR;
  let cantidadR;
  let precioR;
  let detalleR;
  let categoriaR;
  if(route.params.materialR!=null){
    esNuevo=false;
    nombreR=route.params.materialR.nombreMaterial;
    cantidadR=route.params.materialR.cantidad;
    precioR=route.params.materialR.precio.$numberDecimal;
    detalleR=route.params.materialR.detalle;
    categoriaR=route.params.materialR.categoria;
  }

  const navigation = useNavigation();
  const [cantidad, setCantidad] = useState(cantidadR==null?null:cantidadR+"");
  const [Nombres, setNombres] = useState(nombreR);
  const [precio, setPrecio] = useState(precioR);
  const [detalle, setDetalle] = useState(detalleR);
  const [categoria, setCategoria] = useState(categoriaR);

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
  
  let validar=()=>{
    if(esNuevo){
      if(cantidad==null || Nombres==null || precio==null || detalle==null || categoria==null || textFechaIn== null){
        Alert.alert("INFO.","Los campos que desea ingresar estan en blanco");
        return;
      }else{
        let material = {
          nombreMaterial:Nombres,
          precio:parseFloat(precio),
          cantidad:parseInt(cantidad),
          detalle:detalle,
          categoria:categoria,
          fecha:textFechaIn
        }
        saveMaterial(material);
        route.params.fnRefresh();
        navigation.navigate('Inventario');
      }
    }else{
      let material = {
        material_ID: route.params.materialR._id,
        nombreMaterial:Nombres,
        precio:parseFloat(precio),
        cantidad:parseInt(cantidad),
        detalle:detalle,
        categoria:categoria,
        fecha:textFechaIn
      }
      updateMaterial(material);
      route.params.fnRefresh();
      esNuevo=true;
      navigation.navigate('Inventario');
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
        <TextInput style={styles.txtInput} 
                value={detalle}
                placeholder="Detalle"
                onChangeText={text => setDetalle(text)}
                />
        <TextInput style={styles.txtInput} 
                value={categoria}
                placeholder="Categoria"
                onChangeText={text => setCategoria(text)}
                />
        <View  style={[styles.VistaBtnSeguidos,{marginTop:30}]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Inventario');esNuevo=true;route.params.fnRefresh();}}
              style={styles.BotonCancelar}>
              <Text style={[styles.colorTxtBtn,{color:"#000000"}]}>Cancelar</Text>
          </TouchableOpacity> 
          <TouchableOpacity
              style={styles.BotonGuardar} onPress={validar}>
              <Text style={styles.colorTxtBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>     
  </View>
  )
}
export default Material;