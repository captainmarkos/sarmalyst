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
var OUTPUT_DIR = HTML_DIR + 'cities/';

var files_written = 0;
(function() {
    var template = fs.readFileSync(TEMPLATE_DIR + 'cities_index.html', 'utf8');

    db.connect(dbutils.status);

    var sql = 'SELECT * FROM restaurant_inspection_scores GROUP BY facility_id ORDER BY name';
    db.query(sql, function(err, data) {
        var list = utils.gather_cities(data);

        var content = mustache.render(template, { results: list });
        fs.writeFileSync(HTML_DIR + 'cities_index.html', content);
        files_written++;

        for(var i = 0; i < list.length; i++) {
            template = fs.readFileSync(TEMPLATE_DIR + 'city.html', 'utf8');
            content = mustache.render(template, list[i]);

            var file_name = list[i].city.toLowerCase().replace(/\s+/g, '-') + '.html';
            fs.writeFileSync(OUTPUT_DIR + file_name, content);
            files_written++;
        }

        console.log('--> files_written: ', files_written);
    });

    db.end(dbutils.status);
})();

