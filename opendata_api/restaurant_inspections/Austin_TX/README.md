
Download the data
-----------------
curl 'https://data.austintexas.gov/resource/nguv-n54k.json?$where=inspection_date%3E"2017-01-01"&$order=inspection_date&$limit=50000' > 2017.json


Run the following scripts
-------------------------
~> node generate_singles.js 
~> node generate_city_directory.js 

