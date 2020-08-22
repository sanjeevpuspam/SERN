const db 				= require('../Config/db');
const helperResponse 	= require('../Public/createResponse');
const helper 			= require('../Public/helper');
const tableName         = helper.tableName.task;
const currentDate       = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');

module.exports = {
    getAll: function(req, res){
        var query 		= `SELECT * FROM ${tableName} where 1 order by id DESC`;
        db.getResults(query,function(err,result){
			if(!err){
                helperResponse.CreateResponse(true, "Success",result, function (response) {
                    res.send(response);
                });
			} else {
                helperResponse.CreateResponse(false, "Something went wrong",result, function (response) {
                    res.send(response);
                });
			}
		});
    },
    insert: function(req, res){
        var name = req.body.name;
        var shopName = req.body.shop_name;
        var status = req.body.status;

        var post = {name:name, shop_name: shopName, status: status};
        var query = `INSERT INTO ${tableName} SET ?`;
        db.getResults(query, function(err,result){
            if(!err){
                helperResponse.CreateResponse(true, "Added shop successfully", result, function (response) {
                    res.send(response);
                });
            } else {
                helperResponse.CreateResponse(false, "Something went wrong",result, function (response) {
                    res.send(response);
                });
            }
        },post);
    },
    update : function(req, res){
        var id          = parseInt(req.body.id);
        var name        = req.body.name;
        var status      = req.body.status;
        var query = `UPDATE ${tableName} SET NAME = '${name}', STATUS= '${status}', updated_at= '${currentDate}' WHERE id =?`
        try {
            db.getResults(query,function(err,result){
                if(!err){
                    helperResponse.CreateResponse(true, "Shop updated successfully",result, function (response) {
                        res.send(response);
                    });
                } else {
                    helperResponse.CreateResponse(false, "Something went wrong",result, function (response) {
                        res.send(response);
                    });
                }
            },id);
        } catch (error) {
            console.log(`Error in=> ${error}`);
        }
        
    },
    delete: function(req, res){
        var id = req.params.id;
        var query = `DELETE FROM ${tableName} WHERE id=?`;
        db.getResults(query,function(err,result){
            if(!err){
                helperResponse.CreateResponse(true, "Data deleted successfully",result, function (response) {
                    res.send(response);
                });	
            } else {
                helperResponse.CreateResponse(false, "Something went wrong",result, function (response) {
                    res.send(response);
                });	
            }
        },id);
    }
}