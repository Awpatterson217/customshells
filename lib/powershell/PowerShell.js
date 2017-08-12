const child_process = require('child_process');
const events        = require('events');
const fs            = require('fs');
const util          = require('util');
const path          = require('path');
const INIT_PS       = require('./files/constants/constants');

module.exports = PowerShell;

// NEED child_process.exec
// exec = spawn with bash set to true
// except exec buffers entire shell output instead of streaming
function getString(command,callback){
    //return refrence to the child process
    return exec(
        command,
        (
            function(){
                return function(err,data,stderr){
                    if(!callback)
                        return;

                    callback(err, data, stderr);
                }
            }
        )(callback)
    );
}

const EEmitter = new events.EventEmitter();

/*************       POWERSHELL CONSTRUCTOR        **********/
/*******
 * 
 * 
 * 
 ******/
function PowerShell(options) {
    this.options = {};
    //this.options.argv0    = 'start';
    this.options.stdio    = 'ignore';
    this.options.shell    = true;
    this.options.detached = true;
    if(options){
        this.options.cwd   = options.cwd;
        this.options.uid   = options.uid;
        this.options.gid   = options.gid;
    }
}
/*************           OPEN POWERSHELL           **********/
/*******
 * 
 * 
 *  
 ******/
PowerShell.prototype.open = function(){
    return child_process.spawn(INIT_PS, [], this.options).unref(); 
}
/*************            EXECUTE A FILE            **********/
/*******
 * 
 * 
 *  
 ******/
PowerShell.prototype.execute = function(file){
    return child_process.spawn(INIT_PS + ' & .\\' + file, [],this.options); 
}
/************          PIPE OUTPUT TO FILE         ***********/
/*******
 * Can create file at runtime, Flag 'a', see: https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback
 * 
 * 
 ******/
PowerShell.prototype.toFile = function (command, parameters, path){
    this.out           = fs.openSync(path, 'a');
    this.err           = fs.openSync(path, 'a');
    this.options.stdio = ['ignore', this.out, this.err];

    this.params        = parameters || [];
    this.cmd = command;

    return child_process.spawn(INIT_PS + ' & ' + this.cmd + ' ' + this.params,[], this.options);
}
/*************                                      **********/


         //  BELOW IS INCOMPLETE

         
/*************           CREATE PS TASK             **********/
/*******
 * 
 * 
 * 
 ******/
PowerShell.prototype.taskRunner = function (command, parameters, isDetached) {
    this.params           = parameters     || [];
    this.options.detached = isDetached     || false;
    this.options.stdio    = isDetached     || 'ignore';

    this.cmd = command;

    this.run = function(){
            return isDetached 
                ? spawn(this.cmd, this.params, this.taskOptions).unref() 
                : spawn(this.cmd, this.params, this.taskOptions);
    }
}
/************  CREATE PS TASK AS FUNCTION EXPRESSION **********/
/*******
 * Synchronous operation! see: https://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_spawnsync_command_args_options
 * 
 * 
 ******/
PowerShell.prototype.Task = function (command, parameters, isDetached) {
    this.params           = parameters || [];
    this.options.detached = isDetached || false;

    this.cmd = command;

    return isDetached 
        ? child_process.spawnSync(this.cmd, this.params, this.options).unref() 
        : child_process.spawnSync(this.cmd, this.params, this.options);
}
