//Import MySql connection
var connection = require('../config/connection.js');

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

// selectAll()
// insertOne()
// updateOne()
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
}

var orm = {
    selectAll: function(tableName,cb){ //select * from burgers
        var queryString = "SELECT * FROM "+ tableName + ";";
        connection.query(queryString,function(err,result){
            if(err)
            {
                throw err;
            }
            cb(result);
        });

    },
    insertOne: function(tableName,cols,vals,cb){ //INSERT INTO burgers (burger_name,devoured) values ('Vegan BBQ Tofu Burger',false);
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
    updateOne: function(tableName,colValObj,condition,cb){ //UPDATE burgers SET burger_name = 'chick pea burger' , devoured = false where id = 1;
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