

CREATE TABLE `restaurant_inspections_dallas_tx` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`insp_date` date,
`inspection_year` varchar(255),
`lat` varchar(255),
`lng` varchar(255),
`lat_long_address` varchar(255),
`month` varchar(255),
`program_identifier` varchar(255),
`score` int(11),
`site_address` varchar(255),
`street_name` varchar(255),
`street_number` varchar(255),
`street_type` varchar(255),
`street_unit` varchar(255),
`type` varchar(255),
`violation1_description` varchar(255),
`violation1_memo` varchar(255),
`violation1_points` varchar(255),
`violation1_text` varchar(255),
`violation2_description` varchar(255),
`violation2_points` varchar(255),
`violation2_text` varchar(255),
`violation3_description` varchar(255),
`violation3_memo` varchar(255),
`violation3_points` varchar(255),
`violation3_text` varchar(255),
`violation4_description` varchar(255),
`violation4_memo` varchar(255),
`violation4_points` varchar(255),
`violation4_text` varchar(255),
`zip` varchar(255),
PRIMARY KEY (`id`),
UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8


