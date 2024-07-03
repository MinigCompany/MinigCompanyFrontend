import React,  {useContext, useState,useEffect, useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity, Image, Modal,FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import { Dropdown } from 'react-native-element-dropdown';
import {allMaterialsHistorial,dataMaterialHistorialDro} from "../services/materialServices";
import {allUniformsHistorial,dataUniformHistorialDro} from "../services/uniformServices";
import { Icon } from 'react-native-elements';
import {dataInputDroHistorialUniform,dataInputDroHistorialMaterial,allOutputsHistorialUniform,allInputsHistorialMaterial, allOutputsHistorialMaterial} from "../services/InputServices";
const Inventory = ({route}) => {
    const navigation = useNavigation();
    const [showUniformes, setShowUniformes] = useState(true);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const [time, setTime] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [uniformes, setUniformes] = useState([]);
    const [nombreUser, setNombreUser] = useState();
    const [ApellidoUser, setApellidoUser] = useState();
    const [uniformesDro, setUniformesDro] = useState([]);
    //
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [valueEnt, setValueEnt] = useState();
    const [value, setValue] = useState(null);
    const [dropdownEnabled, setDropdownEnabled] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusEnt, setIsFocusEnt] = useState(false);
    
    const [materialDro, setMaterialDro] = useState([]);
    const [inputsMaterial, setInputsMaterial] = useState([]);
    const [outputsMaterial, setOutputsMaterial] = useState([]);
    const [valueEntMaterial, setValueEntMaterial] = useState();
    const [valueMaterial, setValueMaterial] = useState(null);
    const [dropdownEnabledMate, setDropdownEnabledMate] = useState(true);
    const [isFocusEntMate, setIsFocusEntMate] = useState(false);
    useFocusEffect(
        useCallback(() => {
            fetchMaterialDro();
            fetchMaterials();
            fetchUniformeDro();
            fetchUniforme();
            getUser();
        }, [])
    );
    const fetchUniformeDro = async () => {
        const data = await dataUniformHistorialDro();
        if(data){
            setUniformesDro(data);
        }
    };
    const fetchSalidas=async(valor)=>{
        setValueEnt(valor);
        const data = await allOutputsHistorialUniform(value,valor);
        //console.log(data.salidas);
        setOutputs([])
        if(data){
            setOutputs(data.salidas);
        }
    };
    const fetchSalidasMaterial=async(valor)=>{
        setValueEntMaterial(valor);
        const data = await allOutputsHistorialMaterial(valueMaterial,valor);
        //console.log(data.salidas);
        setOutputsMaterial([])
        if(data){
            setOutputsMaterial(data.salidas);
        }
    };
    const fetchMaterialDro = async () => {
        const data = await dataMaterialHistorialDro();
        if(data){
            setMaterialDro(data);
        }
    };
    const fetchEntradas=async(valor)=>{
        setValue(valor);
        console.log(value);
        const data = await dataInputDroHistorialUniform(valor);
        setValueEnt();
        if(data){
            setInputs(data);
        }
    };
    const fetchEntradasMaterial=async(valor)=>{
        setValueMaterial(valor);
        console.log(value);
        const data = await dataInputDroHistorialMaterial(valor);
        setValueEntMaterial();
        if(data){
            setInputsMaterial(data);
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
    const ItemSalidas=({salida})=>{
        return(
            <View  style={[styles.VistaMateriales,{flex:1,alignItems:"center"}]}>
                <View style={[styles.Separador,{flex:1}]}>
                    <Image style={styles.imageOutPut} source={require('../../assets/output.png')} />
                </View>
                <View style={[styles.Separador,{flex:1,alignItems:"center"}]}>
                    <Image style={{width: 5,height: 80,}} source={require('../../assets/Line.png')} />
                </View>
                <View style={[styles.Separador,{flex:5}]}>
                    <Text style={styles.tituloMaterial}>SALIDA DE UNIFORMES</Text>
                    <Text style={styles.subtitulo}>{salida.observacion} </Text>
                    <View style={styles.VistaCodigo}>
                        <View style={styles.VistaCodigo}>
                            <Text style={styles.subtitulo}>Cantidad de material: </Text>
                            <Text style={styles.subtitulo}>{salida.cantidad} unidades</Text>
                        </View>
                    </View>
                    <View style={styles.VistaCodigo}>
                        <View style={styles.VistaCodigo}>
                            <Text style={styles.subtitulo}>Para: </Text>
                            <Text style={styles.subtitulo}>{salida.nombreTrabajador}</Text>
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
                    {showUniformes ?(
                            <View>
                                <TouchableOpacity style={[styles.VistaMaterial]} onPress={() => setShow1(!show1)}>
                                            <Text style={styles.txtNewMaterial}>{show1 ? 'Cambiar vista Salidas' : 'Cambiar vista Material'}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.VistaInventario}>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={materialDro}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Materiales' : '...'}
                                        searchPlaceholder="Buscar..."
                                        value={valueMaterial}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValueMaterial(item.value);
                                            setIsFocus(false);
                                            fetchEntradasMaterial(item.value);
                                            console.log(item.label+" "+item.value);
                                            setDropdownEnabledMate(false);
                                        }}
                                        />
                                        <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={inputsMaterial}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!setIsFocusEntMate ? 'Entrada (fecha)' : '...'}
                                        searchPlaceholder="Buscar..."
                                        value={valueEntMaterial}
                                        onFocus={() => setIsFocusEntMate(true)}
                                        onBlur={() => setIsFocusEntMate(false)}
                                        onChange={item => {
                                            setValueEntMaterial(item.value);
                                            setIsFocusEntMate(false);
                                            fetchSalidasMaterial(item.value);
                                        }}
                                        disable={dropdownEnabledMate}
                                        />
                                    </View>
                            </View>
                            ):(
                                <View>
                                <TouchableOpacity style={[styles.VistaMaterial]} onPress={() => setShow2(!show2)}>
                                            <Text style={styles.txtNewMaterial}>{show2 ? 'Cambiar vista Salidas' : 'Cambiar vista Uniformes'}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.VistaInventario}>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={uniformesDro}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Uniformes' : '...'}
                                        searchPlaceholder="Buscar..."
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            setIsFocus(false);
                                            fetchEntradas(item.value);
                                            console.log(item.label+" "+item.value);
                                            setDropdownEnabled(false);
                                        }}
                                        />
                                        <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={inputs}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocusEnt ? 'Entrada (fecha)' : '...'}
                                        searchPlaceholder="Buscar..."
                                        value={valueEnt}
                                        onFocus={() => setIsFocusEnt(true)}
                                        onBlur={() => setIsFocusEnt(false)}
                                        onChange={item => {
                                            setValueEnt(item.value);
                                            setIsFocusEnt(false);
                                            fetchSalidas(item.value);
                                        }}
                                        disable={dropdownEnabled}
                                        />
                                    </View>
                            </View>
                            )
                        }
                    <View  style={{ flex: 1 }}>
                        <Text style={styles.txtFiltro}>{showUniformes ? 'Materiales' : 'Uniformes'}</Text>
                        {showUniformes ?(
                            show1 ? (
                                <FlatList
                                    data={materials}
                                    renderItem={({item})=>{
                                        return <ItemMaterials material={item}/>
                                    }}
                                    keyExtractor={(item)=>{return item._id}}
                                    extraData={time}
                                />
                              ) : (
                                <FlatList
                                    data={outputsMaterial}
                                    renderItem={({item})=>{
                                        return <ItemSalidas salida={item}/>
                                    }}
                                    keyExtractor={(item)=>{return item._id}}
                                    extraData={time}
                                />
                              )
                            ):(
                                show2 ? (
                                    <FlatList
                                        data={uniformes}
                                        renderItem={({item})=>{
                                            return <ItemUniforms uniforme={item}/>
                                        }}
                                        keyExtractor={(item)=>{return item._id}}
                                        extraData={time}
                                    />
                                  ) : (
                                    <FlatList
                                        data={outputs}
                                        renderItem={({item})=>{
                                            return <ItemSalidas salida={item}/>
                                        }}
                                        keyExtractor={(item)=>{return item._id}}
                                        extraData={time}
                                    />
                                  )
                          
                            
                            )
                        }
                        
                    </View>
            </View>
        </View>
    )
}
export default Inventory;