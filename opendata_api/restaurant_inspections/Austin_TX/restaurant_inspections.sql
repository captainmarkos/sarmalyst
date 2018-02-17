CREATE TABLE `restaurant_inspections` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(256),
  `address` varchar(256),
  `city` varchar(64),
  `state` varchar(64),
  `zip` varchar(64),
  `lat` varchar(64),
  `lng` varchar(64),
  `score` int(8),
  `inspection_date` date,
  `process_description` varchar(256),
  `facility_id` int(8),
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
