"use strict";
/**
 * @fileOverview The customshell factory
 */
const child_process = require('child_process');
const fs            = require('fs');
const path          = require('path');
const Tree          = require('tree-trav').Tree;
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
    hasNode:    false,
    hasRun:     false,
    hasFile:    false,
    hasTree:    false,
};
/**
* Reset customShell
* @method
* @return {Object} customshell
*/
customshell.reset = function(){
    this.options    = {};
    this.nodeModule = [];
    this.ignored    = [];
    this.script     = [];
    this.hasOptions = false;
    this.hasNode    = false;
    this.hasRun     = false;
    this.hasFile    = false;
    this.hasTree    = false;
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
* Run a Node.js module
* @method
* @param {string} nodeModule
* @return {Object} customshell
*/
customshell.node = function(...nodeModule){
    let copied    = [...nodeModule];
    let theModule = copied.shift();
    this.nodeModule.push(fs.realpathSync(theModule));
    if(copied instanceof Array)
        this.nodeModule = this.nodeModule.concat(copied);    
    else 
        this.nodeModule.push(copied);
    this.hasNode = true;
    return this;
}
/**
* Run a script
* @method
* @param {string} script
* @return {Object} customshell
*/
customshell.run = function(...script){
    let copied    = [...script];
    let theScript = copied.shift();
    this.script.push(fs.realpathSync(theScript));    
    if(copied instanceof Array)
        this.script = this.script.concat(copied);    
    else 
        this.script.push(copied);
    this.hasRun = true;
    return this;
}
/**
* Run a module/script recursively through directories
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
* @method
* @param {string} theScript Script file to run
* @param {Array} parameters Optional parameters
* @see tree-trav <a "href="https://github.com/Awpatterson217/tree-trav">tree-trav</a>
* @listens module:Tree~dir
*/
customshell.runTree = function(theScript, parameters){
  /**
    * Instantiaties the Tree object 
    * @see tree-trav <a "href="https://github.com/Awpatterson217/tree-trav">tree-trav</a>
    * @listens module:Tree~dir
    */
    let _T = new Tree();
    _T.getBranch(this.dir, this.ignored);
    this.options.cwd = this.dir;
    this.sp(theScript, parameters);
    _T.on('dir', dir => {
        this.options.cwd = fs.realpathSync(dir);
        this.sp(theScript, parameters);
    });
}
/**
* Runs the Tree() method and spawns new child_process
* @method
* @param {string} theModule The Node.js module to run
* @param {Array} parameters Optional parameters
* @listens module:Tree~dir
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/
customshell.nodeTree = function(theModule, parameters){
  /**
    * Instantiaties the Tree object 
    * @see tree-trav <a href="https://github.com/Awpatterson217/tree-trav">tree-trav</a>
    * @listens module:Tree~dir
    */
    let _T = new Tree();
    _T.getBranch(this.dir, this.ignored);
    this.options.cwd = this.dir;
    this.spNode(theModule, parameters);
    _T.on('dir', dir => {
        this.options.cwd = fs.realpathSync(dir);
        this.spNode(theModule, parameters);
    });
}
/**
* Spawns new child process with chosen script file
* 'sp' is short for spawn
* @method
* @param {string} theScript The script file to run
* @param {Array} parameters Optional parameters
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/
customshell.sp = function(theScript, parameters){
    if(this.hasFile){
        let out  = fs.openSync(
            this.file,
            this.flag
        );
        let err = fs.openSync(
            this.file,
            this.flag
        );
        this.options.stdio = [
            'ignore', 
            out, 
            err
        ];
    }
    let child = child_process.spawn(
        theScript, 
        parameters, 
        this.options
    );
    return child;  
  }
  /**
* Spawns new child process with chosen Node.js module
* @method
* @param {string} theModule The Node.js module to run
* @param {Array} parameters Optional parameters
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process}
*/
customshell.spNode = function(theModule, parameters){
    if(this.hasFile){
        let out  = fs.openSync(
            this.file,
            this.flag
        );
        let err = fs.openSync(
            this.file,
            this.flag
        );
        this.options.stdio = [
            'ignore',
            out,
            err
        ];
    }
    let child = child_process.spawn('node', [
        theModule,
        parameters
        ],
        this.options
    );
    return child;
}
/**
* Run a module/script in a new working directory
* @method
* @param {string} dir
* @return {Object} customshell 
*/
customshell.at = function(dir){
    this.dir         = fs.realpathSync(dir);
    this.options.cwd = this.dir;
    this.hasOptions = true;    
    return this;
}                                               
/**
* Formats and stores an array of directories to ignore
* @method
* @param {Array} ignored Directories to be ignored
*/
customshell.ignore = function(ignored){
    let iPath;
    if(Array.isArray(ignored)){
        if(ignored.length){
            iPath = ignored.map(ignoree => {
                return fs.realpathSync(ignoree);
            });            
            this.ignored = [...iPath];
            return;
        }
    }
    return;    
}
/**
* Add your own options 
* @method
* @param {Object} options
* @see Options <a href="https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options">Options</a>
* @return {Object} customshell
*/
customshell.setOptions = function(options){
    this.options    = {...options};
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
    let fpath     = path.normalize(shell);
    const options = {
        stdio:    'ignore',
        detached: true,
        shell:    true
    }
    let child = child_process.spawn('start', [
            fpath
        ], 
        options
    );
    child.unref();
    return child;
}
/**
* Nothing happens until create()
* @method
* @see ChildProcess <a href="http://https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_class_childprocess.com">child_process</a>
* @return {child_process} 
*/
customshell.create = function(){
    if(!this.hasOptions)
      this.options = this.defaults;
    if(this.hasNode){
        const theModule  = this.nodeModule.shift();
        const parameters = this.nodeModule || [];
        if(this.hasTree) 
            return this.nodeTree(theModule, parameters);
        return this.spNode(theModule, parameters); 
    }
    if(this.hasRun){
        this.options.shell = true;
        const theScript    = this.script.shift();
        const parameters   = this.script || [];
        if(this.hasTree) 
            return this.runTree(theScript, parameters);
        return this.sp(theScript, parameters);
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
