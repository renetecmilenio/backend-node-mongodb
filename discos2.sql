-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS DB_DISCOS;

-- Crear la base de datos
CREATE DATABASE DB_DISCOS;

-- Seleccionar la base de datos
USE DB_DISCOS;

-- Crear la tabla con un índice único para evitar duplicados
CREATE TABLE IF NOT EXISTS Discos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30),
  Artista VARCHAR(30),
  fecha_pub INT,
  Discografica VARCHAR(30),
  Precio INT,
  UNIQUE (nombre, Artista) -- Esta línea asegura que no haya discos con el mismo nombre y artista
);

-- Insertar los datos, ahora se evitará la duplicación si ya existe un disco con el mismo nombre y artista
INSERT IGNORE INTO Discos (nombre, Artista, fecha_pub, Discografica, Precio) VALUES
('Thriller', 'Michael Jackson', 1982, 'Epic Records', 500),
('Back in Black', 'AC/DC', 1980, 'Atlantic Records', 400),
('The Dark Side of the Moon', 'Pink Floyd', 1973, 'Harvest Records', 450),
('The Bodyguard', 'Whitney Houston', 1992, 'Arista Records', 350),
('Rumours', 'Fleetwood Mac', 1977, 'Warner Bros.', 400),
('Saturday Night Fever', 'Bee Gees', 1977, 'RSO Records', 300),
('Hotel California', 'Eagles', 1976, 'Asylum Records', 420),
('Abbey Road', 'The Beatles', 1969, 'Apple Records', 550),
('21', 'Adele', 2011, 'XL Recordings', 350),
('Born in the U.S.A.', 'Bruce Springsteen', 1984, 'Columbia Records', 360),
('Goodbye Yellow Brick Road', 'Elton John', 1973, 'MCA Records', 400),
('Led Zeppelin IV', 'Led Zeppelin', 1971, 'Atlantic Records', 450),
('Bat Out of Hell', 'Meat Loaf', 1977, 'Epic Records', 370),
('Come On Over', 'Shania Twain', 1997, 'Mercury Nashville', 340),
('1989', 'Taylor Swift', 2014, 'Big Machine Records', 320),
('Purple Rain', 'Prince', 1984, 'Warner Bros.', 400),
('Nevermind', 'Nirvana', 1991, 'DGC Records', 380),
('Hybrid Theory', 'Linkin Park', 2000, 'Warner Bros.', 360),
('Appetite for Destruction', 'Guns N’ Roses', 1987, 'Geffen Records', 410),
('The Wall', 'Pink Floyd', 1979, 'Harvest Records', 500),
('A Night at the Opera', 'Queen', 1975, 'EMI Records', 470),
('Thrash Zone', 'D.R.I.', 1989, 'Metal Blade Records', 320),
('American Idiot', 'Green Day', 2004, 'Reprise Records', 330),
('OK Computer', 'Radiohead', 1997, 'Parlophone', 410),
('Future Nostalgia', 'Dua Lipa', 2020, 'Warner Records', 300),
('Random Access Memories', 'Daft Punk', 2013, 'Columbia Records', 380),
('Divide', 'Ed Sheeran', 2017, 'Asylum Records', 310),
('Graduation', 'Kanye West', 2007, 'Def Jam Recordings', 400),
('Songs in A Minor', 'Alicia Keys', 2001, 'J Records', 360),
('Revolver', 'The Beatles', 1966, 'Parlophone', 470);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

