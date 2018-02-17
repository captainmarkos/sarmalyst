var fs = require('fs');
var mustache = require('mustache');

var single_file_name = function(r, suffix) {
    suffix = suffix ? suffix : (new Date).getTime().toString();
    var name = r.restaurant_name;

    name = name.replace(/[\/\'\.\&\,\@\(\)\"\#]/g, '');
    name = name.replace(/[\s+]/g, '-') +
           '-' + suffix + '.html';

    name = name.replace(/^\-/, '');

    return name;
};

var gather_cities = function(data) {
    var h = {};
    for(var i = 0; i < data.length; i++) {
        if(data[i].address_city) {
            if(!h[data[i].address_city]) {
                h[data[i].address_city] = [single_file_name(data[i], i)];
            } else {
                h[data[i].address_city].push(single_file_name(data[i], i));
            }
        }
    }

    var a = [];
    for(var prop in h) {
        if(!h.hasOwnProperty(prop)) { continue; }

        var item = {
            'city': prop,
            'city_file_name': prop.toLowerCase().replace(/\s+/g, '-') + '.html',
            'files': h[prop]
        };
        a.push(item);
    }

    return a;
};

try {
    var template = fs.readFileSync('templates/cities_index.html', 'utf8');

    var json_data = fs.readFileSync('2017.json', 'utf8');

    var data = JSON.parse(json_data);
    var list = gather_cities(data);

    var content = mustache.render(template, { results: list });
    fs.writeFileSync('html/' + 'cities_index.html', content);

    for(var i = 0; i < list.length; i++) {
        template = fs.readFileSync('templates/city.html', 'utf8');
        content = mustache.render(template, list[i]);

        var file_name = list[i].city.toLowerCase().replace(/\s+/g, '-') + '.html';
        fs.writeFileSync('html/cities/' + file_name, content);

    }
} catch(e) {
    console.log('Exception caught: ' + e.toString());
}

