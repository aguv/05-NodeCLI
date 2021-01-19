const fs = require(`fs`);
const command = require(`./commands`)
const done = (output) => {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

process.stdout.write('prompt > ');

process.stdin.on('data', function (data) {
    var cmd = data.toString().trim().split(` `); //`cat bash.js`
    var args = cmd.slice(1,cmd.length);

    if(cmd[0] === `date`){
        command.date(done);
    }else if(cmd[0] === `pwd`){
        command.pwd(done);
    }else if (cmd[0] === `cat`){
        command.cat(args, done);
        //Queda pendiete manejar error. Asi devuelve UNDEFINED.
        // Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)
    }else if (cmd[0] === `head`){
        command.head(args,done);
        //Queda pendiete manejar error. Asi devuelve UNDEFINED. Cuando es error y cuando no
        // Solucion no buena para que vuelva a aparecer el Prompt (REVISAR!!!)             
    }else if(cmd[0] === `ls`){
        command.ls(cmd[1], done);
    }else if(cmd[0] === `echo`){    
        command.echo(args, done);
    }else if(cmd[0] === `tail`){
        command.tail(args, done);
    }else if(cmd[0] === `sort`){
        command.sort(args, done);
    }else if(cmd[0] === `curl`){
        command.curl(cmd[1], done);
    }else if(cmd[0] === `wc`){
        command.wc(cmd[1], done);
    }  
    else{
        done('You typed: ' + cmd);
    }
});