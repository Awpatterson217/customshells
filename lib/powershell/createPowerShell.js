const child_process = require('child_process');
const events        = require('events');
const fs            = require('fs');
const util          = require('util');
const path          = require('path');
const INIT_PS       = require('./files/constants/constants');

const EEmitter = new events.EventEmitter();

/************            CREATE PS OBJ              **********/


/*******
 * 
 *  createPowerShell is a factory function.
 * 
 ******/
    
const powerShell = {
    options: {
        stdio:    'ignore',
        shell:    true,
        detached: true
    },
    command: '',
    parameters: '',
    open: function() {
        child_process.spawn(INIT_PS, [], this.options).unref();     
    },
    serve: {

    }
};

let createPowerShell = function(command, parameters, options) {

      let customPowerShell        = Object.create(powerShell);
      customPowerShell.command    = command;
      customPowerShell.parameters = parameters;
      //customPowerShell.parameters = options;

      return customPowerShell;
}

module.exports = createPowerShell;

/*
let options  = {
    cwd:      opts.cwd,
    argv0:    opts.argv0,
    stdio:    opts.stdio,
    uid:      opts.uid,
    gid:      opts.gid,
    shell:    'shell',
    detached: true
} 
*/
