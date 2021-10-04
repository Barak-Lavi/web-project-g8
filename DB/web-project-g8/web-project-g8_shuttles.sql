CREATE DATABASE  IF NOT EXISTS `web-project-g8` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `web-project-g8`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: web-project-g8
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `shuttles`
--

DROP TABLE IF EXISTS `shuttles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shuttles` (
  `ID` varchar(255) NOT NULL,
  `current_location` varchar(30) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `departure_date` date DEFAULT NULL,
  `ticket_price` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shuttles`
--

LOCK TABLES `shuttles` WRITE;
/*!40000 ALTER TABLE `shuttles` DISABLE KEYS */;
INSERT INTO `shuttles` VALUES ('AA-1','Earth','Mars','2021-11-01',20000,200),('AA-2','Earth','Mars','2021-11-02',20000,200),('AA-3','Earth','Mars','2021-11-03',20000,200),('AA-4','Earth','Mars','2021-11-04',20000,200),('AB-16','Mars','Earth','2023-11-01',20000,200),('AM-1','Earth','Venus','2021-12-01',30000,200),('AM-2','Earth','Jupiter','2021-12-02',50000,200),('AM-3','Earth','Jupiter','2021-12-03',50000,200),('ARFS-2','ISS','Earth','2021-12-02',15000,500),('AS-1','Earth','ISS','2021-11-01',15000,500),('AS-2','Earth','ISS','2021-11-02',15000,500),('AS-3','Earth','ISS','2021-11-03',15000,500),('AV-1','Earth','Venus','2021-11-01',20000,200),('AV-2','Earth','Venus','2021-11-02',20000,200),('AV-3','Earth','Venus','2021-11-03',20000,200),('BC-77','Mars','Earth','2023-11-03',20000,200),('DE-1','Venus','Earth','2023-11-01',20000,200),('FB-5','Mars','Earth','2023-11-05',20000,200),('RF-1','ISS','Earth','2021-12-01',15000,500),('RF-3','ISS','Earth','2021-11-30',15000,500),('SS-2','Venus','Earth','2024-11-02',20000,200),('VB-3','Venus','Earth','2024-11-03',20000,200),('VB-4','Mars','Earth','2023-11-04',20000,200),('WW-1','Venus','Earth','2022-12-01',30000,200),('WW-2','Jupiter','Earth','2022-12-02',50000,200),('WW-3','Jupiter','Earth','2023-12-03',50000,200);
/*!40000 ALTER TABLE `shuttles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-04 15:19:06
