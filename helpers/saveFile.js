const fs = require('fs');

const pathFile = './database/data.json'; 

const saveData = ( data ) => {
    fs.writeFileSync( pathFile, JSON.stringify( data ) );
}

const readData = () => {
    if( !fs.existsSync( pathFile ) ){

        return null;    
    }

    const data = fs.readFileSync( pathFile, { encoding: 'utf-8' } );
    const parseData = JSON.parse( data );
    return parseData;
}


module.exports = {
    saveData,
    readData,
}