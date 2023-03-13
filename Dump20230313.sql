-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fema_schema
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `app user`
--

DROP TABLE IF EXISTS `app user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app user` (
  `user_id` int NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_phone` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `app user_chk_2` CHECK ((`user_type` in (_utf8mb4'fema',_utf8mb4'laborer',_utf8mb4'driver',_utf8mb4'distribution center',_utf8mb4'supplier',_utf8mb4'f',_utf8mb4'l',_utf8mb4'd',_utf8mb4'dc',_utf8mb4's'))),
  CONSTRAINT `app user_chk_3` CHECK ((`user_type` in (_utf8mb4'fema',_utf8mb4'laborer',_utf8mb4'driver',_utf8mb4'distribution center',_utf8mb4'supplier',_utf8mb4'f',_utf8mb4'l',_utf8mb4'd',_utf8mb4'dc',_utf8mb4's'))),
  CONSTRAINT `app user_chk_4` CHECK ((`user_type` in (_utf8mb4'f',_utf8mb4'l',_utf8mb4'd',_utf8mb4'dc',_utf8mb4's',_utf8mb4'fema',_utf8mb4'laborer',_utf8mb4'driver',_utf8mb4'distribution center',_utf8mb4'supplier'))),
  CONSTRAINT `app user_chk_5` CHECK ((`user_type` in (_utf8mb4'f',_utf8mb4'l',_utf8mb4'd',_utf8mb4'dc',_utf8mb4's')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app user`
--

LOCK TABLES `app user` WRITE;
/*!40000 ALTER TABLE `app user` DISABLE KEYS */;
INSERT INTO `app user` VALUES (1,'John Doe','johndoe@example.com','1234567890','f'),(2,'Chris Chris','chris@example.com',NULL,'s'),(3,'Wesley Martin','wm@example.com',NULL,'dc'),(4,'T Brugg','t@example.com',NULL,'d'),(5,'Jane Doe','janedoe@example.com',NULL,'d'),(6,'Qwerty Uiop','qwerty@example.com',NULL,'l'),(7,'Boing Boing','boing@example.com',NULL,'dc');
/*!40000 ALTER TABLE `app user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distribution center`
--

DROP TABLE IF EXISTS `distribution center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distribution center` (
  `dc_user_id` int NOT NULL,
  `street` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`dc_user_id`),
  CONSTRAINT `dc_user_id` FOREIGN KEY (`dc_user_id`) REFERENCES `app user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distribution center`
--

LOCK TABLES `distribution center` WRITE;
/*!40000 ALTER TABLE `distribution center` DISABLE KEYS */;
INSERT INTO `distribution center` VALUES (3,'qwerty','jkl','we','4576'),(7,'uiop','uiop','io','987');
/*!40000 ALTER TABLE `distribution center` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `d_user_id` int NOT NULL,
  PRIMARY KEY (`d_user_id`),
  CONSTRAINT `d_user_id` FOREIGN KEY (`d_user_id`) REFERENCES `app user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (4),(5);
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers transporting items`
--

DROP TABLE IF EXISTS `drivers transporting items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers transporting items` (
  `d_driver` int NOT NULL,
  `i_request` int NOT NULL,
  PRIMARY KEY (`d_driver`,`i_request`),
  KEY `i_request_id_idx` (`i_request`),
  CONSTRAINT `d_driver` FOREIGN KEY (`d_driver`) REFERENCES `driver` (`d_user_id`),
  CONSTRAINT `i_request` FOREIGN KEY (`i_request`) REFERENCES `item request` (`i_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers transporting items`
--

LOCK TABLES `drivers transporting items` WRITE;
/*!40000 ALTER TABLE `drivers transporting items` DISABLE KEYS */;
/*!40000 ALTER TABLE `drivers transporting items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fema`
--

DROP TABLE IF EXISTS `fema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fema` (
  `f_user_id` int NOT NULL,
  PRIMARY KEY (`f_user_id`),
  CONSTRAINT `f_user_id` FOREIGN KEY (`f_user_id`) REFERENCES `app user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fema`
--

LOCK TABLES `fema` WRITE;
/*!40000 ALTER TABLE `fema` DISABLE KEYS */;
INSERT INTO `fema` VALUES (1);
/*!40000 ALTER TABLE `fema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item request`
--

DROP TABLE IF EXISTS `item request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item request` (
  `i_request_id` int NOT NULL,
  `item_name` varchar(45) NOT NULL,
  `item_quantity` int NOT NULL,
  `destination_street` varchar(45) DEFAULT NULL,
  `destination_city` varchar(45) DEFAULT NULL,
  `destination_state` varchar(2) DEFAULT NULL,
  `destination_zip` varchar(5) DEFAULT NULL,
  `current_street` varchar(45) DEFAULT NULL,
  `current_city` varchar(45) DEFAULT NULL,
  `current_state` varchar(2) DEFAULT NULL,
  `current_zip` varchar(5) DEFAULT NULL,
  `completion_status` varchar(45) NOT NULL DEFAULT 'requested',
  `f_orderer` int NOT NULL,
  `s_supplier` int DEFAULT NULL,
  `dc_intermediate` int DEFAULT NULL,
  PRIMARY KEY (`i_request_id`),
  KEY `f_user_id_idx` (`f_orderer`),
  KEY `s_user_id_idx` (`s_supplier`),
  KEY `dc_nearest_idx` (`dc_intermediate`),
  CONSTRAINT `dc_intermediate` FOREIGN KEY (`dc_intermediate`) REFERENCES `supplier` (`dc_nearest`),
  CONSTRAINT `f_orderer` FOREIGN KEY (`f_orderer`) REFERENCES `fema` (`f_user_id`),
  CONSTRAINT `s_supplier` FOREIGN KEY (`s_supplier`) REFERENCES `supplier` (`s_user_id`),
  CONSTRAINT `item request_chk_1` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `item request_chk_2` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `item request_chk_3` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `item request_chk_4` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `item request_chk_5` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `item request_chk_6` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item request`
--

LOCK TABLES `item request` WRITE;
/*!40000 ALTER TABLE `item request` DISABLE KEYS */;
INSERT INTO `item request` VALUES (1,'shirts',45,'uiop','uiop','io','987','xcvb','xcvb','vb','76533','requested',1,2,3),(2,'pants',54,'uiop','uiop','io','987','xcvb','xcvb','vb','76533','requested',1,2,3);
/*!40000 ALTER TABLE `item request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labor request`
--

DROP TABLE IF EXISTS `labor request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labor request` (
  `l_request_id` int NOT NULL,
  `labor_description` varchar(90) DEFAULT NULL,
  `begin_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `labor_street` varchar(45) DEFAULT NULL,
  `labor_city` varchar(45) DEFAULT NULL,
  `labor_state` varchar(2) DEFAULT NULL,
  `labor_zip` varchar(5) DEFAULT NULL,
  `completion_status` varchar(45) NOT NULL DEFAULT 'requested',
  `f_requester` int NOT NULL,
  `l_volunteer` int DEFAULT NULL,
  PRIMARY KEY (`l_request_id`),
  UNIQUE KEY `begin_date_UNIQUE` (`begin_date`),
  UNIQUE KEY `end_date_UNIQUE` (`end_date`),
  KEY `f_user_id_idx` (`f_requester`) /*!80000 INVISIBLE */,
  KEY `l_user_id_idx` (`l_volunteer`),
  CONSTRAINT `f_requester` FOREIGN KEY (`f_requester`) REFERENCES `fema` (`f_user_id`),
  CONSTRAINT `l_volunteer` FOREIGN KEY (`l_volunteer`) REFERENCES `laborer` (`l_user_id`),
  CONSTRAINT `labor request_chk_1` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `labor request_chk_2` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `labor request_chk_3` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `labor request_chk_4` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `labor request_chk_5` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete'))),
  CONSTRAINT `labor request_chk_6` CHECK ((`completion_status` in (_utf8mb4'requested',_utf8mb4'committed',_utf8mb4'en route',_utf8mb4'complete')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labor request`
--

LOCK TABLES `labor request` WRITE;
/*!40000 ALTER TABLE `labor request` DISABLE KEYS */;
INSERT INTO `labor request` VALUES (1,'sweep streets','2024-09-20','2024-09-25','sadf','asdf','AZ','2134','requested',1,6);
/*!40000 ALTER TABLE `labor request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laborer`
--

DROP TABLE IF EXISTS `laborer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laborer` (
  `l_user_id` int NOT NULL,
  PRIMARY KEY (`l_user_id`),
  CONSTRAINT `l_user_id` FOREIGN KEY (`l_user_id`) REFERENCES `app user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laborer`
--

LOCK TABLES `laborer` WRITE;
/*!40000 ALTER TABLE `laborer` DISABLE KEYS */;
INSERT INTO `laborer` VALUES (6);
/*!40000 ALTER TABLE `laborer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `s_user_id` int NOT NULL,
  `street` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(5) DEFAULT NULL,
  `dc_nearest` int NOT NULL,
  PRIMARY KEY (`s_user_id`),
  KEY `dc_user_id_idx` (`dc_nearest`),
  CONSTRAINT `dc_nearest` FOREIGN KEY (`dc_nearest`) REFERENCES `distribution center` (`dc_user_id`),
  CONSTRAINT `s_user_id` FOREIGN KEY (`s_user_id`) REFERENCES `app user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (2,'xcvb','xcvb','vb','76533',3);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-13 15:34:26
