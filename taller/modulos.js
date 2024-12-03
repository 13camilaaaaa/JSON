const URL = "https://jsonplaceholder.typicode.com/";

export const solicitud = async (endpoint) => { // es una funtion expresada asíncrona llamada 'solicitud' que recibe un parámetro 'url'.
    const response = await fetch(`${URL}${endpoint}`); // Realiza una solicitud HTTP a la URL proporcionada y espera la respuesta (fetch es una función que devuelve una Promesa).

    return await response.json(); // Convierte la respuesta en formato JSON y la retorna. Esto también es una operación asíncrona.
}
