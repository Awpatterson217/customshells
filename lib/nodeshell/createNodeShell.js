const child_process = require('child_process');
const fs            = require('fs');
const events        = require('events');
const util          = require('util');
const path          = require('path');

const EEmitter = new events.EventEmitter();

/************            CREATE NODE OBJ             **********/
/*******
 * 
 *  createNodeShell is a factory function.
 * 
 ******/
const nodeShell = {
    options: {
        stdio:    'ignore',
        shell:    true,
        detached: true
    },
    command: '',
    parameters: '',
    open: function() {
        return child_process.spawn('start', ['node'], this.options).unref();
    },
    serve: {

    }
};

let createNodeShell = function(command, parameters, options) {

      let customNodeShell        = Object.create(nodeShell);
      customNodeShell.command    = command;
      customNodeShell.parameters = parameters;
      //customNodeShell.parameters = options;

      return customNodeShell;
}

module.exports = createNodeShell;

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