import axios from "axios";
import{BASE_URL} from "../config";

export const saveMaterial=(material)=>{
    axios.post(`${BASE_URL}/Materiales/AddMaterial`,{
        nombreMaterial:material.nombreMaterial,
        precio:material.precio,
        cantidad:material.cantidad,
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
        const response = await axios.get(`${BASE_URL}/Materiales/Materiales`);
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
export const allMaterialsCategoria=async(cadena)=>{
    try {
        const response = await axios.get(`${BASE_URL}/Materiales/MaterialCategoria/`+cadena);
        //console.log('Hola Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}
export const updateMaterial=(material)=>{
    axios.put(`${BASE_URL}/Materiales/UpdateMaterial`,{
        material_ID:material.material_ID,
        nombreMaterial:material.nombreMaterial,
        precio:material.precio,
        cantidad:material.cantidad,
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
    axios.delete(`${BASE_URL}/Materiales/DeleteMaterial/`+id)
    .then(res => {
        if (res){
            console.log("Material eliminado: "+id)
        }
    }).catch(e => {
        console.log(`Error al eliminar el material ${e}`);
        console.log(id)
    });
}