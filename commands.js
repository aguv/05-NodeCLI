const fs = require(`fs`);
const request = require(`request`);

const first10Lines = (contents) =>{
    let ret = ``;
    let arr = contents.split(`\n`);
    arr.slice(0,10).forEach(word => ret += word + `\n`);
    return ret;
}
const last5Lines = (contents) =>{
    let ret = ``;
    let arr = contents.split(`\n`);
    arr.slice(arr.length - 5).forEach(word => ret += word + `\n`);

    return ret;
}
const sortArray = (contents) =>{
    
    let arrToSort = contents.split(`\n`); 

    return arrToSort.sort().join(`\n`);
}
const countLines = (contents) => {
    let arr = contents.split(`\n`); 
    return arr.length.toString();
}


module.exports = {
    pwd : function (done){
        done(`${(process.env.PWD).toString()}`);
    },
    date: function(done){
        done(`${new Date().toString()}`);
    },
    cat: function(arrFile, done){
        if(! arrFile)  done('\nAgregue nombre de archivo ');
        else{
            arrFile.forEach(nameFile =>{
                fs.readFile(nameFile, 'utf8', function(err, contents) { //Queda pendiete manejar error. Asi devuelve UNDEFINED.
                    done(contents)// Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)
                });  
            })
        }
    },
    head: function(arrFile, done) {
        if(! arrFile)  done('\nAgregue nombre/s de archivo ');
        else{
            arrFile.forEach( nameFile => {
                fs.readFile(nameFile, 'utf8', function(err, contents) { //Queda pendiete manejar error. Asi devuelve UNDEFINED. Cuando es error y cuando no
                    done(first10Lines(contents));
                    // Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)
                });
            });
        }  
    },
    tail: function(arrFile, done){
        if(! arrFile)  process.stdout.write('\nAgregue nombre/s de archivo ');
        else{
            arrFile.forEach( nameFile => {
                fs.readFile(nameFile, 'utf8', function(err, contents) { //Queda pendiete manejar error. Asi devuelve UNDEFINED. Cuando es error y cuando no
                    done(last5Lines(contents));
                   // Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)
                });
            });
        }
    },
    sort: function(arrFile, done){
        if(! arrFile)  done('\nAgregue nombre/s de archivo ');
        else{
            arrFile.forEach( nameFile => {
                fs.readFile(nameFile, 'utf8', function(err, contents) { //Queda pendiete manejar error. Asi devuelve UNDEFINED. Cuando es error y cuando no
                    done(sortArray(contents));
                    // Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)
                });
            });
        }
    },
    ls: function(dir = `.`, done){
        fs.readdir(dir, function(err, files){
            if(err) throw err;
            files.forEach(file => done(`${file.toString()}\n`))
        });
    },
    echo: function(arr, done){ // hasta 6 y de ahi posicion de 6+1
        arr.forEach(word => done(`${word.toString()} `));
    },
    curl: function(url, done){
        request(url, function (error, response, body) {
            done(body);
        });
    }, 
    wc: function(nameFile, done){
        if(! nameFile)  done('\nAgregue nombre de archivo ');
        else{
            fs.readFile(nameFile, 'utf8', function(err, contents) { //Queda pendiete manejar error. Asi devuelve UNDEFINED. Cuando es error y cuando no
                done(countLines(contents));
                // Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)
            });
        }
    }
};