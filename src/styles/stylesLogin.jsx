import { StyleSheet,Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowBottom = Dimensions.get('window').bottom;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#A35709",
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTwo:{
        width: windowWidth,
        padding: 40, 
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom:-80
    },
    image:{
        width: 350, 
        height: 200, 
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    textoBien: {
        color: '#000000',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TextoIngr: {
        color: '#000000',
        top:20,
        fontSize: 10,
        textAlign: 'center',
    },
    IconText:{
        flexDirection: 'row', alignItems: 'center',
    },
    TextoUsuario:{
        color: '#EAAB00',
        fontSize: 15,
        fontWeight: 'bold'
    },
    txtInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
    },

    colorBtn: {
        marginTop: 10,
        borderColor: '#A35709',
        backgroundColor: '#A35709',
        padding: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 60,
    },
    colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    colorTxtBtnRegistro: {
        color: '#FF9116',
        fontSize: 14,
        textAlign: 'center',
        width: 100,
        left: 10,
    },
    colorTxtBtnOlvidar:{
        color: '#FF9116',
        textAlign: 'center',
        margin:5
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 20,
        marginLeft: 20
    },
    btnStar: {
        marginTop: 20,
        borderColor: '#003F72',
        padding: 5,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 10,
        borderWidth:1,
        justifyContent: 'center',
    },
    textItem:{
        fontSize:20,
        color: '#003F72',
        textAlign: 'center'
    }, 
});

export default styles;