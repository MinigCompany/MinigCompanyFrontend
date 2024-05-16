import React,  {useContext, useState,useEffect, useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity, Image, Modal,FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import { Dropdown } from 'react-native-element-dropdown';
import {allMaterials,deleteMaterial,allMaterialsCategoria} from "../services/materialServices";
import { Icon } from 'react-native-elements';
import {dataCategoriesDro} from "../services/categoryServices";
let materialAux=null;
const Inventory = ({route}) => {
    const navigation = useNavigation();
    const [time, setTime] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [nombreUser, setNombreUser] = useState();
    const [ApellidoUser, setApellidoUser] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [allCategorias, setAllCategorias] = useState([]);
    //
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            fetchMaterials();
            fetchCategorias();
            getUser();
        }, [])
    );
    const fetchCategorias = async () => {
        const data = await dataCategoriesDro();
        if(data){
          setAllCategorias(data);
        }
      };
    const fetchMaterials = async () => {
        const data = await allMaterials();
        if (data) {
          setMaterials(data.Material);
        }
    };
    const fetchMaterialCategory = async (categoria) => {
        setMaterials([]);
        const data = await allMaterialsCategoria(categoria);
        if(data){
            setMaterials(data.Material);
        }
      };
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
    const refreshList=()=>{
        setTime(new Date().getTime());
    }
      const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Materiales
            </Text>
          );
        }
        return null;
      };
    
    const ItemMaterials=({material})=>{
        const borderColor = material.saldo < 5 ? 'red' : 'green';
        return (
            <View  style={[styles.VistaMateriales,{borderColor}]}>
                <View style={[styles.Separador,{flex: 1 }]}>
                    <Text style={styles.txtFiltro}>$ {material.precio.$numberDecimal}</Text> 
                    <Icon name="paperclip"  type="antdesign" size={25} color="#FF8400" />
                </View>
                <View style={[styles.Separador,{flex: 4 }]}>
                    <Text style={styles.tituloMaterial}>{material.nombreMaterial}</Text>
                    <Text style={styles.subtitulo}>{material.categoria}</Text>
                    <View style={styles.VistaCodigo}>
                        <View style={styles.VistaCodigo}>
                            <Text style={styles.subtitulo}>Codigo: </Text>
                            <Text style={styles.subtitulo}>{material._id.substring(0, 5)}</Text>
                        </View>
                        <View style={[styles.VistaCodigo,{marginHorizontal:20}]}>
                            <Text style={styles.subtitulo}>Cant.</Text>
                            <Text style={styles.subtitulo}>{material.saldo}</Text>
                        </View>
                    </View>                    
                </View >
                <View style={[styles.Separador,{flex: 1 }]}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                        materialAux = material;
                        //console.log(materialAux);
                    }}
                    style={[styles.colorBtn,{backgroundColor:"#FFFFFF",borderRadius:5,borderWidth:1,padding:2}]}>
                        <Icon name="edit" type="antdesign" size={25} color="#FF8400"/>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <View style={[styles.mainContainer,{flex: 1 }]}>
                <Text style={styles.txtInfoUser}>Hola, {nombreUser} {ApellidoUser}</Text>
                <Text style={styles.txtBien}>Bienvenida a Mining Company</Text>
                <View style={styles.VistaInventario}>
                        <Text style={styles.txtInventario}>Inventario</Text>
                        
                    </View>
                    <View style={styles.VistaCodigo}>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:50}]} onPress={() => navigation.navigate('NewMaterial',{fnRefresh:refreshList})}>
                            <View style={styles.contenedorTexto}>
                                <Text style={styles.txtNewMaterial}>Nuevo Material</Text>
                            </View>
                            <View style={styles.contenedorImagen}>
                                <Image style={styles.image} source={require('../../assets/category.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.txtFiltro}>Filtros</Text>
                    <View style={styles.VistaInventario}>
                        <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            fetchMaterialCategory(item.value);                            
                        }}
                        />
                    </View>
                    
                    <View  style={{ flex: 1 }}>
                    <Text style={styles.txtFiltro}>Materiales</Text>
                        <FlatList
                            data={materials}
                            renderItem={({item})=>{
                                return <ItemMaterials material={item}/>
                            }}
                            keyExtractor={(item)=>{return item._id}}
                            extraData={time}
                        />
                    </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Que desea hacer?</Text>
                        <View style={{flexDirection:"row",alignItems:"stretch", margin:20}}>
                            <TouchableOpacity
                                style={[styles.button,{marginRight:20, backgroundColor:"#05AB48", paddingHorizontal:30}]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('NewMaterial',{materialR:materialAux,fnRefresh:refreshList});
                                }}>
                                <Text style={styles.textStyle}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button,styles.buttonClose,]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    deleteMaterial(materialAux._id);
                                    refreshList();
                                }}>
                                <Text style={styles.textStyle}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                                style={[styles.button,{backgroundColor:"#48A1D4"}]}
                                onPress={() => {setModalVisible(!modalVisible);refreshList();}}>
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default Inventory;