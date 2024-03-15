/*
    Liga de los NFL

    ** Obtener lista de los pendientes

    ** URL http://jsonplaceholder.typicode.com/todos

    1.- Lista de todos los pendientes (ID)
    2.- Lista de todos los pendientes (Id y Title)
    3.- Lista de todos los pendientes sin resolver(Id y Titles)
    4.- Lista de todos los pendientes resueltos(ID y Titles)
    5.- Lista de todos los pendientes (ID y userID)
    6.- Lista de todos los pendientes resueltos (ID y userID)
    7.- Lista de todos los pendientes sin resolver (ID y userID)
    */
    const url = 'http://jsonplaceholder.typicode.com/todos'; 
    
     //fetch(url).then(response => response.json()).then(data => console.log(data));

    let dropselect = document.querySelector('#dropdown-select');
    let listaDatos = {};
    const contenedorPrincipal = document.querySelector('#contenedorPrincipal')
    dropselect.addEventListener('change', (e)=> {
        console.log(parseInt(e.target.value));
        tarea(parseInt(e.target.value));
    });

    if (navigator.serviceWorker) {
        console.log('esta entrando')
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./js/sw.js')
            .then(registration => {
                
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.log('Fallo al registrar Service Worker:', error);
            });
        });
      }

    
      async function tarea(opcion) {
        listaDatos = [];
        try {
            const response = await fetch(url);
            const data = await response.json();
            switch (opcion) {    
                    case 1:
                        data.forEach(items => {
                            listaDatos.push(items)
                            // console.log(`ID: ${items.id}`);
                        });
                        break;
                    case 2:
                        data.forEach(items => {
                            listaDatos.push(items)
                            // console.log(`ID: ${items.id} - Title: ${items.title}`);
                        });
                        break;
                    case 3:
                        const filterData3 = data.filter(item => item.completed === false);
                        filterData3.forEach(items => {
                            listaDatos.push(items)                            
                            // console.log(`ID: ${items.id} - Title: ${items.title}`);
                        });
                        break;
                    case 4:
                        const filterData4 = data.filter(item => item.completed === true);
                        filterData4.forEach(items => {
                            listaDatos.push(items)
                            // console.log(`ID: ${items.id} - Title: ${items.title}`);
                        });
                        break;
                    case 5:
                        data.forEach(items => {
                            listaDatos.push(items)
                            // console.log(`ID: ${items.id} - User ID: ${items.userId}`);
                        });
                        break;
                    case 6:
                        const filterData6 = data.filter(item => item.completed === true);
                        filterData6.forEach(items => {
                            listaDatos.push(items)
                            // console.log(`ID: ${items.id} - User ID: ${items.userId}`);
                        });
                        break;
                    case 7:
                        const filterData7 = data.filter(item => item.completed === false);
                        filterData7.forEach(items => {
                            listaDatos.push(items)
                            // console.log(`ID: ${items.id} - User ID: ${items.userId}`);
                        });
                        break;
                    default:
                        break;
                    }
                    console.log('actualizacion');
                    const imagenInterceptadaResponse = await fetch('https://static.vecteezy.com/system/resources/previews/027/127/436/original/nfl-logo-nfl-icon-transparent-free-png.png');
                    manejarRespuestaServiceWorker(imagenInterceptadaResponse);
                    imprimir(listaDatos);
                } catch (error) {
                    console.error('Error:', error);
                }
     }

    function manejarRespuestaServiceWorker(response) {
        console.log('Respuesta del Service Worker:', response);
        if (response instanceof Response) {
          const imagenInterceptada = response.url;
          console.log('Imagen interceptada:', imagenInterceptada);
          const imgElement = document.createElement('img');
          imgElement.src = imagenInterceptada;
          document.body.appendChild(imgElement);
        }

    }
    function imprimir(objeto){
        const contenedorLista = document.querySelector('.contenedorLista');
        contenedorLista.innerHTML = ''; 
        objeto.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.id} - ${item.title}`;
            contenedorLista.appendChild(li);
        });
    }