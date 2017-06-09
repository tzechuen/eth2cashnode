#
# SQL Export
# Created by Querious (1068)
# Created: 10 June 2017 at 12:26:32 am AEST
# Encoding: Unicode (UTF-8)
#


CREATE DATABASE IF NOT EXISTS `eth2cash` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
USE `eth2cash`;




SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


CREATE TABLE `traders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) DEFAULT NULL,
  `tokenAddress` varchar(128) DEFAULT NULL,
  `paymentAddress` varchar(128) DEFAULT NULL,
  `currency` varchar(16) DEFAULT NULL,
  `region` varchar(256) DEFAULT NULL,
  `country` varchar(256) DEFAULT NULL,
  `type` enum('buy','sell') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


CREATE TABLE `trades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `traderTokenAddress` varchar(128) DEFAULT NULL,
  `traderPaymentAddress` varchar(128) DEFAULT NULL,
  `traderUsername` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tradeeTokenAddress` varchar(128) DEFAULT NULL,
  `tradeePaymentAddress` varchar(128) DEFAULT NULL,
  `tradeeUsername` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ethAmount` double DEFAULT '0',
  `status` enum('open','accepted','completed') DEFAULT 'open',
  `currency` varchar(16) DEFAULT NULL,
  `region` varchar(256) DEFAULT NULL,
  `country` varchar(256) DEFAULT NULL,
  `details` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('buy','sell') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


