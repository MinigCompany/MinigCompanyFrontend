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
    circleIcon:{
        color:"#0578FF",
        fontSize: 15,
        marginRight:10
    },
    //Dropdowm
    VistaInventario:{
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
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
})
export default styles;