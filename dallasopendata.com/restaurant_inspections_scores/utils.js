/*\
|*| utils.js
\*/

module.exports = {
    clean_restaurant_name: function(name) {
        if(!name) { return ''; }
        name = name.replace(/[\/\'\.\&\,\@\(\)\"\#\\]/g, '');
        name = name.replace(/[\s+]/g, '-');
        return name.replace(/^\-/, '');
    },
    google_search_link: function(record) {
        var query  = '';
        if(record.name)    { query += record.name.replace(/\s+/g, '+'); }
        if(record.address) { query += '+' + record.address.replace(/\s+/g, '+'); }
        if(record.city)    { query += '+' + record.city.replace(/\s+/g, '+'); }
        if(record.state)   { query += '+' + record.state.replace(/\s+/g, '+'); }
        return 'http://www.google.com/search?q=' + query;
    },
    single_file_name: function(restaurant_name, suffix) {
        suffix = suffix ? suffix : (new Date).getTime().toString();
        var name = this.clean_restaurant_name(restaurant_name);
        return name + '-' + suffix + '.html';
    },
    gather_cities: function(data) {
        var h = {};
        for(var i = 0; i < data.length; i++) {
            if(data[i].city) {
                if(!h[data[i].city]) {
                    h[data[i].city] = [this.single_file_name(data[i].name, i)];
                } else {
                    h[data[i].city].push(this.single_file_name(data[i].name, i));
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
    }
};
