import axios from "axios";
import{AUTH_URL} from "../config";

export const saveTrabajador=(trabajador)=>{
    axios.post(`${AUTH_URL}/Trabajadores/AddTrabajador`,
        trabajador)
    .then(res => {
        if (res){
            console.log("Trabajador registrado: "+trabajador)
        }
    }).catch(e => {
        console.log(`Error registro trabajador ${e}`);
        console.log(trabajador)
    });
}
export const allTrabajadores=async()=>{
    try {
        const response = await axios.get(`${AUTH_URL}/Trabajadores/Trabajadores`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}
export const dataTrabajadoresDro=async()=>{
    try {
        let data =[];
        const response = await allTrabajadores();
        for(let i=0;i < response.Trabajador.length;i++){
            let valor = { label: response.Trabajador[i].cedula+": "+response.Trabajador[i].nombres+" "+response.Trabajador[i].apellidos, value: response.Trabajador[i].nombres+" "+response.Trabajador[i].apellidos }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}