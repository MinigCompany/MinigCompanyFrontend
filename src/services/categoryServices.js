import axios from "axios";
import{MATERIAL_URL,UNIFORM_URL} from "../config";
export const allCategories=async()=>{
    try {
        const response = await axios.get(`${MATERIAL_URL}/Categorias/Categorias`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud de categorias:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}

export const dataCategoriesDro=async()=>{
    try {
        let data =[];
        const response = await allCategories();
        for(let i=0;i < response.Category.length;i++){
            let valor = { label: response.Category[i].nombreCategoria, value: response.Category[i].nombreCategoria }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}
export const allCategoriesUniforme=async()=>{
    try {
        const response = await axios.get(`${UNIFORM_URL}/Categorias/Categorias`);
        //console.log('Datos recibidos:', response.data);
        return response.data; // Retornamos los datos directamente
    } catch (error) {
        console.error('Error al realizar la solicitud de categorias:', error);
        // Podrías retornar un valor especial como null o undefined para indicar que la solicitud falló
        return null;
    }
}

export const dataCategoriesDroUniforme=async()=>{
    try {
        let data =[];
        const response = await allCategories();
        for(let i=0;i < response.Category.length;i++){
            let valor = { label: response.Category[i].nombreCategoria, value: response.Category[i].nombreCategoria }
            data.push(valor);
        }
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}