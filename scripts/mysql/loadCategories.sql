# loadCategories.sql
LOAD DATA LOCAL INFILE 'Categories.csv' INTO TABLE my_Category FIELDS TERMINATED BY ',';
