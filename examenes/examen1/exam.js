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
    const readline = require('readline');
    const url = 'http://jsonplaceholder.typicode.com/todos'; 
    
    //fetch(url).then(response => response.json()).then(data => console.log(data));
    
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    console.log('Selecciona alguna de las siguientes opciones para obtener una lista de pendientes \n\n\
    1.- Lista de todos los pendientes (ID) \n\
    2.- Lista de todos los pendientes (Id y Title)\n\
    3.- Lista de todos los pendientes sin resolver(Id y Titles)\n\
    4.- Lista de todos los pendientes resueltos(ID y Titles)\n\
    5.- Lista de todos los pendientes (ID y userID)\n\
    6.- Lista de todos los pendientes resueltos (ID y userID)\n\
    7.- Lista de todos los pendientes sin resolver (ID y userID)\n');
    
    readLine.question('Selecciona alguna opcion: ', (texto) => {
        const opcion = parseInt(texto, 10);
       
        tarea(opcion)
        readLine.close();
    })
    
    function tarea(opcion) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                switch (opcion) {
                    case 1:
                        data.forEach(items => {
                            console.log(`ID: ${items.id}`);
                        });
                        break;
                    case 2:
                        data.forEach(items => {
                            console.log(`ID: ${items.id} - Title: ${items.title}`);
                        });
                        break;
                    case 3:
                        const filterData3 = data.filter(item => item.completed === false);
                        filterData3.forEach(items => {
                            console.log(`ID: ${items.id} - Title: ${items.title}`);
                        });
                        break;
                    case 4:
                        const filterData4 = data.filter(item => item.completed === true);
                        filterData4.forEach(items => {
                            console.log(`ID: ${items.id} - Title: ${items.title}`);
                        });
                        break;
                    case 5:
                        data.forEach(items => {
                            console.log(`ID: ${items.id} - User ID: ${items.userId}`);
                        });
                        break;
                    case 6:
                        const filterData6 = data.filter(item => item.completed === true);
                        filterData6.forEach(items => {
                            console.log(`ID: ${items.id} - User ID: ${items.userId}`);
                        });
                        break;
                    case 7:
                        const filterData7 = data.filter(item => item.completed === false);
                        filterData7.forEach(items => {
                            console.log(`ID: ${items.id} - User ID: ${items.userId}`);
                        });
                        break;
                    default:
                        console.log('Opción no válida');
                }
            });
    }
    