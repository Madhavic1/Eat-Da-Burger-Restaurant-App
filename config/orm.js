//Import MySql connection
var connection = require('../config/connection.js');

function printQuestionMarks(n){
    var arr= [];
    for(let i=0; i<n ; i++){
        arr.push("?");
    }
    return arr.toString();
}

//ObjectToSql is a helper function which converts an object containig key:value pair to a string in the form of key = value
function ObjectToSql(obj){
    let arr = [];
    for(var key in obj)
    {
        var value = obj[key];
        //check to skip hidden properties 
        if(Object.hasOwnProperty.call(obj,key)){
            //if the value is a string with spaces , add quotations to the entire string
            if(typeof value === "string" && value.indexOf(" ") >= 0)
            {
                value = "'"+value+"'";
            }
        }
        arr.push(key+"="+value);
    }
    return arr.toString();
}

var orm = {
    selectAll: function(tableName,cb){ 
        var queryString = "SELECT * FROM "+ tableName + ";";
        connection.query(queryString,function(err,result){
            if(err)
            {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(tableName,cols,vals,cb){ 
        var queryString = "INSERT INTO "+ tableName ;
            queryString +=  "(" + cols.toString() + ")"; 
            queryString += "VALUES ";
            queryString += "(" + printQuestionMarks(vals.length) + ")";
            console.log(queryString);
         connection.query(queryString,vals,function(err,result){
             if(err)
                throw err;
            cb(result);
         });
    },
    updateOne: function(tableName,colValObj,condition,cb){ 
    var queryString = "UPDATE " + tableName + " SET " + ObjectToSql(colValObj) + " WHERE " + condition;
    console.log(queryString);
    connection.query(queryString,function(err,result){
        if(err)
        {
            throw err;
        }
        cb(result);
    });
    }
};
// Export the ORM object in module.exports.
module.exports = orm ;