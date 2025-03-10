DROP DATABASE IF EXISTS curlsDB;
CREATE DATABASE curlsDB;
USE curlsDB;

-- phpMyAdmin SQL Dump
-- Updated schema for Curls On the Block project
-- Generation Time: [Current Date]
-- Server version: 5.7.x

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Character set configuration
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sampledb`
--

-- --------------------------------------------------------
-- Table structure for table `styles`
--
DROP TABLE IF EXISTS styles;
CREATE TABLE styles
(
    style_name VARCHAR(100),
    style_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (style_id)
);

-- --------------------------------------------------------
-- Table structure for table `categories`
--
DROP TABLE IF EXISTS categories;
CREATE TABLE categories
(
    category_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(100),
    PRIMARY KEY (category_id)
);

-- --------------------------------------------------------
-- Table structure for table `styles_has_categories`
--
DROP TABLE IF EXISTS styles_has_categories;
CREATE TABLE styles_has_categories
(
    connection_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    style_name VARCHAR(100),
    combo_number INT UNSIGNED,
    category_name VARCHAR(100),
    PRIMARY KEY (connection_id)
);

-- --------------------------------------------------------
-- Table structure for table `ingredients`
--
DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients
(
    ingredient_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ingredient_name VARCHAR(100),
    ingredient_description VARCHAR(1000),
    ingredient_risks VARCHAR(1000),
    ingredient_benefits VARCHAR(1000),
    PRIMARY KEY (ingredient_id)
);

-- --------------------------------------------------------
-- Table structure for table `products`
--
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    product_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    full_product_name VARCHAR(200),
    brand VARCHAR(1000),
    category_name VARCHAR(100),
    price_per_container DECIMAL(5,2),
    price_per_oz DECIMAL(4,2),
    porosity_score INT,
    course_score INT,
    density_score INT,
    length_score INT,
    curl_type INT,
    PRIMARY KEY (product_id)
);

-- --------------------------------------------------------
-- New table for barcodes (one-to-one with products)
--
DROP TABLE IF EXISTS barcodes;
CREATE TABLE barcodes
(
    barcode CHAR(16) NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (barcode),
    UNIQUE (product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- --------------------------------------------------------
-- Table structure for table `products_has_ingredients`
--
DROP TABLE IF EXISTS products_has_ingredients;
CREATE TABLE products_has_ingredients
(
    connection_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    ingredient_id INT UNSIGNED,
    product_id INT UNSIGNED,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    PRIMARY KEY (connection_id)
);

-- --------------------------------------------------------
-- Insert Dummy Data
--

-- Dummy data for styles
INSERT INTO styles(style_name) VALUES
('Braids'),
('French Twist'),
('Pony Tail'),
('Bun');

-- Dummy data for categories
INSERT INTO categories(category_name) VALUES
('Shampoo'),
('Conditioner'),
('Mousse'),
('Gel'),
('Detangler');

-- Dummy data for styles_has_categories
INSERT INTO styles_has_categories(style_name, category_name, combo_number) VALUES
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

-- Dummy data for ingredients
INSERT INTO ingredients(ingredient_name, ingredient_description, ingredient_risks, ingredient_benefits) VALUES
('Bad_ingredient_1','A very bad ingredient... you do not want','hair falls out','none'),
('Bad_ingredient_2','An ok ingredient I guess', 'hair may fall out', 'smells okay'),
('Good_ingredient','Pretty solid ingredient','hair may feel slightly rough','good for that shiny factor'),
('Great_ingredient','A wonderful and cool ingredient','None','Pretty good for all aspects of hair'),
('Amazing_ingredient','The perfect ingredient. I literally could not think of anything better','None','Perfect. Perfect. Perfect.');

-- Dummy data for products
INSERT INTO products(full_product_name, brand, category_name, price_per_container, price_per_oz, porosity_score, course_score, density_score, length_score, curl_type) VALUES
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
('Product18','Brand2','Detangler',13,2,3,3,2,4,3),
('Product19','Brand1','Gel',25,2,2,2,2,2,2),
('Product20','Brand2','Gel',25,1,2,3,4,5,1),
('Product21','Brand3','Gel',25,4,1,1,3,2,1),
('Product22','Brand4','Gel',25,3,5,3,1,1,2);

-- Dummy data for barcodes (each barcode is a unique 16-digit string linked to a product)
INSERT INTO barcodes(barcode, product_id) VALUES
('0000000000000001', 1),
('0000000000000002', 2),
('0000000000000003', 3),
('0000000000000004', 4),
('0000000000000005', 5),
('0000000000000006', 6),
('0000000000000007', 7),
('0000000000000008', 8),
('0000000000000009', 9),
('0000000000000010', 10),
('0000000000000011', 11),
('0000000000000012', 12),
('0000000000000013', 13),
('0000000000000014', 14),
('0000000000000015', 15),
('0000000000000016', 16),
('0000000000000017', 17),
('0000000000000018', 18),
('0000000000000019', 19),
('0000000000000020', 20),
('0000000000000021', 21),
('0000000000000022', 22);

-- Dummy data for products_has_ingredients
INSERT INTO products_has_ingredients(ingredient_id, product_id) VALUES
(1,1),(1,3),(1,4),(1,15),(1,13),
(2,18),(2,5),(2,4),(2,1),(2,12),
(3,2),(3,6),(3,7),(3,8),(3,9),(3,10),
(4,11),(4,12),(4,14),(4,16),(2,17);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
