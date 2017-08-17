"use strict";
/**
 * @fileOverview A library to simplify the creation of shells in Node.js 
 * @author <a href="mailto:awpatterson217@gmail.com">Adam Patterson</a>
 * @version 1.0.0
 */
const child_process = require('child_process');
const fs            = require('fs');
const path          = require('path');
const Tree          = require('../tree/Tree');
/** @customshell */
let customshell = {
    defaults: {
        stdio:    'pipe',
        detached: false,
        shell:    false
    },
    options:    {},
    ref:        true,
    hasOptions: false,
    isNode:     false,
    isNew:      false,
    willExec:   false,
    hasFile:    false,
    hasTree:    false,
    cd:         false,
};
/**
* Reset customShell 
* @this {customshell}
* @method
* @return {customshell}
*/
customshell.reset = function(){
    this.options    = {};
    this.ref        = true;
    this.hasOptions = false;
    this.isNode     = false;
    this.isNew      = false;
    this.willExec   = false;
    this.hasFile    = false;
    this.hasTree    = false;
    this.cd         = false;
    this.defaults   = {
        stdio:    'pipe',
        detached: false,
        shell:    false
    }
    return this;
}
/**
* Pipe output to file 
* *Note: When running a node module, toFile() 
*  may silently fail when combined with .new()
* @see path.relative() <a href="https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_relative_from_to">path.relative()</a>
* @this {customShell}
* @method
* @param {string} file
* @param {string} flag
* @see flags <a "href="https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_open_path_flags_mode_callback">flags</a>
* @return {Object} customshell
*/
customshell.toFile = function(file, flag = 'a'){
    this.flag    = flag;
    this.file    = path.relative(process.cwd(), file);
    this.hasFile = true;
    return this;
}
/**
* Run a module/script in a new shell window
* @this {customshell}
* @method
* @return {Object} customshell
*/
customshell.new = function(){
    this.isNew = true;
    this.ref   = false;
    return this;
}
/**
* Run a node module
* @this {shell}
* @method
* @param {string} nodeModule
* @return {Object} shell
*/
customshell.node = function(nodeModule){
    this.nodeModule = fs.realpathSync(nodeModule);
    this.isNode     = true;
    return this;
}
/**
* Execute a script
* @this {customshell}
* @method
* @param {string} script
* @return {Object} shell
*/
customshell.execute = function(script){
    this.script   = fs.realpathSync(script);
    this.willExec = true;
    return this;
}
/**
* Run a module/script recursively through directories
* @this {customshell}
* @method
* @param {string} dir
* @param {Array} ignored
* @return {Object} customshell
*/
customshell.tree = function(dir, ignored = []){
    _T.ignore(ignored);
    this.dir     = fs.realpathSync(dir);
    this.hasTree = true;
    return this;
}
/**
* Run a module/script in a new working directory
* @this {customshell}
* @method
* @param {string} dir
* @return {Object} customshell 
*/
customshell.at = function(dir){
    this.dir = fs.realpathSync(dir);
    this.cd  = true;
    return this;
}                                               
/**
* Add your own options 
* @this {shell}
* @method
* @param {Object} options
* @see Options <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options">Options</a>
* @return {Object} shell
*/
customshell.setOptions = function(options){
    let newOptions = Object.keys(options);
    newOptions.forEach(function(val, index){
        this.options[val] = options[val];
    });
    this.hasOptions = true;
    return this;
}
/**
* Open an instance of your favorite customshell in a new window
* @method
* @param {string} shell Shell choice
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/ 
customshell.open = function(shell){
    let options = {
        stdio:    'ignore',
        detached: true,
        shell:    true
    }
    return child_process.spawn('start', [path.normalize(shell)], options).unref();
}
/**
* Run a command
* @method
* @param {string} shell Shell choice
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/ 
customshell.cmd = function(command, options = {}, callback = (error, stdout, stderr) => { [error, stdout, stderr] }){

    return child_process.exec(command, options, callback); // TODO
}
/**
* Nothing happens until create()
* @this {customshell}
* @method
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
* @listens module:Tree~dir
*/
// TODO: some serious refactoring
customshell.create = function(){
    if(!this.hasOptions)
      this.options = this.defaults;
    if(this.isNode){
        const command = this.isNew
            ? 'start'
            : 'node';
        const parameters = this.isNew 
            ? ['node', this.nodeModule]
            : [this.nodeModule]; 
        if(this.hasFile){
            let out            = fs.openSync(this.file, this.flag);
            let err            = fs.openSync(this.file, this.flag);
            this.options.stdio = ['ignore', out, err];        
        }
        if(this.isNew){
            this.options.detached = true;
            this.options.shell    = true;
        }
        if(this.cd)
          this.options.cwd = this.dir;
        if(!this.hasTree){
            if(!this.ref)
              return child_process.spawn(command, parameters, this.options).unref();
            return child_process.spawn(command, parameters, this.options);
        }
      /**
        * Instantiaties the Tree object 
        * @see Tree
        */
        let _T = new Tree();
        _T.getBranch(this.dir);
        _T.on('dir', dir => {
            this.options.cwd = dir;
            if(!this.ref)
                return child_process.spawn(command, parameters, this.options).unref();
            return child_process.spawn(command, parameters, this.options);
        });
    }
    if(this.willExec){
        if(this.hasFile){
            let out            = fs.openSync(this.file, this.flag);
            let err            = fs.openSync(this.file, this.flag);
            this.options.stdio = ['ignore', out, err];
        }
        if(this.isNew){
            this.options.detached = true;
            this.options.shell    = true;
        }
        if(this.cd)
          this.options.cwd = this.dir;
        if(!this.hasTree){
            if(!this.ref)
              return child_process.spawn(this.script, [],this.options).unref();
            return child_process.spawn(this.script, [],this.options); 
        }
      /**
        * Instantiaties the Tree object 
        * @see Tree
        */
        let _T = new Tree();
        _T.getBranch(this.dir, );
        _T.on('dir', dir => {
            this.options.cwd = dir;
            if(!this.ref)
                return child_process.spawn(this.script, [],this.options).unref();
            return child_process.spawn(this.script, [],this.options); 
        });
    }
}
/**
 *  Creates customshell
 * @return {Object} The new customshell object.
 */
let createShell = function(){
    let customShell = Object.create(customshell);
    return customShell;
}

module.exports = createShell;
