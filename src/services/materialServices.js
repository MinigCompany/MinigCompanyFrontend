import axios from "axios";
import{MATERIAL_URL} from "../config";

export const saveMaterial=(material)=>{
    axios.post(`${MATERIAL_URL}/Materiales/AddMaterial`,{
        nombreMaterial:material.nombreMaterial,
        precio:material.precio,
        cantidad:material.cantidad,
        udm:material.udm,
        detalle:material.detalle,
        categoria:material.categoria,
        fecha:material.fecha
    }).then(res => {
        if (res){
            console.log("Material registrado: "+material)
        }
    }).catch(e => {
        console.log(`Error registro material ${e}`);
        console.log(material)
    });
}
export const allMaterials=async()=>{
    try {
        const response = await axios.get(`${MATERIAL_URL}/Materiales/Materiales`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}
export const dataMaterialDro=async()=>{
    try {
        let data =[];
        const response = await allMaterials();
        for(let i=0;i < response.Material.length;i++){
            let valor = { label: response.Material[i].nombreMaterial, value: response.Material[i]._id }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}
export const dataMaterialDroCantidad=async()=>{
    try {
        let data =[];
        const response = await allMaterials();
        for(let i=0;i < response.Material.length;i++){
            let valor = { label: response.Material[i].nombreMaterial+" - Cant: "+response.Material[i].saldo, value: response.Material[i]._id }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}
export const allMaterialsCategoria=async(cadena)=>{
    try {
        const response = await axios.get(`${MATERIAL_URL}/Materiales/MaterialCategoria/`+cadena);
        //console.log('Hola Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}
export const updateMaterial=(material)=>{
    axios.put(`${MATERIAL_URL}/Materiales/UpdateMaterial`,{
        material_ID:material.material_ID,
        nombreMaterial:material.nombreMaterial,
        precio:material.precio,
        cantidad:material.cantidad,
        udm:material.udm,
        detalle:material.detalle,
        categoria:material.categoria,
        fecha:material.fecha
    }).then(res => {
        if (res){
            console.log("Material actualizado: "+material)
        }
    }).catch(e => {
        console.log(`Error al actualizar el material ${e}`);
        console.log(material)
    });
}

export const deleteMaterial=(id)=>{
    axios.delete(`${MATERIAL_URL}/Materiales/DeleteMaterial/`+id)
    .then(res => {
        if (res){
            console.log("Material eliminado: "+id)
        }
    }).catch(e => {
        console.log(`Error al eliminar el material ${e}`);
        console.log(id)
    });
}

export const allMaterialsHistorial=async()=>{
    try {
        const response = await axios.get(`${MATERIAL_URL}/Historial`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}
export const dataMaterialHistorialDro=async()=>{
    try {
        let data =[];
        const response = await allMaterialsHistorial();
        for(let i=0;i < response.Historial.length;i++){
            let valor = { label: response.Historial[i].material.nombreMaterial, value: response.Historial[i]._id }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}