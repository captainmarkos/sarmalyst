var fs = require('fs');
var mysql = require('mysql');
var mustache = require('mustache');
var utils = require('./utils');
var dbutils = require('./dbutils');


var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sarmalyst'
});

var TEMPLATE_DIR = './templates/';
var HTML_DIR = './html/';
var OUTPUT_DIR = HTML_DIR + 'restaurants/';


(function() {
    var template = fs.readFileSync(TEMPLATE_DIR + 'single.html', 'utf8');
    var files_written = 0;

    db.connect(dbutils.status);

    var sql = 'SELECT * FROM restaurant_inspections_dallas_tx ORDER BY program_identifier';
    db.query(sql, function(err, data) {
        for(var i = 0; i < data.length; i++) {
            data[i].google_search_link = utils.google_search_link(data[i]);
            data[i].insp_date = data[i].insp_date.toString().replace(/00:00:00.+/, '');

            data[i].map_url = 'https://www.google.com/maps/search/?api=1&query=' +
                              data[i].site_address + ' ' +
                              data[i].city + ' ' +
                              data[i].state + ' ' +
                              data[i].zip;

            var content = mustache.render(template, data[i]);
            var name = utils.clean_restaurant_name(data[i].program_identifier);
            //console.log('--> name: ', name);

            if(name) {
                var file_name = utils.single_file_name(name, i);
                fs.writeFileSync(OUTPUT_DIR + file_name, content);
                files_written++;
            }
            data[i].single_file_name = 'restaurants/' + file_name;
        }

        template = fs.readFileSync(TEMPLATE_DIR + 'singles_index.html', 'utf8');
        content = mustache.render(template, { restaurants: data });
        fs.writeFileSync(HTML_DIR + 'singles_index.html', content);
        files_written++;
        console.log('--> files_written', files_written);
    });

    db.end(dbutils.status);
})();
