
http://data.austintexas.gov


https://dev.socrata.com/foundry/data.austintexas.gov/nguv-n54k



Download the data
-----------------
curl 'https://data.austintexas.gov/resource/nguv-n54k.json?$where=inspection_date%3E"2017-01-01"&$order=inspection_date&$limit=50000' > 2017.json


Run the following scripts
-------------------------
~/> node import_data.js
--> total records:  9659

~/> node generate_singles.js
--> files_written 5037

~/> node generate_city_directory.js
--> files_written:  19
