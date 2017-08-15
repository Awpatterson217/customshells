const fs           = require('fs');
const path         = require('path');
const util         = require('util');
const EventEmitter = require('events').EventEmitter;

module.exports = Branch;

function Branch(){

    this.directories = {};
    this.errors      = {
        readdirErrors:    [],
        readdirNulls:     0,
        readdirUndefined: 0,
        statSync:         0,
    }               

    this.on('found', (directory) =>{
        console.log(directory);
        this.scanFolder(directory);
    });

    this.scanFolder = function(dir){
        const fullPath = fs.realpathSync(dir);
        this.directories[fullPath] = false;
        fs.readdir(fullPath, (err, items) => {
            if(err)
              this.errors.readdirErrors = err; 
            if(items === null)               
              this.errors.readdirErrors++;
            if(items === undefined)               
              this.errors.readdirUndefined++;
            if(!(items === null) && !(items === undefined)){
                if (!items.length) 
                  this.directories[fullPath] = true;
                items.map((item) => {
                    return path.join(fullPath, item);
                }).filter((path) => {
                    try {
                        return fs.statSync(path).isDirectory();
                    } catch (err) {
                        this.errors.statSync++;
                    }
                }).forEach((foundDirectory) => {
                    this.emit('found', foundDirectory);
                });
            }
            this.directories[fullPath] = true;
            let searchComplete = true;
            let directories = Object.keys(this.directories);
            directories.forEach( (directory) => {
                if(!this.directories[directory]){
                    searchComplete = false;
                }
            });
            if(!searchComplete){
                return
            }
            let totalDirFound = 0;
            directories.forEach( (dir) => {
                totalDirFound++;
            });
            this.emit('finished', totalDirFound, this.errors.statSync);
        });
        return;
    }

};

util.inherits(Branch, EventEmitter);
