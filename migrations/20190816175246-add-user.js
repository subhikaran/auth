'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
    db.createTable('users1',{
    	id:{
      type:'int',
      primaryKey:true	
    },
    name:{
    	type:'string',
    	length:100
    },
    email:{
    	type:'string',
    	length:100
    },
    hash:{
    	type:'string',
    	length:100
    },
},function(err){
	if(err) return
		callback(err);
	return callback();
});
};

exports.down = function(db,callback) {
  db.dropTable('users1',callback);
};

exports._meta = {
  "version": 1
};
