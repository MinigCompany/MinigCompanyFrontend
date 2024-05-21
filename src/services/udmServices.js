import axios from "axios";
import{BASE_URL} from "../config";

export const allUDM=async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/UnidadesDM/Unidades`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud de UDM:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}

export const dataUDMDro=async()=>{
    try {
        let data =[];
        const response = await allUDM();
        for(let i=0;i < response.udm.length;i++){
            let valor = { label: response.udm[i].nombreUdm+" ("+response.udm[i].simbolo+")", value: response.udm[i].simbolo }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}