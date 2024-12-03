
import { solicitud } from "./modulos.js";

const cargar = async () => {  // define una funcion expresada asincrona llamada 'cargar'.
    const users = await solicitud("users");  // llama a la funcion 'usuarios' y espera su resultado, que sera un array de usuarios.
    const response = await Promise.all( // utiliza Promise.all para esperar a que se resuelvan todas las promesas en el array resultante de 'users.map'.
        users.map(async (user) => { // itera sobre cada usuario en el array 'users'.
            // albumes y fotos
            const albums = await solicitud(`albums?userId=${user.id}`); // Obtiene los albumes del usuario actual.
            const albumphotos = await Promise.all( // utiliza Promise.all para esperar a que se resuelvan todas las promesas de fotos de los albumes.
                albums.map(async (album) => { // itera sobre cada album.
                    const photos = await solicitud(`photos?albumId=${album.id}`); // obtiene las fotos del album actual.
                    return { ...albums, photos } // devuelve un objeto que incluye todos los albumes y las fotos correspondientes.
                })
            ) 

            const tareas = await solicitud(`todos?userId=${user.id}`); // Obtiene los tareas del usuario actual.
            const tareaCompletada = tareas.filter((tarea) => tarea.completed);
            const tareaNoCompletada = tareas.filter((tarea) => !tarea.completed);

            // posts y comentarios
            const posts = await solicitud(`posts?userId=${user.id}`); // obtiene los posts del usuario actual.
            const postsComentarios = await Promise.all( // utiliza Promise.all para esperar a que se resuelvan todas las promesas de comentarios de los posts.
                posts.map(async (post) => { // itera sobre cada post.
                    const comentarios = await solicitud(`comments?postId=${post.id}`); // obtiene los comentarios del post actual y asociarlos.
                    return { ...post, comentarios } // devuelve un objeto que incluye el post y sus comentarios.
                })
            );

            return { ...user, post: postsComentarios , album: albumphotos, tareasCompletadas: tareaCompletada, tareasNot: tareaNoCompletada} // devuelve un objeto que incluye el usuario, sus posts con comentarios y sus albumes con fotos.
        })
    );
    console.log(response); // Imprime en la consola la respuesta final que contiene todos los datos de usuarios, posts, comentarios, albumes, fotos y tareas.
}

cargar(); // Llama a la funcion 'cargar' para ejecutar todo el proceso.
