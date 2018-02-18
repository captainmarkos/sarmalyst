var fs = require('fs');
var mysql = require('mysql');
var geocoder = require('geocoder');

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
    database: 'sarmalyst'
});

var TABLE_NAME = 'restaurant_inspections_dallas_tx';
var violation_fields = 'violation1_description, violation1_memo, violation1_points, violation1_text, ' +
                       'violation2_description, violation2_memo, violation2_points, violation2_text, ' +
                       'violation3_description, violation3_memo, violation3_points, violation3_text, ' +
                       'violation4_description, violation4_memo, violation4_points, violation4_text, ' +
                       'violation5_description, violation5_memo, violation5_points, violation5_text, ' +
                       'violation6_description, violation6_memo, violation6_points, violation6_text, ' +
                       'violation7_description, violation7_memo, violation7_points, violation7_text, ' +
                       'violation8_description, violation8_memo, violation8_points, violation8_text, ' +
                       'violation9_description, violation9_memo, violation9_points, violation9_text, ' +
                       'violation10_description, violation10_memo, violation10_points, violation10_text';

var data = JSON.parse(fs.readFileSync('response.json', 'utf8'));

db.connect(dbstatus);

for(var i = 0; i < data.length; i++) {
    // some data pre-processing
    var tmp;

    data[i].street_unit = data[i].street_unit ? data[i].street_unit : '';
    data[i].street_type = data[i].street_type ? data[i].street_type : '';

    tmp = data[i].program_identifier.trim();
    if(tmp) data[i].program_identifier = tmp.replace(/[\"\'\\"]/g, '');

    tmp = data[i].program_identifier.trim();
    if(tmp) data[i].program_identifier = tmp.replace(/^11-Jul/, '7-Eleven');
    tmp = data[i].program_identifier.trim();
    if(tmp) data[i].program_identifier = tmp.replace(/^7-7-ELEVEN/, '7-Eleven');
    tmp = data[i].program_identifier.trim();
    if(tmp) data[i].program_identifier = tmp.replace(/^7-11/, '7-Eleven');
    tmp = data[i].program_identifier.trim();
    if(tmp) data[i].program_identifier = tmp.replace(/^7-ELEVEN/, '7-Eleven');
    tmp = data[i].program_identifier.trim();
    if(tmp) data[i].program_identifier = tmp.replace(/^7-ElevenCON/, '7-Eleven CON');

    tmp = data[i].violation1_description;
    if(tmp) data[i].violation1_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation2_description;
    if(tmp) data[i].violation2_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation3_description;
    if(tmp) data[i].violation3_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation4_description;
    if(tmp) data[i].violation4_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation5_description;
    if(tmp) data[i].violation5_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation6_description;
    if(tmp) data[i].violation6_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation7_description;
    if(tmp) data[i].violation7_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation8_description;
    if(tmp) data[i].violation8_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation9_description;
    if(tmp) data[i].violation9_description = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation10_description;
    if(tmp) data[i].violation10_description = tmp.replace(/[\"\'\\]/g, '');

    tmp = data[i].violation1_text;
    if(tmp) data[i].violation1_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation2_text;
    if(tmp) data[i].violation2_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation3_text;
    if(tmp) data[i].violation3_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation4_text;
    if(tmp) data[i].violation4_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation5_text;
    if(tmp) data[i].violation5_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation6_text;
    if(tmp) data[i].violation6_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation7_text;
    if(tmp) data[i].violation7_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation8_text;
    if(tmp) data[i].violation8_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation9_text;
    if(tmp) data[i].violation9_text = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation10_text;
    if(tmp) data[i].violation10_text = tmp.replace(/[\"\'\\]/g, '');

    tmp = data[i].violation1_memo;
    if(tmp) data[i].violation1_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation2_memo;
    if(tmp) data[i].violation2_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation3_memo;
    if(tmp) data[i].violation3_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation4_memo;
    if(tmp) data[i].violation4_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation5_memo;
    if(tmp) data[i].violation5_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation6_memo;
    if(tmp) data[i].violation6_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation7_memo;
    if(tmp) data[i].violation7_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation8_memo;
    if(tmp) data[i].violation8_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation9_memo;
    if(tmp) data[i].violation9_memo = tmp.replace(/[\"\'\\]/g, '');
    tmp = data[i].violation10_memo;
    if(tmp) data[i].violation10_memo = tmp.replace(/[\"\'\\]/g, '');
}

for(var i = 0; i < data.length; i++) {
    data[i].city = 'Dallas';
    data[i].state = 'TX';

    var sql = build_query(data[i]);
    db.query(sql, dbstatus);
}

var sql = 'SELECT count(*) as total FROM ' + TABLE_NAME ;
db.query(sql, function(err, res) {
    console.log('--> total records: ', res[0].total);
});

db.end(function() { });

function build_query(data) {
    var sql;

    var lat = '', lng = '';
    if(data.lat_long && data.lat_long.coordinates) {
        lat = data.lat_long.coordinates[1].toString();
        lng = data.lat_long.coordinates[0].toString();
    }

    var insp_date = data.insp_date.split(/T/)[0];

    sql = 'INSERT INTO ' + TABLE_NAME + ' ' +
          '(insp_date, inspection_year, lat, lng, lat_long_address, month, ' +
          'program_identifier, score, site_address, street_name, street_number, ' +
          'street_type, street_unit, city, state, zip, type, ' + violation_fields + ') ' +
          'VALUES (' +
          '"' + insp_date + '", ' +

          '"' + data.inspection_year + '", ' +
          '"' + lat + '", ' +
          '"' + lng + '", ' +
          '"' + data.lat_long_address + '", ' +
          '"' + data.month + '", ' +
          '"' + data.program_identifier + '", ' +
          '"' + data.score + '", ' +
          '"' + data.site_address + '", ' +
          '"' + data.street_name + '", ' +
          '"' + data.street_number + '", ' +
          '"' + data.street_type + '", ' +
          '"' + data.street_unit + '", ' +
          '"' + data.city + '", ' +
          '"' + data.state + '", ' +
          '"' + data.zip + '", ' +
          '"' + data.type + '", ' +

          '"' + (data.violation1_description ? data.violation1_description : '') + '", ' +
          '"' + (data.violation1_memo ? data.violation1_memo : '') + '", ' +
          '"' + (data.violation1_points ? data.violation1_points : '') + '", ' +
          '"' + (data.violation1_text ? data.violation1_text : '') + '", ' +

          '"' + (data.violation2_description ? data.violation2_description : '') + '", ' +
          '"' + (data.violation2_memo ? data.violation2_memo : '') + '", ' +
          '"' + (data.violation2_points ? data.violation2_points : '') + '", ' +
          '"' + (data.violation2_text ? data.violation2_text : '') + '", ' +

          '"' + (data.violation3_description ? data.violation3_description : '') + '", ' +
          '"' + (data.violation3_memo ? data.violation3_memo : '') + '", ' +
          '"' + (data.violation3_points ? data.violation3_points : '') + '", ' +
          '"' + (data.violation3_text ? data.violation3_text : '') + '", ' +

          '"' + (data.violation4_description ? data.violation4_description : '') + '", ' +
          '"' + (data.violation4_memo ? data.violation4_memo : '') + '", ' +
          '"' + (data.violation4_points ? data.violation4_points : '') + '", ' +
          '"' + (data.violation4_text ? data.violation4_text : '') + '", ' +

          '"' + (data.violation5_description ? data.violation5_description : '') + '", ' +
          '"' + (data.violation5_memo ? data.violation5_memo : '') + '", ' +
          '"' + (data.violation5_points ? data.violation5_points : '') + '", ' +
          '"' + (data.violation5_text ? data.violation5_text : '') + '", ' +

          '"' + (data.violation6_description ? data.violation6_description : '') + '", ' +
          '"' + (data.violation6_memo ? data.violation6_memo : '') + '", ' +
          '"' + (data.violation6_points ? data.violation6_points : '') + '", ' +
          '"' + (data.violation6_text ? data.violation6_text : '') + '", ' +

          '"' + (data.violation7_description ? data.violation7_description : '') + '", ' +
          '"' + (data.violation7_memo ? data.violation7_memo : '') + '", ' +
          '"' + (data.violation7_points ? data.violation7_points : '') + '", ' +
          '"' + (data.violation7_text ? data.violation7_text : '') + '", ' +

          '"' + (data.violation8_description ? data.violation8_description : '') + '", ' +
          '"' + (data.violation8_memo ? data.violation8_memo : '') + '", ' +
          '"' + (data.violation8_points ? data.violation8_points : '') + '", ' +
          '"' + (data.violation8_text ? data.violation8_text : '') + '", ' +

          '"' + (data.violation9_description ? data.violation9_description : '') + '", ' +
          '"' + (data.violation9_memo ? data.violation9_memo : '') + '", ' +
          '"' + (data.violation9_points ? data.violation9_points : '') + '", ' +
          '"' + (data.violation9_text ? data.violation9_text : '') + '", ' +

          '"' + (data.violation10_description ? data.violation10_description : '') + '", ' +
          '"' + (data.violation10_memo ? data.violation10_memo : '') + '", ' +
          '"' + (data.violation10_points ? data.violation10_points : '') + '", ' +
          '"' + (data.violation10_text ? data.violation10_text : '') + '"' +

          ')';

    return sql;
}

// Now gecode the zip code and add the city and state.
/*
sql = 'SELECT id, city, zip FROM ' + TABLE_NAME ;
var dataset = [];
db.query(sql, function(err, res) {
    var i;

    for(i = 0; i < res.length; i++) {
        dataset.push({ id: res[i].id, city: res[i].city, state: res[i].state, zip: res[i].zip });
    }

    for(i = 0; i < dataset.length; i++) {
        if(dataset[i].city) { continue; }
        if(i >= 5) { break; }

        console.log('--> geocoding zip code: ', dataset[i].zip);
        geocoder.geocode(dataset[i].zip, function(err, geo) {
            var city, state;
            if(geo && geo.results[0] && geo.results[0].address_components) {
                city = geo.results[0].address_components[1].long_name;
                state = geo.results[0].address_components[3].short_name;
            }
            city = city ? city : '';
            state = state ? state : '';

            sql = 'UPDATE ' + TABLE_NAME + ' SET city="' + city + '", ' +
                  'state="' + state + '" WHERE id=' + dataset[i].id;
            db.query(sql, dbstatus);
        });
    }
});
*/
