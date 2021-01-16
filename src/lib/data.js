var fs = require('fs');
var path = require('path');

var lib = {};


lib.baseDir = path.join(__dirname,'/../.data/');

lib.create = function(dir,file,data,callback) {
	fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor) {
		if(!err && fileDescriptor) {
			var stringData = JSON.stringify(data);

			fs.writeFile(fileDescriptor,stringData,function(err) {
				if(!err) {
					fs.close(fileDescriptor,(err) => {
						if(!err) {
							callback(false);
						}
						else {
							callback('Error occured while closing file');
						}
					});
				}
				else {
					callback('error occured while writing to new file');
				}
			});
		}
		else {
			console.log('Cannot create file, already exist');
		}
	})
};



lib.read = function(dir,file,callback) {
	fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8',function(err,data) {
		callback(err,data);
	});
};



lib.update = function(dir,file,data,callback) {

	fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor) {
		if(!err && fileDescriptor) {
			var stringData = JSON.stringify(data);

			  fs.truncate(fileDescriptor,function(err) {

				if(!err)
				{
					fs.writeFile(fileDescriptor,stringData,function(err) {
						if(!err) {
							fs.close(fileDescriptor,(err) => {
								if(!err) {
									callback(false);
								}
								else {
									callback('Error occured while closing file');
								}
							});
						}
						else {
							callback('error occured while Updating');
						}
					});
				}
				else {
					callback('Error truncating file');
				}
			});
		}
		else {
			console.log('File does not exist to update');
		}
	});
};

lib.delete = function(dir,file,callback) {
	fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err) {
		if(!err) {
			callback(false);
		}
		else {
			callback('Error while deleting');
		}
	});
};

module.exports=lib;
