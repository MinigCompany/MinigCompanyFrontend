import { StyleSheet,Dimensions } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: 'left',
        justifyContent: 'top',
    },
    mainContainer:{
        marginLeft:20,
        marginRight:20
    },
    txtInfoUser:{
        color: '#000000',
        fontSize: 15,
        marginTop:50,
    },
    txtBien:{
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    VistaInventario:{
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    txtInventario:{
        color: '#000000',
        fontSize: 40,
        fontWeight: 'bold'

    },
    btnInventario:{
        backgroundColor:"#8c8c8c",
        borderRadius: 100,
        padding:15,
        marginLeft: 'auto',
    },
    VistaNewmaterial:{
        flexDirection: 'row',
        marginRight:150,
        justifyContent: 'left',
        backgroundColor:"#FFAE51",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    txtNewMaterial:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    contenedorTexto: {
        flex: 1,
    },
    image: {
        width: 20,
        height: 20,
    },
    txtFiltro:{
        fontSize:15,
        marginTop:13
    },
    DropdownDiv:{
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    dropdown: {
        height: 50,
        borderBottomWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        width:150,
        marginLeft:10
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    VistaMateriales:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:"#EFEFEF",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    tituloMaterial:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    VistaCodigo:{
        flexDirection: 'row',
        justifyContent: 'left',
    },
    Separador:{
        marginLeft:10
    },
    subtitulo:{
        marginLeft:10
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    //stilos adicionales Registros
    contenedorTextoSalida: {
        marginLeft:20
    },
    imageOutPut: {
        width: 50,
        height: 50,
    },
})

export default styles;