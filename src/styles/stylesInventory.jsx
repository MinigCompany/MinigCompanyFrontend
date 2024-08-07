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
        marginBottom: 10,
        justifyContent: 'flex-start',
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
        justifyContent: 'left',
        backgroundColor:"#FFAE51",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    VistaMaterial:{
      flexDirection: 'row',
      alignItems:"center",
      justifyContent: 'center',
      backgroundColor:"aqua",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    txtNewMaterial:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    contenedorTexto: {
        /*flex: 1,
        flexDirection:"row",
        marginHorizontal:50*/
        paddingHorizontal:5
    },
    image: {
        width: 20,
        height: 20,
    },
    txtFiltro:{
        fontSize:15,
        marginTop:13,
        marginBottom:5
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
        width:160,
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
    imageMaterial: {
      width: 30,
      height: 30,
    },
    circleIconCheck:{
      backgroundColor:"#FC23234D",
      color:"#FC2323",
      fontSize: 25,
      marginRight:10,
      padding:10,
      paddingVertical:13,
      borderRadius:50
    },
    textoSecundario:{
      marginTop:20,
      color:"#87898E"
    },
    colorTxtBtn: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
      width: 100,
      fontWeight: 'bold'
    },
    //Modal
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      fontWeight: 'bold',
      fontSize:20,
      marginBottom: 15,
      textAlign: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    circleIcon:{
      color: "blue",
      paddingTop:3,
      paddingHorizontal:10
    }
})

export default styles;