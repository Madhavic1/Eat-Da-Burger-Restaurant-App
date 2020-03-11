var orm = require('../config/orm');

var burger = {
    selectAll : function(cb){
        orm.selectAll("burgers",function(result){
            cb(result);
        });
    },
    insertOne : function(cols,vals,cb){
        orm.insertOne("burgers",cols,vals,function(result){
            cb(result);
        });
    },
    updateOne : function(colValObj,condition,cb){
        orm.updateOne("burgers",colValObj,condition,function(result){
            cb(result);
        });
    }
};

module.exports = burger;