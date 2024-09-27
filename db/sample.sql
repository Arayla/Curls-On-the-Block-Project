-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 27, 2019 at 01:14 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sampledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

drop table if exists styles;
create table styles
(
	style_name VARCHAR(100),
    style_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    primary key (style_id)
);

drop table if exists categories;
create table categories
(
	category_id int unsigned not null auto_increment,
    category_name varchar(100),
    primary key (category_id)
);

drop table if exists styles_has_categories;
create table styles_has_categories
(
	connection_id int unsigned not null auto_increment,
    style_name varchar(100),
    combo_number int unsigned,
    category_name varchar(100),
    
   -- foreign key (style_name) references styles(style_name),
   -- foreign key (category_name) references categories(category_name),
    primary key (connection_id)
);

drop table if exists ingredients;
create table ingredients
(
	ingredient_id int unsigned not null auto_increment,
    ingredient_name varchar(100),
    ingredient_description varchar(1000),
    ingredient_risks varchar(1000),
    ingredient_benefits varchar(1000),
    
    primary key (ingredient_id)
);

drop table if exists products;
create table products
(
	product_id int unsigned not null auto_increment,
	full_product_name varchar(200),
    brand varchar(1000),
    category_name varchar(100),
    price_per_container DECIMAL(5,2),
    price_per_oz DECIMAL(4,2),
	
    porosity_score int,
    course_score int,
    density_score int,
    length_score int,
    curl_type int,
    
    primary key (product_id)
);

drop table if exists products_has_ingredients;
create table products_has_ingredients
(
	connection_id int unsigned not null auto_increment,
    ingredient_id int unsigned,
    product_id int unsigned,
   
    foreign key (ingredient_id) references ingredients(ingredient_id),
    foreign key (product_id) references products(product_id),
    primary key (connection_id)
);

-- Insert Dummy Data
insert into styles(style_name) values
('Braids'),
('French Twist'),
('Pony Tail'),
('Bun');

insert into categories(category_name) values
('Shampoo'),
('Conditioner'),
('Mousse'),
('Gel'),
('Detangler');

insert into styles_has_categories(style_name,category_name,combo_number) values
('Braids','Conditioner',1),
('Braids','Mousse',1),
('Braids','Conditioner',2),
('Braids','Gel',2),
('Pony Tail','Conditioner',1),
('Pony Tail','Detangler',1),
('Pony Tail','Gel',2),
('French Twist','Mousse',1),
('French Twist','Detangler',2),
('French Twist','Conditioner',2),
('Bun','Conditioner',1),
('Bun','Conditioner',2),
('Bun','Shampoo',2);


insert into ingredients(ingredient_name, ingredient_description, ingredient_risks, ingredient_benefits) values
('Bad_ingredient_1','A very bad ingredient... you do not want','hair falls out','none'),
('Bad_ingredient_2','An ok ingredient I guess', 'hair may fall out', 'smells okay'),
( 'Good_ingredient','Pretty solid ingredient','hair may feel slightly rough','good for that shiny factor'),
('Great_ingredient','A wonderful and cool ingredient','None','Pretty good for all aspects of hair'),
('Amazing_ingredient','The perfect ingredient. I literally could not think of anything better','None','Perfect. Perfect. Perfect.');

insert into products(full_product_name, brand,category_name,price_per_container,price_per_oz,porosity_score,course_score,density_score,length_score,curl_type) values
('Product1','Brand1','Shampoo',20,1.5,1,1,1,1,1),
('Product2','Brand1','Conditioner',15,1,3,1,1,1,1),
('Product3','Brand2','Mousse',10,3,3,4,5,4,3),
('Product4','Brand2','Shampoo',13,2,2,2,3,4,1),
('Product5','Brand3','Mousse',30,7,3,2,4,1,2),
('Product6','Brand3','Detangler',20,5,3,2,4,5,6),
('Product7','Brand2','Shampoo',30,1.75,2,3,2,1,1),
('Product8','Brand2','Conditioner',25,1.4,1,2,1,2,4),
('Product9','Brand3','Mousse',22,5,2,4,2,5,1),
('Product10','Brand3','Shampoo',35,4,1,3,2,1,5),
('Product11','Brand1','Mousse',10,1.1,2,1,5,1,2),
('Product12','Brand1','Detangler',25,4,3,2,4,5,6),
('Product13','Brand3','Shampoo',20,1.3,2,4,1,2,1),
('Product14','Brand3','Conditioner',30,1.8,2,4,2,1,3),
('Product15','Brand1','Mousse',15,2,3,2,1,2,1),
('Product16','Brand1','Shampoo',23,2.4,3,1,3,2,5),
('Product17','Brand2','Mousse',15,1.5,3,2,2,3,1),
('Product18','Brand2','Detangler',13,2,3,3,2,4,3);

insert into products_has_ingredients(ingredient_id,product_id) values
(1,1),(1,3),(1,4),(1,15),(1,13),(2,18),(2,5),(2,4),(2,1),(2,12),
(3,2),(3,6),(3,7),(3,8),(3,9),(3,10),(4,11),(4,12),(4,14),(4,16),(2,17);

--
-- Commit the transaction to save the changes
--
COMMIT;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sample`
--

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sample`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;