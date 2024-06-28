import react,  {useContext, useState,useEffect, useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, TouchableOpacity, Image, Modal,FlatList } from 'react-native';
import { useFocusEffect,useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import {dataMaterialDro} from "../services/materialServices";
import {dataInputDro,allOutputs} from "../services/InputServices";
const Records = () =>{
    const navigation = useNavigation();
    const [time, setTime] = useState([]);
    const [nombreUser, setNombreUser] = useState();
    const [ApellidoUser, setApellidoUser] = useState();
    const [materials, setMaterials] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    //Variables de estado para el uso del dropdown
    const [dropdownEnabled, setDropdownEnabled] = useState(true);
    const [value, setValue] = useState();
    const [valueEnt, setValueEnt] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusEnt, setIsFocusEnt] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchMaterial();
            getUser();
        }, [])
    );
    const fetchMaterial = async () => {
        const data = await dataMaterialDro();
        if(data){
            setMaterials(data);
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
    const fetchEntradas=async(valor)=>{
        setValue(valor);
        console.log(value);
        const data = await dataInputDro(valor);
        setValueEnt();
        if(data){
            setInputs(data);
        }
    };
    const fetchSalidas=async(valor)=>{
        setValueEnt(valor);
        const data = await allOutputs(value,valor);
        //console.log(data.salidas);
        setOutputs([])
        if(data){
            setOutputs(data.salidas);
        }
    };
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
                    <Text style={styles.tituloMaterial}>SALIDA DE MATERIALES</Text>
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
                        <Text style={styles.txtInventario}>Registros</Text>
                    </View>
                    <View style={styles.VistaCodigo}>
                        <TouchableOpacity style={[styles.VistaNewmaterial,{marginRight:50}]} onPress={() => navigation.navigate('NewMaterialSalida')}>
                            <View style={styles.contenedorTextoSalida}>
                                <Text style={styles.txtNewMaterial}>Salidas</Text>
                            </View>
                            <View style={[styles.contenedorImagen,{marginLeft:20}]}>
                                <Image style={styles.image} source={require('../../assets/category.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.txtFiltro}>Filtros</Text>
                    <View style={[styles.VistaInventario,{}]}>
                        <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={materials}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Materiales' : '...'}
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
                    
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtFiltro}>Salidas</Text>
                        <FlatList
                            data={outputs}
                            renderItem={({item})=>{
                                return <ItemSalidas salida={item}/>
                            }}
                            keyExtractor={(item)=>{return item._id}}
                            extraData={time}
                        />
                    </View>
            </View>
          
        </View>
    )
}
export default Records;