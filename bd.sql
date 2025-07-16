CREATE DATABASE IF NOT EXISTS roles_carrera_administrativa_dbv0;
USE roles_carrera_administrativa_dbv0;

-- Tabla: cargos_sin_grado
CREATE TABLE IF NOT EXISTS cargos_sin_grado (
    id_cargo_sin_grado INT(11) AUTO_INCREMENT PRIMARY KEY,
    cargo_sin_grado_nombre VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

-- Tabla: cargos
CREATE TABLE IF NOT EXISTS cargos (
    id_cargo INT(11) AUTO_INCREMENT PRIMARY KEY,
    cargo_nombre VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

-- Tabla: dependencias
CREATE TABLE IF NOT EXISTS dependencias (
    id_dependencia INT(11) AUTO_INCREMENT PRIMARY KEY,
    dependencia_nombre VARCHAR(110) NOT NULL
) ENGINE = InnoDB;

-- Tabla: redes
CREATE TABLE IF NOT EXISTS redes (
    id_red INT(11) AUTO_INCREMENT PRIMARY KEY,
    red_nombre VARCHAR(110) NOT NULL
) ENGINE = InnoDB;

-- Tabla: areas
CREATE TABLE IF NOT EXISTS areas (
    id_area INT(11) AUTO_INCREMENT PRIMARY KEY,
    area_nombre VARCHAR(110) NOT NULL
) ENGINE = InnoDB;

-- Tabla: cargos_nomina
CREATE TABLE IF NOT EXISTS cargos_nomina (
    id_cargo_nomina INT(11) AUTO_INCREMENT PRIMARY KEY,
    cargo_nombre_nomina VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

-- Tabla: descripcion_cargos
CREATE TABLE IF NOT EXISTS descripcion_cargos (
    id_desc_cargo INT(11) AUTO_INCREMENT PRIMARY KEY,
    desc_cargo VARCHAR(70) NOT NULL
) ENGINE = InnoDB;

-- Tabla: estado_cargos
CREATE TABLE IF NOT EXISTS estado_cargos (
    id_estado_cargo INT(11) AUTO_INCREMENT PRIMARY KEY,
    desc_cargo VARCHAR(70) NOT NULL
) ENGINE = InnoDB;

-- Tabla: plantas
CREATE TABLE IF NOT EXISTS plantas (
    id_planta INT(11) AUTO_INCREMENT PRIMARY KEY,
    desc_planta VARCHAR(70) NOT NULL
) ENGINE = InnoDB;

-- Tabla: centros
CREATE TABLE IF NOT EXISTS centros (
    id_centro INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre_centro VARCHAR(70) NOT NULL
) ENGINE = InnoDB;

-- Tabla: funcionarios
CREATE TABLE IF NOT EXISTS funcionarios (
    id_funcionario INT(11) AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(30) UNIQUE NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    sexo VARCHAR(1),
    dependencia_funcionario INT(11) NOT NULL,
    cargo_funcionario INT(11) NOT NULL,
    fecha_nacimiento DATE,
    fecha_ingreso DATE,
    cargo_sin_grado_funcionario INT(11) NOT NULL,
    red_funcionario INT(11) NOT NULL,
    area_funcionario INT(11) NOT NULL,
    edad VARCHAR(5) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(40) NOT NULL,
    CONSTRAINT fk_dependencia_funcionario FOREIGN KEY (dependencia_funcionario) REFERENCES dependencias(id_dependencia) ON DELETE NO ACTION,
    CONSTRAINT fk_cargo_funcionario FOREIGN KEY (cargo_funcionario) REFERENCES cargos(id_cargo) ON DELETE NO ACTION,
    CONSTRAINT fk_cargo_sin_grado_funcionario FOREIGN KEY (cargo_sin_grado_funcionario) REFERENCES cargos_sin_grado(id_cargo_sin_grado) ON DELETE NO ACTION,
    CONSTRAINT fk_red_funcionario FOREIGN KEY (red_funcionario) REFERENCES redes(id_red) ON DELETE NO ACTION,
    CONSTRAINT fk_area_funcionario FOREIGN KEY (area_funcionario) REFERENCES areas(id_area) ON DELETE NO ACTION
) ENGINE = InnoDB;

-- Tabla: personal
CREATE TABLE IF NOT EXISTS personal (
    id_personal INT(11) AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(50) NOT NULL,
    apellidos VARCHAR(120) NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    descripcion_cargo INT(11) DEFAULT NULL,
    cargo_personal INT(11) DEFAULT NULL,
    cargo_nom INT(11) DEFAULT NULL,
    id_planta INT(11) DEFAULT NULL,
    nombre_estado_cargo INT(11) NOT NULL,
    centro_formacion INT(11) NOT NULL,
    observaciones VARCHAR(255),
    historial_planta VARCHAR(420),
    CONSTRAINT fk_cargo_personal FOREIGN KEY (cargo_personal) REFERENCES cargos(id_cargo) ON DELETE NO ACTION,
    CONSTRAINT fk_cargo_nom_personal FOREIGN KEY (cargo_nom) REFERENCES cargos_nomina(id_cargo_nomina) ON DELETE NO ACTION,
    CONSTRAINT fk_descripcion_cargo_personal FOREIGN KEY (descripcion_cargo) REFERENCES descripcion_cargos(id_desc_cargo) ON DELETE NO ACTION,
    CONSTRAINT fk_planta_personal FOREIGN KEY (id_planta) REFERENCES plantas(id_planta),
    CONSTRAINT fk_estado_cargo_personal FOREIGN KEY (nombre_estado_cargo) REFERENCES estado_cargos(id_estado_cargo),
    CONSTRAINT fk_centro_formacion_personal FOREIGN KEY (centro_formacion) REFERENCES centros(id_centro)
) ENGINE = InnoDB;
