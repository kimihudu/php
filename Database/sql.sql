CREATE DATABASE `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8 */;
use ecommerce;

CREATE TABLE `login` (
  `user` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `userType` varchar(5) NOT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `customers` (
  `CustomerID` varchar(20) NOT NULL,
  `CompanyName` varchar(50) DEFAULT NULL,
  `ContactName` varchar(50) DEFAULT NULL,
  `ContactTitle` varchar(50) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Region` varchar(50) DEFAULT NULL,
  `PostalCode` varchar(50) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `Fax` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `products` (
  `Product_ID` int(2) NOT NULL,
  `Product_Name_` varchar(32) DEFAULT NULL,
  `Supplier_ID` int(2) DEFAULT NULL,
  `Category_ID` int(2) DEFAULT NULL,
  `QuantityPerUnit_` varchar(20) DEFAULT NULL,
  `Unit_Price` decimal(5,2) DEFAULT NULL,
  `Units_In_Stock` int(3) DEFAULT NULL,
  `Units_On_Order` int(3) DEFAULT NULL,
  `Reorder_Level` int(3) DEFAULT NULL,
  `Discontinued_` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

CREATE TABLE `orders` (
  `OrderID` int(5) NOT NULL,
  `CustomerID` varchar(5) DEFAULT NULL,
  `EmployeeID` int(1) DEFAULT NULL,
  `OrderDate` varchar(19) DEFAULT NULL,
  `RequiredDate` varchar(19) DEFAULT NULL,
  `ShippedDate` varchar(19) DEFAULT NULL,
  `ShipVia` int(1) DEFAULT NULL,
  `Freight` decimal(6,2) DEFAULT NULL,
  `ShipName` varchar(34) DEFAULT NULL,
  `ShipAddress` varchar(46) DEFAULT NULL,
  `ShipCity` varchar(15) DEFAULT NULL,
  `ShipRegion` varchar(13) DEFAULT NULL,
  `ShipPostalCode` varchar(9) DEFAULT NULL,
  `ShipCountry` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

CREATE TABLE `orderdetails` (
  `OrderID` int(5) DEFAULT NULL,
  `ProductID` int(2) DEFAULT NULL,
  `UnitPrice` decimal(5,2) DEFAULT NULL,
  `Quantity` int(3) DEFAULT NULL,
  `Discount` decimal(11,10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

