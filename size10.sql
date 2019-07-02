-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 02, 2019 at 10:07 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `size10`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `order_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `credit_card` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `order_items` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `brand` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `colorway` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `price` smallint(5) UNSIGNED NOT NULL,
  `image` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `brand`, `name`, `colorway`, `price`, `image`, `description`) VALUES
(1, 'Nike', 'Air Max 1', 'Fourth of July', 14000, './media/1-1.png', 'As a follow up to the Air Max 1 \"USA\" release in 2003, \"Fourth of July\" amplifies the OG 2003 colorway with an updated narrative. For a fresh take, this latest Air Max 1 arrives with inverted color blocking compared to the original and three different sets of laces so you can style it your way. The woven tongue features a patch with 13 stars around the \"NIKE AIR\" logo and an American flag is proudly showcased on the heel.'),
(2, 'Nike', 'Zoom Lebron III', 'Houston', 17500, './media/2-1.png', 'Introduced in 2005, the Zoom LeBron III equipped a young LeBron James with everything he needed to jumpstart his now storied basketball career. The performance-driven basketball silhouette would transcend its original purpose to become a fan-favorite LeBron silhouette. Continuing the model\'s retro return, the Zoom LeBron III now arrives in the once player exclusive \"Houston\" colorway.'),
(3, 'Jordan', 'Air Jordan I', 'Sail/Gym Red', 16000, './media/3-1.png', 'Until the Air Jordan I, game shoes in the league were mostly white due to the strict rules at the time. To differentiate itself from any other shoe, the Air Jordan I was released in multiple colors that led to a $5000 dollar fine per game and helped lay the foundation for what sneaker culture would become. Paying homage to Jordan Brand and MJ\'s heritage, this Air Jordan I features black, white, Sail and Gym Red for a new twist on familiar color blocking.'),
(4, 'Nike', 'Drop-Type', 'Summit White', 7500, './media/4-1.png', 'Part of the N354 family, the Nike Drop-Type LX takes inspiration from classic tennis shoes in the NikeCourt collection. Its distinct design lines, autoclave tooling and low-profile upper channel a raw, experimental edge on an iconic look. The silhouette blends various materials on the upper and handwritten-esque \"N.354\" branding is featured above the elevated midsole.'),
(5, 'Nike', 'AF1-Type', 'Summit White', 14000, './media/5-1.png', 'Part of the N354 family, the Nike AF1-Type reimagines the classic streetwear staple with a hand-made aesthetic. The silhouette utilizes transparent materials to show off its unique closure system and versatile styling options. An adjustable strap on the heel gives you a custom fit while the upper features handwritten-esque \"N.354\" branding and visible stitching details.'),
(6, 'Nike', 'Kobe IV Protro', 'Black/Del Sol', 18000, './media/6-1.png', 'Seizing the moment, Kobe channeled his inner mamba mentality to lead his team to a championship in 2009. That year, he was wearing the Zoom Kobe IV, a revolutionary design that paved the way for low-cut footwear on the hardwood. Adding to Kobe\'s performance-driven \"Protro\" series, the Kobe IV returns with improvements to enhance comfort and outfitted in the \'Black/Del-Sol-Varsity Purple\' colorway we first saw in 2009.'),
(7, 'Nike', 'Adapt BB', 'Wolf Grey', 35000, './media/7-1.png', 'Designed to give you a customized, consistent fit, the Nike Adapt BB is our first power lacing shoe that\'s built for basketball. Now in a color scheme that first inspired a future vision of footwear, it adapts to your foot to provide a locked-in feel for distraction-free play. Pair it with the Nike adapt app to fine-tune the fit and customize the features from your smartphone.'),
(8, 'Nike', 'Air Tech Challenge II', 'Hot Lava', 13000, './media/8-1.png', 'The Air Tech Challenge II made its debut in 1990 and returns to its roots over two decades later in the original \"Hot Lava\" colorway. Arriving in legendary form, the tennis silhouette was designed to meet the high demands of tournament play through superior durability, flexibility, cushioning and traction.'),
(9, 'Jordan', 'Air Jordan XI Low', 'Light Bone', 18500, './media/9-1.png', 'Following the Air Jordan XI Navy release, this latest colorway continues to celebrate the 23-year anniversary of the silhouette MJ won his fourth title with. The Air Jordan XI Low \"Light Bone\" arrives with a python-inspired snakeskin pattern that sits on top of a sail translucent outsole - the red accents throughout pay homage to the heritage of Jordan Brand.'),
(10, 'Nike', 'Kobe IV Protro', 'White/Del Sol', 18000, './media/10-1.png', 'A champion once again, Kobe and his teammates victoriously paraded through the streets of LA in 2009 to celebrate their championship success. In the parade, Kobe wore the shoes that helped him win his fourth ring and paved the way for low-cut footwear on the hardwood with a revolutionary design - the Zoom Kobe IV. Adding to Kobe\'s performance-driven \"Protro\" series, the Kobe IV returns with improvements to enhance comfort and outfitted in the \'White/Del-Sol\' colorway we first saw in 2009.'),
(11, 'Nike', 'Lebron 16', 'Hot White Lava', 20000, './media/11-1.png', 'Embodying LeBron\'s defiant mentality, his latest silhouette draws inspiration from the rebellious spirit of one of Nike\'s boldest silhouettes. With the iconic splatter pattern hits at the heel, top label on the tongue and perforated leather along the upper, the LeBron 16 \'Hot Lava White\' presents a modernized take on the classic shoe.'),
(12, 'Nike', 'Classic Cortez SE', 'OG', 7500, './media/12-1.png', 'Inspired by the first Nike running shoe ever, the Classic Cortez SE improves on the original with a durable leather upper, a low-cut fit around the ankle, and plush cushioning. The newest release delivers a throwback colorway that\'s pure Americana.'),
(13, 'Nike', 'Stranger Things Blazer Mid', 'Hawkins High', 12000, './media/13-1.png', 'In the summer of 1985, several transport vehicles departed from Nike HQ in Beaverton, Oregon, carrying special product shipments headed to multiple locations across the US. Unfortunately, a few of the shipments never made it to their destination. These vehicles all had one thing in common...they were last seen on surveillance footage passing through Hawkins, Indiana. Nike, concerned and confused, never mentioned these missing shipments to anyone for fear that something supernatural was at play. 34 years later, signs of the missing shipments are popping up, piece by piece, and it\'s clear that there is something deeper, darker and more evil brewing. Fortunately, some of the missing shipments have been located. Their contents are what we now know as iconic Nike styles: the Cortez, Blazer and Air Tailwind \'79. Introduced alongside matching apparel, these classic Nike silhouettes were originally intended for the Hawkins High Athletic Dept and feature green and orange color combos with Hawkins High logos. Each shoe comes complete with original-inspired Nike packaging and special edition pins.'),
(14, 'Nike', 'Stranger Things Cortez', 'Hawkins High', 12000, './media/14-1.png', 'In the summer of 1985, several transport vehicles departed from Nike HQ in Beaverton, Oregon, carrying special product shipments headed to multiple locations across the US. Unfortunately, a few of the shipments never made it to their destination. These vehicles all had one thing in common...they were last seen on surveillance footage passing through Hawkins, Indiana. Nike, concerned and confused, never mentioned these missing shipments to anyone for fear that something supernatural was at play. 34 years later, signs of the missing shipments are popping up, piece by piece, and it\'s clear that there is something deeper, darker and more evil brewing. Fortunately, some of the missing shipments have been located. Their contents are what we now know as iconic Nike styles: the Cortez, Blazer and Air Tailwind \'79. Introduced alongside matching apparel, these classic Nike silhouettes were originally intended for the Hawkins High Athletic Dept and feature green and orange color combos with Hawkins High logos. Each shoe comes complete with original-inspired Nike packaging and special edition pins.'),
(15, 'Nike', 'Stranger Things Air Tailwind', 'Hawkins High', 12000, './media/15-1.png', 'In the summer of 1985, several transport vehicles departed from Nike HQ in Beaverton, Oregon, carrying special product shipments headed to multiple locations across the US. Unfortunately, a few of the shipments never made it to their destination. These vehicles all had one thing in common...they were last seen on surveillance footage passing through Hawkins, Indiana. Nike, concerned and confused, never mentioned these missing shipments to anyone for fear that something supernatural was at play. 34 years later, signs of the missing shipments are popping up, piece by piece, and it\'s clear that there is something deeper, darker and more evil brewing. Fortunately, some of the missing shipments have been located. Their contents are what we now know as iconic Nike styles: the Cortez, Blazer and Air Tailwind \'79. Introduced alongside matching apparel, these classic Nike silhouettes were originally intended for the Hawkins High Athletic Dept and feature green and orange color combos with Hawkins High logos. Each shoe comes complete with original-inspired Nike packaging and special edition pins.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
