import React,  {useContext, useState,useEffect, useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity, Image, Modal,FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import { Dropdown } from 'react-native-element-dropdown';
import {allMaterialsHistorial,allMaterialsCategoria} from "../services/materialServices";
import {allUniformsHistorial} from "../services/uniformServices";
import { Icon } from 'react-native-elements';
import {dataCategoriesDro} from "../services/categoryServices";
const Inventory = ({route}) => {
    const navigation = useNavigation();
    const [showUniformes, setShowUniformes] = useState(true);
    const [time, setTime] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [uniformes, setUniformes] = useState([]);
    const [nombreUser, setNombreUser] = useState();
    const [ApellidoUser, setApellidoUser] = useState();
    const [allCategorias, setAllCategorias] = useState([]);
    //
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            fetchMaterials();
            fetchCategorias();
            fetchUniforme();
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
        const data = await allMaterialsHistorial();
        if (data) {
          setMaterials(data.Historial);
        }
    };
    const fetchUniforme = async () => {
        const data = await allUniformsHistorial();
        if (data) {
            setUniformes(data.Historial);
        }
    }
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
    const ItemMaterials=({material})=>{
        return (
            <View  style={[styles.VistaMateriales]}>
                <View style={[styles.Separador,{flex: 1,alignItems:"flex-start", justifyContent:"center" }]}>
                    <Text style={styles.txtFiltro}>$ {material.material.precio.$numberDecimal}</Text> 
                    <Icon name="paperclip"  type="antdesign" size={25} color="#FF8400" />
                </View>
                <View style={[styles.Separador,{flex: 4 }]}>
                    <Text style={styles.tituloMaterial}>{material.material.nombreMaterial}</Text>
                    <Text style={styles.subtitulo}>{material.material.categoria}</Text>
                    <View style={styles.VistaCodigo}>
                        <View style={styles.VistaCodigo}>
                            <Text style={styles.subtitulo}>Codigo: </Text>
                            <Text style={styles.subtitulo}>{material.material._id.substring(0, 5)}</Text>
                        </View>
                        <View style={[styles.VistaCodigo,{marginHorizontal:20}]}>
                            <Text style={styles.subtitulo}>Cant.</Text>
                            <Text style={styles.subtitulo}>{material.material.cantidad}</Text>
                        </View>
                    </View>                    
                </View>
            </View>
        );
    }
    const ItemUniforms=({uniforme})=>{
        return (
            <View  style={[styles.VistaMateriales]}>
                <View style={[styles.Separador,{flex: 1, alignItems:"flex-start", justifyContent:"center"}]}>
                    <Icon name="skin"  type="antdesign" size={50} color="#FF8400" />
                </View>
                <View style={[styles.Separador,{flex: 4 }]}>
                    <Text style={styles.tituloMaterial}>{uniforme.uniforme.nombreUniforme}</Text>
                    <Text style={styles.subtitulo}>{uniforme.uniforme.categoria}</Text>
                    <View style={styles.VistaCodigo}>
                        <View style={styles.VistaCodigo}>
                            <Text style={styles.subtitulo}>Codigo: </Text>
                            <Text style={styles.subtitulo}>{uniforme.uniforme._id.substring(0, 5)}</Text>
                        </View>
                        <View style={[styles.VistaCodigo,{marginHorizontal:20}]}>
                            <Text style={styles.subtitulo}>Cant.</Text>
                            <Text style={styles.subtitulo}>{uniforme.uniforme.cantidad}</Text>
                        </View>
                    </View>                    
                </View >
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <View style={[styles.mainContainer,{flex: 1 }]}>
                <Text style={styles.txtInfoUser}>Hola, {nombreUser} {ApellidoUser}</Text>
                <Text style={styles.txtBien}>Bienvenida a Mining Company</Text>
                <View style={styles.VistaInventario}>
                    <Text style={styles.txtInventario}>Historial</Text>
                </View>
                    <View style={styles.VistaCodigo}>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:20,backgroundColor:"#0578FF"}]} 
                        onPress={() => setShowUniformes(true)}>
                            <View style={styles.contenedorTextoSalida}>
                                <Text style={[styles.txtNewMaterial,{color:"#FFFFFF"}]}>Materiales</Text>
                            </View>
                            <View style={[styles.contenedorImagen,{marginLeft:20}]}>
                                <Image style={styles.image} source={require('../../assets/category.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:50}]} 
                        onPress={() => setShowUniformes(false)}>
                            <View style={styles.contenedorTextoSalida}>
                                <Text style={styles.txtNewMaterial}>Uniformes</Text>
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
                        <Text style={styles.txtFiltro}>{showUniformes ? 'Materiales' : 'Uniformes'}</Text>
                        {showUniformes ?(
                            <FlatList
                                data={materials}
                                renderItem={({item})=>{
                                    return <ItemMaterials material={item}/>
                                }}
                                keyExtractor={(item)=>{return item._id}}
                                extraData={time}
                            />
                            ):(
                            <FlatList
                                data={uniformes}
                                renderItem={({item})=>{
                                    return <ItemUniforms uniforme={item}/>
                                }}
                                keyExtractor={(item)=>{return item._id}}
                                extraData={time}
                            />
                            )
                        }
                        
                    </View>
            </View>
        </View>
    )
}
export default Inventory;