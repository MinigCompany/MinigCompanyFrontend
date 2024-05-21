import axios from "axios";
import{BASE_URL} from "../config";
import { Alert } from "react-native";

export const allInputs=async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/Materiales/AllEntradas/`+id);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}

export const dataInputDro=async(id)=>{
    try {
        let data =[];
        const response = await allInputs(id);
        for(let i=0;i < response.entradas.length;i++){
            let fecha = DateString(response.entradas[i].fecha);
            let valor = { label: (i+1)+". "+fecha, value: response.entradas[i]._id }
            data.push(valor);
        }
        console.log('Datos recibidos de entradas:', data);
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud de entradas:', error);
        return null;
    }
}
 const DateString=(fecha)=>{
    const date = new Date(fecha);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const formattedDate = `${day}-${monthIndex}-${year}`;
    return formattedDate;
 }

 export const allOutputs=async(id,entrada_ID)=>{
    try {
        const response = await axios.post(`${BASE_URL}/Materiales/AllSalidas/`+id,{
            entrada_ID
        });
        //console.log('Datos recibidos de salidas:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud de salidas:', error);
        return null;
    }
}
export const saveSalida=(salida)=>{
    axios.post(`${BASE_URL}/Materiales/AddSalida`,{
        material_ID:salida.idmaterial,
        salida:{
            fecha:salida.fecha,
            nombreTrabajador:salida.nombreTrabajador,
            cantidad:salida.cantidad,
            udm:salida.udm,
            observacion:salida.observacion
        }
    }).then(res => {
        if (res){
            console.log("Salida registrada: "+salida)
        }
    }).catch(e => {
        console.log(`Error registro de la salida ${e}`);
        console.log(e.response.data);
        if(e.response.data&&e.response.data.status==false){
            Alert.alert("Info.","No existe esa disponibidad de material para su salida, porfavor actualice el inventario y vuelva a intentarlo");
        }
    });
}