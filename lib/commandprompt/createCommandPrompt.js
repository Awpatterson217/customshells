const child_process = require('child_process');
const fs            = require('fs');
const events        = require('events');
const util          = require('util');
const path          = require('path');

const EEmitter = new events.EventEmitter();

/************            CREATE CMD OBJ             **********/

/*******
 * 
 *  createCommandPrompt is a factory function.
 * 
 ******/
const commandPrompt = {
    options: {
        stdio:    'ignore',
        shell:    true,
        detached: true
    },
    open: function() {
        return child_process.spawn('start', [],this.options).unref();      
    },
    execute: function(file) {
        return child_process.spawn(file, [],this.options); 
    },
    toFile: function(command, parameters, path) {
    let out            = fs.openSync(path, 'a');
    let err            = fs.openSync(path, 'a');
    this.options.stdio = ['ignore', out, err];
    this.params        = parameters || [];
    this.cmd           = command;
        return child_process.spawn(this.cmd, this.params, this.options);
    },
};

let createCommandPrompt = function(command, parameters, options) {

      let customCommandPrompt        = Object.create(commandPrompt);
      customCommandPrompt.command    = command;
      customCommandPrompt.parameters = parameters;
      //customCommandPrompt.parameters = options;

      return customCommandPrompt;
}

module.exports = createCommandPrompt;

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
