const fs = require('fs');

let listadoPorHacer = [];



const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

const cargarDB = () => {

    //El trycatch es para que la primera vez que se carga un arreglo no dispare un error al no tener el []

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}
const crear = (descripcion) => {

    cargarDB();

    //Objeto por hacer
    let porHacer = {
        descripcion,
        completado: false
    };

    //Graba en el array listadoPorHacer el objeto porHacer.
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    //Reviso las tareas que NO SEAN IGUALES a la descripcion. 
    //en ese caso tengo un nuevo listado que sera el que usare para modificar el data.json
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (nuevoListado.length === listadoPorHacer) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // })

    // if (index >= 0) {
    //     listadoPorHacer = listadoPorHacer.splice(0, index);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}