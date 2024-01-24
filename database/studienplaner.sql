-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2023 at 04:27 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studienplaner`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback`) VALUES
('123'),
('a'),
('Enter Feedback here...'),
(''),
('ist eine wirklich tolle app '),
('tolle app oder so');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `id` varchar(25) NOT NULL,
  `name` varchar(70) NOT NULL,
  `leistungspunkte` int(3) NOT NULL,
  `angebotshaeufigkeit` set('WiSe','SoSe','Jedes') NOT NULL,
  `empfohlenesSemesterWise` varchar(7) NOT NULL,
  `empfohlenesSemesterSose` varchar(7) NOT NULL,
  `id_voraussetzung_inhaltlich` varchar(250) NOT NULL,
  `id_voraussetzung_formal` varchar(250) NOT NULL,
  `min_punkte` int(3) NOT NULL,
  `katalog` varchar(7) NOT NULL,
  `pflicht_in` varchar(4) NOT NULL,
  `empfohlen_fuer` varchar(32) NOT NULL,
  `nicht_fuer` varchar(32) NOT NULL,
  `studiengang` set('Informatik') NOT NULL,
  `url` varchar(256) NOT NULL,
  `inhalte` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `name`, `leistungspunkte`, `angebotshaeufigkeit`, `empfohlenesSemesterWise`, `empfohlenesSemesterSose`, `id_voraussetzung_inhaltlich`, `id_voraussetzung_formal`, `min_punkte`, `katalog`, `pflicht_in`, `empfohlen_fuer`, `nicht_fuer`, `studiengang`, `url`, `inhalte`) VALUES
('3WIBA005', 'Anwendungssysteme in Unternehmen', 12, 'WiSe', '5', '4-6', '', '', 0, 'CISS', '', '', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65640&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', 'Architektur von Anwendungssystemen; Auswahl (systematische Make or Bye Entscheidung) und Einführung von Standardsoftware; Lebenszyklus von Anwendungssystemen; operative Anwendungssysteme; Planungssysteme; Führungssysteme (Business Intelligence); Querschnittssysteme; Integrative Anwendungssysteme (ERP, Supply Chain Management und CRM-Systeme); Management von Anwendungssystemen: Business-/IT-Alignment, Akzeptanz von Anwendungssystemen etc. Einführung das Sicherheitsmanagement: Sicherheitsanforderungen, Angreifermodelle, Risikoanalyse, Rechnersicherheit und Sicherheit in verteilten Systemen; kryptographische Verfahren und PK-Infrastrukturen; Usable Privacy & Security Datenschutzgrundverordnung & digitaler Verbraucherschutz Sicherheitsaspekte nach Anwendungsgebieten (z.B. Internet-Sicherheit).'),
('4ETBA001', 'Grundlagen der Elektrotechnik I', 6, 'Jedes', '3-4', '4-5', '', '', 0, 'ES', '', '', 'VC', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65453&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4ETBAEX901', 'Nachrichtentechnik für Informatiker', 6, 'SoSe', '4-6', '5', '', '', 0, 'ES', '', '', 'VC;CISS', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65476&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4ETBAEX902', 'Einführung in die Regelungstechnik für Informatiker', 6, 'SoSe', '4-6', '5', '4MATHBAEX01', '', 0, 'ES', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65474&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4ETMA153', 'Fahrerassistenzsysteme', 6, 'WiSe', '5', '4-6', '', '', 0, 'ES', '', 'CISS', 'VC;MI', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65482&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4ETMA255', 'Communications and Information Security I', 6, 'WiSe', '5', '4-6', '', '', 0, 'ES', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65479&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA002', 'Vertiefung Mathematik', 6, 'WiSe', '3', '4', '4MATHBAEX01', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64704&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA003', 'Algorithmen und Datenstrukturen', 9, 'WiSe', '1', '2', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64707&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', 'Die Vorlesung vermittelt die grundlegenden Fakten, Konzepte und Herangehensweisen der Informatik und dient als solide Basis für die nachfolgenden Studienabschnitte. Überblick über die Geschichte der Informatik Überblick über die Rechnerarchitektur, von Neumann Rechner, CPU Codierung von Zahlen und Zeichen (Gleitkommazahlen, vorzeichenbehaftete ganze Zahlen) Einführung in die Programmiersprache C++ (elementare Anweisungen, erste Grundlagen der Objektorientierung) Einführung in die Konzepte der formalen Sprachen Aussagen- und Prädikatenlogik Einführung in die Komplexitätstheorie Rekursive Algorithmen Dynamische Datenstrukturen (Listen, Stapel, Schlangen, Bäume), Algorithmen auf Baumstrukturen Graphen und elementare Algorithmen auf Graphen Suchalgorithmen, Hashing, Sortieralgorithmen'),
('4INFBA004', 'Objektorientierung und funktionale Programmierung', 9, 'SoSe', '2', '1', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64714&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA005', 'Formale Sprachen und Automaten', 6, 'SoSe', '2-4', '1', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64719&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA006', 'Berechenbarkeit und Logik', 6, 'WiSe', '3-5', '2-6', '4INFBA005', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64722&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA007', 'Softwaretechnik I', 6, 'WiSe', '3-5', '2-6', '4INFBA004', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64725&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA008', 'Datenbanksysteme I', 6, 'WiSe', '1-5', '2-6', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64732&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', 'Einleitend wird das Problem der persistenten Datenverwaltung generell betrachtet, und Datenbanksysteme werden mit anderen Systemen zur persistenten Datenverwaltung verglichen. Danach werden folgende Themen behandelt: Architektur von Informationssystemen und Datenbankmanage-mentsystemen (DBMS) relationale Systeme konzeptionelle Grundlagen und die relationale Algebra Abfragesprache SQL Abfrageverarbeitung und Optimierung Entwurf redundanzfreier Datenbankschemata'),
('4INFBA009', 'Digitaltechnik', 6, 'WiSe', '1', '2-4', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64737&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA010', 'Rechnerarchitekturen I', 6, 'SoSe', '2-6', '3-5', '4INFBA009', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64745&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA011', 'Betriebssysteme und nebenläufige Programmierung', 6, 'SoSe', '4-6', '3-5', '4INFBA003;4INFBA004', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64754&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA012', 'Rechnernetze I', 6, 'SoSe', '2-6', '1', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64896&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA013', 'Introduction to Machine Learning', 6, 'Jedes', '3-6', '2-6', '4MATHBAEX01', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64916&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA014', 'Hardware-Praktikum', 6, 'SoSe', '2-4', '3-5', '4INFBA009', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64919&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA015', 'Programmierpraktikum', 12, 'Jedes', '3-4', '3', '', '4INFBA003;4INFBA004', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64923&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA016', 'Seminar Informatik', 6, 'Jedes', '4-5', '4-5', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64928&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA017', 'Bachelorarbeit', 12, 'Jedes', '6', '6', '', '', 120, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64647&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA020', 'Einführung in Visual Computing', 6, 'WiSe', '3', '2', '4INFBA004;4MATHBAEX01', '', 0, 'Einf', 'VC', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64938&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA021', 'Einführung in Complex and Intelligent Software Systems', 6, 'SoSe', '2', '3', '', '', 0, 'Einf', 'CISS', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64939&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA022', 'Embedded Systems', 6, 'SoSe', '2', '3', '4INFBA009', '', 0, 'Einf', 'ES', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64940&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA030', 'Praktikum Embedded Systems', 6, 'Jedes', '3-6', '4-6', '4INFBA022', '', 0, 'Prakt', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65051&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA031', 'Praktikum Rechnernetze', 6, 'WiSe', '3-5', '4-6', '4INFBA012', '', 0, 'Prakt', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65052&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA032', 'Praktikum Softwaretechnik', 6, 'SoSe', '4', '5', '4INFBA003;4INFBA004;4INFBA015', '', 0, 'Prakt', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65053&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA033', 'Praktikum Computergraphik', 6, 'WiSe', '5', '4', '4INFBA020;4INFBA200', '', 0, 'Prakt', 'VC', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65054&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA100', 'Embedded Control', 6, 'WiSe', '3-5', '4-6', '', '', 0, 'ES', '', 'MI', 'VC', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65442&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA200', 'Computergraphik', 6, 'SoSe', '4', '3', '4INFBA020', '', 0, 'VC', 'VC', 'CISS;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65492&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA201', 'Digitale Bildverarbeitung', 6, 'SoSe', '4', '3', '4INFBA020;4MATHBAEX01', '', 0, 'VC', 'VC', 'ES;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65496&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA202', 'Praktikum Digitale Bildverarbeitung', 6, 'WiSe', '5', '4', '4INFBA020;4INFBA201;4MATHBAEX01', '', 0, 'VC', 'VC', 'ES', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65500&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA203', 'Visuelle Wahrnehmung', 6, 'SoSe', '4-6', '5', '', '', 0, 'VC', '', 'CISS;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65539&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA204', 'Praktikum 3D Modellierung und Animation', 6, 'Jedes', '5-6', '4-6', '', '', 0, 'VC', '', 'MI', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65542&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA300', 'Implementierung von Anwendungssystemen', 12, 'SoSe', '4-6', '5', '', '', 0, 'CISS', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65630&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA302', 'Komplexitätstheorie I', 6, 'WiSe', '3-5', '4-6', '4INFBA006', '', 0, 'CISS', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65626&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA303', 'Verteilte Systeme', 6, 'WiSe', '5', '4-6', '4INFBA004;4INFBA011', '', 0, 'CISS', '', 'ES;VC;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65632&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFBA304', 'Praktikum Machinelles Lernen', 6, 'SoSe', '4-6', '5', '4MATHBAEX01;4INFBA013', '', 0, 'CISS', '', 'ES;VC;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=81667&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA021', 'Modeling and Animation', 6, 'WiSe', '5', '4-6', '4INFBA020;4INFBA200', '', 0, 'VC', '', '', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65503&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA100', 'Development of Embedded Systems using FPGAs', 6, 'WiSe', '3-5', '4-6', '4INFBA009;4INFBA010', '', 0, 'ES', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65236&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA101', 'Praktikum Ubiquitous Systems', 6, 'Jedes', '4-6', '4-6', '4INFBA003', '', 0, 'ES', '', 'VC;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65450&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA103', 'StartUp Entrepreneurship', 6, 'SoSe', '4-6', '5', '', '', 0, 'ES', '', 'CISS;MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=81554&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA200', 'Rendering', 6, 'WiSe', '5', '4-6', '4INFBA020;4INFBA200', '', 0, 'VC', '', '', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65545&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA202', 'Scientific Visualization', 6, 'WiSe', '5', '4-6', '4INFBA020;4INFBA200', '', 0, 'VC', '', '', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65610&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA203', 'Statistical Learning Theory', 6, 'SoSe', '4-6', '3-5', '4INFBA013', '', 0, 'VC', '', 'CISS;MI', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65614&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA207', 'Numerical Methods for Visual Computing', 6, 'WiSe', '5', '4-6', '4MATHBAEX01', '', 0, 'VC', '', '', 'ES;CISS', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65617&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA301', 'Model Checking', 6, 'WiSe', '5', '4-6', '4MATHBAEX11;4INFBA005;4INFBA006', '', 0, 'ES', '', 'CISS', 'VC;MI', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65446&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA308', 'Theoretische Informatik', 6, 'WiSe', '5', '4-6', '4INFBA005;4INFBA006', '', 0, 'CISS', '', '', 'VC;MI', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=70285&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4INFMA312', 'Recommender Systems', 6, 'WiSe', '5', '4-6', '4INFBA004;4INFBA013', '', 0, 'CISS', '', 'MI', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=70286&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4MATHBAEX01', 'Mathematik I', 9, 'SoSe', '2', '1', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64700&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('4MATHBAEX11', 'Diskrete Mathematik', 9, 'WiSe', '1', '2', '', '', 0, 'Pflicht', '', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64697&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', 'In diesem Modul erwerben Studierende der Informatik Grundkennt-nisse in diskreter Mathematik. Die diskrete Mathematik beschäftigt sich, im Gegensatz zur Analysis, mit nicht-kontinuierlichen Strukturen wie beispielsweise endlichen Graphen. Im Vordergrund stehen kombinatorische Probleme. Die folgenden Gebiete werden (teilweise in Kombination) in der Vorlesung behandelt: Mengenlehre, Logik und rekursive Strukturen / induktive Definitionen Zahlen und Zahlensysteme Grundbegriffe der Algebra Elementare Kryptographie Kombinatorik / Binomialkoeffizienten Graphentheorie'),
('4MBMAEX006', 'Operations Research', 6, 'WiSe', '4', '5', '', '', 0, 'ES', '', 'CISS', 'VC', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65485&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DBHSBA01', 'Funktion Mensch I', 9, 'WiSe', '3', '4', '', '', 0, 'MI', 'MI', '', 'ES;CISS', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65790&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DBHSBA05', 'Apparative Diagnostik und Therapie', 6, 'WiSe', '5', '6', '', '', 0, 'MI', 'MI', '', 'ES;CISS', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65792&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DBHSBA15', 'Data Science in der Medizin', 6, 'WiSe', '5', '4-6', '', '', 0, 'MI', '', '', 'ES', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=70292&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DBHSBAEX01', 'Einführung in die medizinische Informatik', 6, 'WiSe', '1', '2', '', '', 0, 'Einf', 'MI', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=64941&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DBHSBAEX03', 'Praktikum Klinik-IT', 3, 'Jedes', '3', '4', '', '', 0, 'MI', 'MI', '', 'ES;VC;CISS', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65794&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DMTBA03', 'Strukturen des digitalen Gesundheitssystems', 6, 'SoSe', '4', '5', '', '', 0, 'MI', 'MI', '', 'ES;VC;CISS', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65799&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DMTBA10', 'Praktikum Digitale Medizin', 6, 'WiSe', '5', '6', '', '', 0, 'Prakt', 'MI', '', '', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65055&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', ''),
('5DMTBA18', 'Informationssysteme im Gesundheitssystem', 6, 'WiSe', '5', '4-6', '', '', 0, 'MI', '', '', 'ES;VC', 'Informatik', 'https://unisono.uni-siegen.de:443/qisserver/pages/startFlow.xhtml?_flowId=detailView-flow&unitId=65837&periodId=195&navigationPosition=studiesOffered,moduleDescriptions,searchElementsInModuleDescription', '');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `username` varchar(16) NOT NULL,
  `pwHash` varchar(256) NOT NULL,
  `module_belegt` varchar(512) NOT NULL,
  `module_bestanden` varchar(512) NOT NULL,
  `vertiefung` varchar(4) NOT NULL,
  `sort` varchar(32) NOT NULL,
  `theme` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`username`, `pwHash`, `module_belegt`, `module_bestanden`, `vertiefung`, `sort`, `theme`) VALUES
('vitus', 'passwort', '1:1=4INFBA003;2:2=4INFBA004;2:1=4INFBA005;', '', 'Ver', 'sort', 'dark');

-- --------------------------------------------------------

--
-- Table structure for table `vertiefungen`
--

CREATE TABLE `vertiefungen` (
  `vertiefung` varchar(40) NOT NULL,
  `id` varchar(6) NOT NULL,
  `lps_other` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vertiefungen`
--

INSERT INTO `vertiefungen` (`vertiefung`, `id`, `lps_other`) VALUES
('Complex and Intelligent Software Systems', 'CISS', 12),
('Embedded Systems', 'ES', 12),
('Medizinische Informatik', 'MI', 6),
('Visual Computing', 'VC', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `vertiefungen`
--
ALTER TABLE `vertiefungen`
  ADD UNIQUE KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
