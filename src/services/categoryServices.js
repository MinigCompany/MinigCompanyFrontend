import axios from "axios";
import{BASE_URL} from "../config";
export const allCategories=async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/Categorias/Categorias`);
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