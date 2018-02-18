/*\
|*| dbutils.js
\*/

module.exports = {
    dbstatus: function(err) {
        if(err) {
            var msg = err;
            if(err.stack) { msg = err.stack; }
            console.error('dbstatus: ' + msg);
        }
        return;
    }

};
