const fs           = require('fs');
const path         = require('path');
const util         = require('util');
const EventEmitter = require('events').EventEmitter;

module.exports = Tree;

/**
 * Creates an instance of Branch.
 *
 * @constructor
 * @this {Branch}
 * 
 */
function Tree(){

    this.directories = {};
    this.ignored     = [];
    this.errors      = {
        statSync: []
    }               

    this.on('dir', dir =>{
        this.getBranch(dir);
    });

    this.getBranch = function(dir, ignored = []){
        const dirPath = fs.realpathSync(dir);

        this.ignore(ignored);
        if(this.shouldIgnore(dirPath)) return;

        this.directories[dirPath] = false;

        fs.readdir(dirPath, (err, items) => {
            //if(err) // TODO: emit error
            if(!(items === null) && !(items === undefined)){
                if (!items.length) this.directories[dirPath] = true;
                items.map( item => path.join(dirPath, item) )
                .filter( path => {
                    try {
                        return fs.statSync(path).isDirectory();
                    } catch (err) {
                        this.errors.statSync.push(err);
                    }
                }).forEach( directory => this.emit('dir', directory));
            }
            this.directories[dirPath] = true;
            let assumeComplete = true;

            let directories = Object.keys(this.directories);
            
            directories.forEach( (directory) => {
                if(!this.directories[directory]) assumeComplete = false;
            });

            if(!assumeComplete) return;
            this.emit('complete', directories.length, this.errors.statSync.length, this.errors.statSync);
            return;
        });
        return;
    }

    this.ignore = function(ignored){
        if(Array.isArray(ignored) && ignored.length){
            let ignoredPath = ignored.map( ignoree => fs.realpathSync(ignoree) );            
            this.ignored = [...ignoredPath];
        }
    }

    this.shouldIgnore = function(dirPath){
        let shouldIgnore = false;
        this.ignored.forEach( ignoree => {
            if(dirPath === ignoree) shouldIgnore = true;
        });
        return shouldIgnore;
    }

};

util.inherits(Tree, EventEmitter);
