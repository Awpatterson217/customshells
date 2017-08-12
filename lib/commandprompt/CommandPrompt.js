const child_process = require('child_process');
const fs            = require('fs');
const events        = require('events');
const util          = require('util');
const path          = require('path');

module.exports = CommandPrompt;

const EEmitter = new events.EventEmitter();

/*************            CMD CONSTRUCTOR           **********/
/*******
 * 
 * 
 * 
 ******/
function CommandPrompt(options){
    this.options          = {};
    this.options.stdio    = 'ignore';
    this.options.shell    = true;
    this.options.detached = true;

    if(options){
        this.options.cwd   = options.cwd;
        this.options.uid   = options.uid;
        this.options.gid   = options.gid;
    }
}

/*************              OPEN CMD                **********/
/*******
 * 
 * 
 *  Will emit 'close' event after unref()
 ******/
CommandPrompt.prototype.open = function(){
    return child_process.spawn('start', ['cmd'],this.options).unref(); 
}

/*************            EXECUTE A FILE            **********/
/*******
 *  
 * 
 *  
 ******/
CommandPrompt.prototype.execute = function(file){
    // NEED REGEX FOR BACKSLASHES
    return child_process.spawn(file, [],this.options); 
}
/************          PIPE OUTPUT TO FILE         ***********/
/*******
 * Can create file at runtime, Flag 'a', see: https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback
 * 
 * 
 ******/
CommandPrompt.prototype.toFile = function (command, parameters, path){
    this.out           = fs.openSync(path, 'a');
    this.err           = fs.openSync(path, 'a');
    this.options.stdio = ['ignore', this.out, this.err];

    this.params        = parameters || [];
    this.cmd = command;

    return child_process.spawn(this.cmd, this.params, this.options);
}

/*   MIGHT BE USEFUL

// Which is basically saying "open a new pipe for stdin
// so I can write to it, share stdout and stderr with this
// parent process, and open an IPC channel for child.send()/process.send() on FD 4".

var args = [ './child.js', []];
var child = spawn(process.execPath, args, { stdio: ['pipe', 1, 2, 'ipc'] });
file.pipe(child.stdin);

*/

              // BELOW IS INCOMPLETE

/*************           CREATE CMD TASK            **********/
/*******
 * 
 * 
 * 
 ******/
CommandPrompt.prototype.taskRunner = function (command, parameters, isDetached) {
    this.params           = parameters || [];
    this.options.detached = isDetached || false;

    this.cmd = command;

    this.run = function(){
            return isDetached 
                ? spawn(this.cmd, this.params, this.taskOptions).unref() 
                : spawn(this.cmd, this.params, this.taskOptions);
    }
}


/************   CREATE TASK AS FUNCTION EXPRESSION  **********/
/*******
 * 
 * 
 * 
 ******/
CommandPrompt.prototype.Task = function (command, parameters, isDetached) {
    this.params           = parameters || [];
    this.options.detached = isDetached || false;

    this.cmd = command;

    return isDetached 
        ? spawn(this.cmd, this.params, this.options).unref() 
        : spawn(this.cmd, this.params, this.options);
   
}

/************         BIND TASK TO EVENT            **********/
/*******
 * 
 * 
 * 
 ******/
CommandPrompt.prototype.bindTask = function (command, parameters) {
    this.params = parameters || [];
    this.cmd    = command;

    return spawn(this.cmd, this.params, this.options);
                                                        
    util.inherits();

}
