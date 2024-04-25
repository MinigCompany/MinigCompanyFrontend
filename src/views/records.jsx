import react,  {useContext, useState,useEffect} from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Modal,ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from '../styles/stylesInventory';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
const Records = () =>{
    const navigation = useNavigation();
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.txtInfoUser}>Hola, Celia Macas</Text>
                <Text style={styles.txtBien}>Bienvenida a Mining Company</Text>
                <View style={styles.VistaInventario}>
                        <Text style={styles.txtInventario}>Registros</Text>
                        <TouchableOpacity style={styles.btnInventario}>
                            <Icon name="search" size={25} color="#282928" />
                        </TouchableOpacity>
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
                        <TouchableOpacity style={[styles.VistaNewmaterial,{backgroundColor:"#0578FF"}]} onPress={() => navigation.navigate('NewMaterialEntrada')}>
                            <View style={styles.contenedorTextoSalida}>
                                <Text style={[styles.txtNewMaterial,{color:"#FFFFFF"}]}>Entrega</Text>
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
                        placeholder={!isFocus ? 'SALIDA' : '...'}
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
                        placeholder={!isFocus ? 'FECHA' : '...'}
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
                    <Text style={styles.txtFiltro}>Hoy</Text>
                    <View >
                        <ScrollView>
                            <View  style={styles.VistaMateriales}>
                                <View style={styles.Separador}>
                                    <Image style={styles.imageOutPut} source={require('../../assets/output.png')} />
                                </View>
                                <View style={styles.Separador}>
                                    <Image style={{width: 5,height: 80,}} source={require('../../assets/Line.png')} />
                                </View>
                                <View style={styles.Separador}>
                                    <Text style={styles.tituloMaterial}>SALIDA DE MATERIALES</Text>
                                    <Text style={styles.subtitulo}>Airtel Company</Text>
                                    <View style={styles.VistaCodigo}>
                                        <View style={styles.VistaCodigo}>
                                            <Text style={styles.subtitulo}>Cantidad de materiales: </Text>
                                            <Text style={styles.subtitulo}>300 unidades</Text>
                                        </View>
                                    </View>
                                    <View style={styles.VistaCodigo}>
                                        <View style={styles.VistaCodigo}>
                                            <Text style={styles.subtitulo}>Realizado por: </Text>
                                            <Text style={styles.subtitulo}>José Manuel Jiménez</Text>
                                        </View>
                                    </View>
                                    
                                </View >
                            </View>
                        </ScrollView>
                    </View>
            </View>
          
        </View>
    )
}
export default Records;