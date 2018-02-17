var fs = require('fs');
var mysql = require('mysql');

var dbstatus = function(err) {
    if(err) {
        var msg = err;
        if(err.stack) { msg = err.stack; }
        console.error('dbstatus: ' + msg);
    }
    return;

};

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bluewild'
});

var data = JSON.parse(fs.readFileSync('2017.json', 'utf8'));

db.connect(dbstatus);

for(var i = 0; i < data.length; i++) {

    var lat = '', lng = '';
    if(data[i].address && data[i].address.coordinates) {
        lat = data[i].address.coordinates[1];
        lng = data[i].address.coordinates[0];
    }
    var inspection_date = data[i].inspection_date.split(/T/)[0];
    var name = data[i].restaurant_name.replace(/\"/g, "'");

    var sql = 'INSERT INTO restaurant_inspections (name, address, city, ' +
              'state, zip, lat, lng, score, inspection_date, ' +
              'process_description, facility_id) ' +
              'VALUES (' +
              '"' + name + '", ' +
              '"' + data[i].address_address + '", ' +
              '"' + data[i].address_city + '", ' +
              '"' + data[i].address_state + '", ' +
              '"' + data[i].address_zip + '", ' +
              '"' + lat + '", ' +
              '"' + lng + '", ' +
              data[i].score + ', ' +
              '"' + inspection_date + '", ' +
              '"' + data[i].process_description + '", ' +
              data[i].facility_id + ')';

    db.query(sql, dbstatus);
}

// sql = 'select * from restaurant_inspections group by facility_id order by name';
sql = 'select count(*) as total from restaurant_inspections;';
db.query(sql, function(err, res) {
  console.log('--> total records: ', res[0].total);
});

db.end(dbstatus);
