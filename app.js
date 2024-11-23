const users = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Convierte la respuesta en JSON
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

const posts = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Convierte la respuesta en JSON
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};


const comments = async () => {
    const url = 'https://jsonplaceholder.typicode.com/comments';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Convierte la respuesta en JSON
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};


const albums = async () => {
    const url = 'https://jsonplaceholder.typicode.com/albums';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Convierte la respuesta en JSON
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

const photos = async () => {
    const url = 'https://jsonplaceholder.typicode.com/photos';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Convierte la respuesta en JSON
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};


const organizeDataByUserId = async () => {
    const usersData = await users();
    const postsData = await posts();
    const commentsData = await comments();
    const albumsData = await albums();
    const photosData = await photos();

    // Crear un objeto para organizar los datos por usuario
    const dataByUserId = {};

    // Inicializar el objeto con IDs de usuarios como claves y estructura vacía como valores
    usersData.forEach((user) => {
        dataByUserId[user.id] = {
            user: user,       
            posts: [],        
            albums: []        
        };
    });

    // Añadir publicaciones al usuario correspondiente
    postsData.forEach((post) => {
        if (dataByUserId[post.userId]) {
            // Inicializamos cada publicación con un campo "comments" vacío
            dataByUserId[post.userId].posts.push({
                ...post,       
                comments: [],  
            });
        }
    });

    // Añadir comentarios a las publicaciones correspondientes
    commentsData.forEach((comment) => {
        const userEntry = Object.values(dataByUserId).find((user) =>
            user.posts.some((post) => post.id === comment.postId)
        );

        if (userEntry) {
            const post = userEntry.posts.find((post) => post.id === comment.postId);
            if (post) {
                post.comments.push(comment);
            }
        }
    });

    // Añadir álbumes al usuario correspondiente
    albumsData.forEach((album) => {
        if (dataByUserId[album.userId]) {
            dataByUserId[album.userId].albums.push({
                ...album,   
                photos: []  
            });
        }
    });

    // Añadir fotos a los álbumes correspondientes
    photosData.forEach((photo) => {
        const userEntry = Object.values(dataByUserId).find((user) =>
            user.albums.some((album) => album.id === photo.albumId)
        );

        if (userEntry) {
            const album = userEntry.albums.find((album) => album.id === photo.albumId);
            if (album) {
                album.photos.push(photo);
            }
        }
    });

    console.log(dataByUserId);
};

organizeDataByUserId();

