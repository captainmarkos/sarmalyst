var fs = require('fs');
var mustache = require('mustache');

var google_search_link = function(r) {
    var query  = '';
    if(r.restaurant_name) { r.restaurant_name.replace(/\s+/g, '+'); }
    if(r.address_address) { query += '+' + r.address_address.replace(/\s+/g, '+'); }
    if(r.address_city)    { query += '+' + r.address_city.replace(/\s+/g, '+'); }
    if(r.address_state)   { query += '+' + r.address_state.replace(/\s+/g, '+'); }

    return 'http://www.google.com/search?q=' + query;
};

var single_file_name = function(r, suffix) {
    suffix = suffix ? suffix : (new Date).getTime().toString();
    var name = r.restaurant_name;

    name = name.replace(/[\/\'\.\&\,\@\(\)\"\#]/g, '');
    name = name.replace(/[\s+]/g, '-') +
           '-' + suffix + '.html';

    name = name.replace(/^\-/, '');

    return name;
};

try {
    var template = fs.readFileSync('templates/single.html', 'utf8');

    var json_data = fs.readFileSync('2017.json', 'utf8');

    var files_written = 0;
    var data = JSON.parse(json_data);
    console.log('--> data.length: ', data.length);

    for(var i = 0; i < data.length; i++) {
        data[i].inspection_date = data[i].inspection_date.match(/\d+-\d+-\d+/)[0];
        data[i].restaurant_link_google = google_search_link(data[i]);

        var content = mustache.render(template, data[i]);
        var restaurant_name = data[i].restaurant_name;
        if(restaurant_name) {
            var file_name = single_file_name(data[i], i);

            fs.writeFileSync('html/restaurants/' + file_name, content);
            files_written++;
        }
        data[i].single_file_name = 'restaurants/' + file_name;
    }

    template = fs.readFileSync('templates/singles_index.html', 'utf8');
    content = mustache.render(template, { restaurants: data });
    fs.writeFileSync('html/' + 'singles_index.html', content);
    files_written++;

    console.log('--> files_written', files_written);
} catch(e) {
    console.log('Exception caught: ' + e.toString());
}

