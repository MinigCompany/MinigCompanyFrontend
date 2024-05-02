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
        width: 200,
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
})
export default styles;