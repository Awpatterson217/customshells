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
    nodeModule: [],
    ignored:    [],
    script:     [],
    hasOptions: false,
    isNode:     false,
    hasRun:     false,
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
    this.nodeModule = [];    
    this.ignored    = [];    
    this.script     = [];    
    this.hasOptions = false;
    this.isNode     = false;
    this.hasRun     = false;
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
* Run a node module
* @this {customshell}
* @method
* @param {string} nodeModule
* @return {Object} shell
*/
customshell.node = function(...nodeModule){
    let copied = [...nodeModule];
    let theModule = copied.shift();
    this.nodeModule.push(fs.realpathSync(theModule));
    if(copied instanceof Array) this.nodeModule = this.nodeModule.concat(copied);    
        else this.nodeModule.push(copied);
    this.isNode = true;
    return this;
}
/**
* Run a script
* @this {customshell}
* @method
* @param {string} script
* @return {Object} shell
*/
customshell.run = function(...script){    
    let copied = [...script];
    let theScript = copied.shift();
    this.script.push(theScript);    
    if(copied instanceof Array) this.script = this.script.concat(copied);    
        else this.script.push(copied);
    this.hasRun = true;
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
    this.ignore(ignored);
    this.dir     = fs.realpathSync(dir);
    this.hasTree = true;
    return this;
}
/**
* Runs the Tree(), and sp() methods
* @this {customshell}
* @method
* @param {string} theScript Script file to run
* @param {Array} parameters Optional parameters
* @listens module:Tree~dir
*/
customshell.runTree = function(theScript, parameters){
  /**
    * Instantiaties the Tree object 
    * @see Tree
    * @listens module:Tree~dir
    */
    let _T = new Tree();
    _T.getBranch(this.dir, this.ignored);
    _T.on('dir', dir => {
        this.options.cwd = fs.realpathSync(dir);
        console.log(this.options.cwd);     
        this.sp(theScript, parameters);
    });
}
/**
* Runs the Tree() method and spawns new child_process
* @this {customshell}
* @method
* @param {string} theModule The node module to run
* @param {Array} parameters Optional parameters
* @listens module:Tree~dir
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/
customshell.nodeTree = function(theModule, parameters){
  /**
    * Instantiaties the Tree object 
    * @see Tree
    * @listens module:Tree~dir
    */
    let _T = new Tree();
    if(this.hasFile){
        let out            = fs.openSync(this.file, this.flag);
        let err            = fs.openSync(this.file, this.flag);
        this.options.stdio = ['ignore', out, err];
    }
    _T.getBranch(this.dir, this.ignored);
    _T.on('dir', dir => {
        this.options.cwd = dir;
        let child = child_process.spawn('node', [theModule, parameters], this.options);
        return child;  
    });
}
/**
* Spawns new child process with chosen script file
* @this {customshell}
* @method
* @param {string} theScript The script file to run
* @param {Array} parameters Optional parameters
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/
customshell.sp = function(theScript, parameters){
    if(this.hasFile){
        let out            = fs.openSync(this.file, this.flag);
        let err            = fs.openSync(this.file, this.flag);
        this.options.stdio = ['ignore', out, err];
    }
    let child = child_process.spawn(theScript, parameters, this.options);
    return child;  
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
* Formats and stores an array of directories to ignore
* @this {customshell}
* @method
* @param {Array} ignored Directories to be ignored
*/
customshell.ignore = function(ignored){
    if(Array.isArray(ignored) && ignored.length){
        let ignoredPath = ignored.map( ignoree => fs.realpathSync(ignoree) );            
        this.ignored    = [...ignoredPath];
    }
}
/**
* Add your own options 
* @this {customshell}
* @method
* @param {Object} options
* @see Options <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options">Options</a>
* @return {Object} shell
*/
customshell.setOptions = function(options){
    this.options = {...options};
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
* Nothing happens until create()
* @this {customshell}
* @method
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/
// TODO: some serious refactoring
customshell.create = function(){
    if(!this.hasOptions)
      this.options = this.defaults;
    if(this.isNode){
        const theModule  = this.nodeModule.shift();
        const parameters = this.nodeModule || [];
        if(this.cd) this.options.cwd = this.dir;
        if(this.hasTree) return this.nodeTree(theModule, parameters);
        if(this.hasFile){
            let out            = fs.openSync(this.file, this.flag);
            let err            = fs.openSync(this.file, this.flag);
            this.options.stdio = ['ignore', out, err];
        }
        let child = child_process.spawn('node', [theModule, parameters], this.options);
        return child; 
    }
    if(this.hasRun){
        this.options.shell = true;
        const theScript    = this.script.shift();
        const parameters   = this.script || [];
        if(this.cd) this.options.cwd = this.dir;
        if(this.hasTree) return this.runTree(theScript, parameters);
        if(this.hasFile){
            let out            = fs.openSync(this.file, this.flag);
            let err            = fs.openSync(this.file, this.flag);
            this.options.stdio = ['ignore', out, err];
        }
        let child = child_process.spawn(theScript, parameters, this.options);
        return child;
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
