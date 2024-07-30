-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lip 30, 2024 at 12:40 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aplikacja_wyborcza`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kandydaci`
--

CREATE TABLE `kandydaci` (
  `id` int(11) NOT NULL,
  `imie` varchar(255) NOT NULL,
  `glosy` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kandydaci`
--

INSERT INTO `kandydaci` (`id`, `imie`, `glosy`) VALUES
(1, 'Batman', 5),
(2, 'Superman', 2),
(3, 'Wojtek Mann', 2),
(4, 'Marek Sierocki', 2),
(5, 'fwefwef', 3),
(6, 'dddd', 1),
(7, 'feww', 1),
(8, 'trhrthrth', 1),
(9, 'yntyjn', 2),
(10, 'reggegrg', 2),
(11, 'breb', 21);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `glosowal` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id`, `username`, `password`, `is_admin`, `glosowal`) VALUES
(2, 'Greliusz', '$2y$10$.MgRhHwVyR/f2yuGoRHZou3VXhvJqkgwwHW0PkfQ9AFgnLcD2niIC', 0, 1),
(3, '1', '$2y$10$8C1TaYooBnNVXHIx73IHf.Wc.uHpVQdhNLVoWOCfCVVyR5scwZIgS', 1, 1),
(4, 'admin', '$2y$10$exZ0NRoApFgKGZGCMcbGTeitLfLUERwKelpEcSJAxTsUp.miAaqKW', 1, 0),
(5, 'user', '$2y$10$Es4rV60VMYs.E/oH/vfdNeaA7nRWEk/IPh9ZBgxpXnmu1iwUBtefu', 0, 0),
(6, 'Diablo', '$2y$10$h7syTUpdO/tJ7FDGVimIWOJY9hIM/AzrlE31m8J9mzflTLKTAP5Aq', 0, 1),
(7, 'Koko', '$2y$10$YYIUCTM5HLocGzlro5jgueDUjke3IR3fBeTefoRNeGYmy6pdGQTwW', 0, 0),
(8, 'Romek', '$2y$10$XoAZdho.XjxISiATmmRviuIdg7k5HveQRD2nkUQ/BD7ViihZea1EC', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyborcy`
--

CREATE TABLE `wyborcy` (
  `id` int(11) NOT NULL,
  `imie` varchar(255) NOT NULL,
  `glosowal` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wyborcy`
--

INSERT INTO `wyborcy` (`id`, `imie`, `glosowal`) VALUES
(1, 'Greliusz', 1),
(2, '1', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `kandydaci`
--
ALTER TABLE `kandydaci`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `wyborcy`
--
ALTER TABLE `wyborcy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kandydaci`
--
ALTER TABLE `kandydaci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `wyborcy`
--
ALTER TABLE `wyborcy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
