import { StyleSheet,Dimensions } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      alignItems: 'center',
      justifyContent: 'center',
    },
    textoBien: {
        color: '#000000',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    IconText:{
        flexDirection: 'row', textAlign: 'center',
    },
    txtInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
        width: 300,
    }, 
    colorBtn: {
        marginTop: 15,
        borderColor: '#A35709',
        backgroundColor: '#A35709',
        padding: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50,
    },
    colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        width: 100,
        fontWeight: 'bold'
      },
    colorTxtBtnLogin: {
        color: '#FF9116',
        fontSize: 15,
        textAlign: 'center',
        width: 200,
        right:8,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 20,
        marginLeft: 20
    },
    colorTxtBtnOlvidar:{
        color: '#FF9116',
        textAlign: 'center',
        margin:5
    },
    //Botones divididos
    VistaBtnSeguidos:{
        flexDirection: 'row',
        justifyContent: 'left',
    },
    BotonGuardar:{
        backgroundColor:"#A35709",
        borderRadius: 60,
        padding: 10,
    },
    BotonCancelar:{
        backgroundColor:"#FFFFFF",
        borderWidth: 1,
        borderRadius: 60,
        padding: 10,
        marginRight: 10,
    },
    BotonAnadir:{
        backgroundColor:"#05AB48",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    BotonListar:{
        backgroundColor:"#0578FF",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    textoSecundario:{
        marginTop:20,
        color:"#87898E"
    },
    txtInputFecha: {
        height: 40,
        borderColor: '#0578FF',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
        width: 300,
    },
    textFecha:{
        color:"#0578FF"
    },
    circleIconCheck:{
      backgroundColor:"#05AB484D",
      color:"#05AB48",
      fontSize: 25,
      marginRight:10,
      padding:10,
      paddingVertical:13,
      borderRadius:50
  },
    //Dropdowm
    VistaInventario:{
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    dropdownTra: {
      height: 50,
      width:230,
      borderRadius: 8,
      backgroundColor:"#FFFFFF",
      borderBottomWidth:1,
      padding:10,
    },
    dropdown: {
        height: 50,
        width:300,
        borderRadius: 8,
        backgroundColor:"#FF8400",
        padding:10
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

    dropdowmMaterial:{
        height: 50,
        width:300,
        borderRadius: 8,
        backgroundColor:"#fff",
        padding:10,
        height: 50,
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        marginLeft:10,
        marginTop:10
      },
    //Modals
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
        backgroundColor: '#2196F3',
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
        paddingHorizontal:10,
        fontSize:15
      },
      // Vista trabajador
      viewTrabajador:{
        flexDirection:"row"
      },
      btnTrabajador:{
        marginHorizontal:10,
        borderColor: '#0578FF',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
      }
})
export default styles;