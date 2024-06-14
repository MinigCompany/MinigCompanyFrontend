import react,  {useContext, useState,useEffect,useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, TouchableOpacity, Image, Modal,ScrollView,FlatList } from 'react-native';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import {Icon} from 'react-native-elements';
import {allUniforms,deleteUniform} from "../services/uniformServices";
import { Dropdown } from 'react-native-element-dropdown';
let uniformAux=null;
const Uniforms = () =>{
    const navigation = useNavigation();
    const [time, setTime] = useState([]);
    const [nombreUser, setNombreUser] = useState();
    const [ApellidoUser, setApellidoUser] = useState();
    const [uniformes, setUniformes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
      ];
      const [value, setValue] = useState(null);
      const [isFocus, setIsFocus] = useState(false);
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
    useFocusEffect(
        useCallback(() => {
            getUser();
            fetchUniforme();
        }, [])
    );
    const refreshList=()=>{
        setTime(new Date().getTime());
    }
    const fetchUniforme = async () => {
        const data = await allUniforms();
        if (data) {
            setUniformes(data.Uniformes);
        }
    }
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
    const ItemUniforms=({uniforme})=>{
        const borderColor = uniforme.saldo < 5 ? 'red' : 'green';
        return (
            <View  style={[styles.VistaMateriales,{borderColor}]}>
                <View style={[styles.Separador,{flex: 1, alignItems:"flex-start", justifyContent:"center"}]}>
                    <Icon name="skin"  type="antdesign" size={50} color="#FF8400" />
                </View>
                <View style={[styles.Separador,{flex: 4 }]}>
                    <Text style={styles.tituloMaterial}>{uniforme.nombreUniforme}</Text>
                    <Text style={styles.subtitulo}>{uniforme.categoria}</Text>
                    <View style={styles.VistaCodigo}>
                        <View style={styles.VistaCodigo}>
                            <Text style={styles.subtitulo}>Codigo: </Text>
                            <Text style={styles.subtitulo}>{uniforme._id.substring(0, 5)}</Text>
                        </View>
                        <View style={[styles.VistaCodigo,{marginHorizontal:20}]}>
                            <Text style={styles.subtitulo}>Cant.</Text>
                            <Text style={styles.subtitulo}>{uniforme.saldo}</Text>
                        </View>
                    </View>                    
                </View >
                <View style={[styles.Separador,{flex: 1 }]}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                        uniformAux = uniforme;
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
            <View style={styles.mainContainer}>
                <Text style={styles.txtInfoUser}>Hola, {nombreUser} {ApellidoUser}</Text>
                <Text style={styles.txtBien}>Bienvenida a Mining Company</Text>
                <View style={styles.VistaInventario}>
                        <Text style={styles.txtInventario}>Uniformes</Text>

                    </View>
                    <View style={styles.VistaCodigo}>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:50,backgroundColor:"#0578FF"}]} 
                        onPress={() => navigation.navigate('NewUniform',{fnRefresh:refreshList})}>
                            <View style={styles.contenedorTextoSalida}>
                                <Text style={[styles.txtNewMaterial,{color:"#FFFFFF"}]}>Nuevo</Text>
                            </View>
                            <View style={[styles.contenedorImagen,{marginLeft:20}]}>
                                <Image style={styles.image} source={require('../../assets/category.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:50}]} onPress={() => navigation.navigate('NewUniformSalida',{fnRefresh:refreshList})}>
                            <View style={styles.contenedorTextoSalida}>
                                <Text style={styles.txtNewMaterial}>Salidas</Text>
                            </View>
                            <View style={[styles.contenedorImagen,{marginLeft:20}]}>
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
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Material' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        />
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
                        placeholder={!isFocus ? 'Categoria' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        />
                    </View>
                    
                    <View >
                        <Text style={styles.txtFiltro}>Uniformes</Text>
                        <FlatList
                            data={uniformes}
                            renderItem={({item})=>{
                                return <ItemUniforms uniforme={item}/>
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
                                    navigation.navigate('NewUniform',{uniformeR:uniformAux,fnRefresh:refreshList});
                                }}>
                                <Text style={styles.textStyle}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button,styles.buttonClose,]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    deleteUniform(uniformAux._id);
                                    fetchUniforme();
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

export default Uniforms;