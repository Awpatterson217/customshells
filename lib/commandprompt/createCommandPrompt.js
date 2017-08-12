const child_process = require('child_process');
const fs            = require('fs');
const events        = require('events'); // WILL USE LATER
const util          = require('util');   //   "     "
const path          = require('path');   

const EEmitter = new events.EventEmitter();

/************              CMD FACTORY              **********/
/*******
 * 
 *  Optionally pass in default command
 *  Defaults are changeable 
 ******/
let createCommandPrompt = function(command = '', parameters = [], config) {
    let customCommandPrompt;
    const defaults = {
        stdio:    'ignore',
        shell:    true,
        detached: true
    }
    const commandPrompt = {
        open: function() {
            return child_process.spawn('start', ['cmd'],this.options).unref();      
        },
        execute: function(file) {
            return child_process.spawn(path.normalize(file), [],this.options); 
        },
        toFile: function(command, parameters, path) {
            let out            = fs.openSync(path, 'a');
            let err            = fs.openSync(path, 'a');
            this.options.stdio = ['ignore', out, err];
            this.params        = parameters || [];
            this.cmd           = command;
            return child_process.spawn(this.cmd, this.params, this.options);
        }
    };
    // Optionally pass in a default command
    commandPrompt.command    = command;
    commandPrompt.parameters = parameters;
    // Creates options object if none given
    if(arguments.length < 3){
        commandPrompt.options   = defaults;
        customCommandPrompt = Object.create(commandPrompt);
        // RETURNS customCommandPrompt with default options
        return customCommandPrompt;
    }
    // Ensures default properties are set if alternates not given
    let props = Object.keys(config);
    if(!props.includes('stdio'))    
        config.stdio = defaults.stdio;
    if(!props.includes('shell'))    
        config.shell = defaults.shell;
    if(!props.includes('detached')) 
        config.stdio = defaults.detached;
    commandPrompt.options = config;
    // RETURNS customCommandPrompt with custom options
    customCommandPrompt = Object.create(commandPrompt);
    return customCommandPrompt;
}

/*                              
let options  = {
    cwd:      opts.cwd,
    env: '',
    argv0:    opts.argv0,
    stdio:    opts.stdio,            HERE FOR CONVENIENCE
    detached: true,
    uid:      opts.uid,
    gid:      opts.gid,
    shell:    'shell',
} 
*/

module.exports = createCommandPrompt;
