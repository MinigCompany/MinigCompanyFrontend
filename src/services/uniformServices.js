import axios from "axios";
import{UNIFORM_URL} from "../config";

export const saveUniform=(uniforme)=>{
    axios.post(`${UNIFORM_URL}/Uniformes/AddUniforme`,{
        nombreUniforme:uniforme.nombreUniforme,
        cantidad:uniforme.cantidad,
        udm:uniforme.udm,
        detalle:uniforme.detalle,
        categoria:uniforme.categoria,
        fecha:uniforme.fecha,
    }).then(res => {
        if (res){
            console.log("Uniforme registrado: "+uniforme)
        }
    }).catch(e => {
        console.log(`Error registro uniforme ${e}`);
        console.log(uniforme)
    });
}
export const allUniforms=async()=>{
    try {
        const response = await axios.get(`${UNIFORM_URL}/Uniformes/Uniformes`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}
export const dataUniformDro=async()=>{
    try {
        let data =[];
        const response = await allUniforms();
        for(let i=0;i < response.Uniformes.length;i++){
            let valor = { label: response.Uniformes[i].nombreUniforme, value: response.Uniformes[i]._id }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}
export const updateUniform=(uniforme)=>{
    axios.put(`${UNIFORM_URL}/Uniformes/UpdateUniforme`,{
        uniforme_ID:uniforme.uniforme_ID,
        nombreUniforme:uniforme.nombreUniforme,
        cantidad:uniforme.cantidad,
        udm:uniforme.udm,
        detalle:uniforme.detalle,
        categoria:uniforme.categoria,
        fecha:uniforme.fecha
    }).then(res => {
        if (res){
            console.log("Uniforme actualizado: "+uniforme)
        }
    }).catch(e => {
        console.log(`Error al actualizar el uniforme ${e}`);
        console.log(uniforme)
    });
}
export const deleteUniform=(id)=>{
    axios.delete(`${UNIFORM_URL}/Uniformes/DeleteUniforme/`+id)
    .then(res => {
        if (res){
            console.log("Uniforme eliminado: "+id)
        }
    }).catch(e => {
        console.log(`Error al eliminar el uniforme ${e}`);
        console.log(id)
    });
}
export const allUniformsHistorial=async()=>{
    try {
        const response = await axios.get(`${UNIFORM_URL}/Historial`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}