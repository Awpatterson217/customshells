const child_process = require('child_process');
const fs            = require('fs');
const events        = require('events');
const util          = require('util');
const path          = require('path');

module.exports = NodeShell;

const EEmitter = new events.EventEmitter();

// MIGHT USE child_process.fork, spawns node process already
// How can I open a file and pass a command at the same time?
// Can I pipe new commands to shell instance?
// See below:

// "open a new pipe for stdin so I can write to it, 
// share stdout and stderr with this parent process, 
// and open an IPC channel for child.send()/process.send() 
// on FD 4".
// var args = [ './child.js', []];
// var child = spawn(process.execPath, args, { stdio: ['pipe', 1, 2, 'ipc'] });
// file.pipe(child.stdin);

/*************         NODESHELL CONSTRUCTOR         **********/
/*******
 * 
 * 
 * 
 ******/
function NodeShell(options){
    this.options = {};
    this.options.stdio    = 'ignore';
    this.options.shell    = true;
    this.options.detached = true;
    
    if(options){
        this.options.cwd   = options.cwd;
        this.options.uid   = options.uid;
        this.options.gid   = options.gid;
    }
}
/*************             OPEN NODESHELL           **********/
/*******
 * 
 * 
 *  Will emit 'close' event after unref()
 ******/
NodeShell.prototype.open = function(){
    return child_process.spawn('start', ['node'],this.options).unref() 
}
/************       PIPE NODE OUTPUT TO FILE        **********/
/*******
 *  Can create file at runtime, Flag 'a', see: https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback
 * 
 * 
 ******/
NodeShell.prototype.toFile = function (command, parameters, path){

    let out           = fs.openSync(path, 'a');
    let err           = fs.openSync(path, 'a');
    this.options.stdio = ['ignore', out, err];

    this.cmd = command;

    return child_process.spawn(this.cmd, this.params, this.options);

}

                // BELOW IS INCOMPLETE/NEEDS WORK

/*************           CREATE NODE TASK           **********/
/*******
 * 
 * 
 * 
 ******/
NodeShell.prototype.taskRunner = function (command, parameters, isDetached) {
    this.params           = parameters || [];
    this.params.push(SUPER);
    this.options.detached = isDetached || false;

    this.cmd = command;

    this.run = function(){
            return isDetached ? spawn(this.cmd, this.params, this.taskOptions).unref() : 
                                spawn(this.cmd, this.params, this.taskOptions);
    }
}
/**********  CREATE NODE TASK AS FUNCTION EXPRESSION *********/
/*******
 * 
 * 
 *  
 ******/
NodeShell.prototype.Task = function (command, parameters, isDetached) {
    this.params           = parameters || [];
    this.params.push(SUPER);
    this.options.detached = isDetached || false;

    this.cmd = command;

    return isDetached ? spawn(this.cmd, this.params, this.options).unref() : 
                        spawn(this.cmd, this.params, this.options);
 
}
/************       BIND NODE TASK TO EVENT         **********/
/*******
 * 
 * 
 * 
 ******/
NodeShell.prototype.bindTask = function (command, parameters) {
    this.params = parameters || [];
    this.params.push(SUPER);
    this.cmd = command;

    return spawn(this.cmd, this.params, this.options);
                                                        
    util.inherits();

}
