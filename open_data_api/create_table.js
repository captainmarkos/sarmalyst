var fs = require('fs');

/*\
| | Parse a json file and generate 'create table' sql.
\*/

var data = JSON.parse(fs.readFileSync('record.json', 'utf8'));

var sql = '\n\nCREATE TABLE `test` (\n';
    sql +='`id` int(11) NOT NULL AUTO_INCREMENT,\n';

for(var prop in data) {
    if(!data.hasOwnProperty(prop)) { continue; }
    sql += '`' + prop + '` varchar(255),\n';
}
sql += 'PRIMARY KEY (`id`),\n';
sql += 'UNIQUE KEY `id` (`id`)\n';
sql += ') ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8\n\n';

console.log(sql);
