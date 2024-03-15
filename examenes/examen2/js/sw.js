self.addEventListener('fetch', event => {
    if (event.request.url.includes('.jpg') || event.request.url.includes('.png')) {
        event.respondWith(fetch('https://static.vecteezy.com/system/resources/previews/027/127/436/original/nfl-logo-nfl-icon-transparent-free-png.png'));
    }
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('jsonplaceholder.typicode.com/todos')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los pendientes');
                    }
                    return response.json();
                })
                .then(data => {
                    const modifiedData = data.map(todo => ({
                        id: `${todo.id} • `, 
                        userId: todo.userId,
                        title: todo.title,
                        completed: todo.completed
                    }));
                    return new Response(JSON.stringify(modifiedData), {
                        headers: {'Content-Type': 'application/json'}
                    });
                })
                .catch(error => new Response(error.message, {status: 500}))
        );
    }
});

self.addEventListener('install', event =>{
    console.log("SW: Instalando el service worker")
    const installing =  new Promise((resolve, reject) =>{
        setTimeout (()=>{
            console.log("SW: instalacion finalizada!")   
        }, 1000);
        self.skipWaiting();
        resolve();
    });
    
    event.waitUntil(installing);
});

self.addEventListener('activate', event =>{
    console.log("SW: service worker Activo!");
});
