CREATE TABLE IF NOT EXISTS empleados
(
    id 			 INT AUTO_INCREMENT,
    nombre 		 VARCHAR(50) NOT NULL,
    salario 	 DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usuarios
(
    id 		INT AUTO_INCREMENT,
    nombre 	VARCHAR(100) NOT NULL,
    correo 	VARCHAR(50) NOT NULL,
    pass 	VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

TRUNCATE TABLE empleados;


CREATE TABLE IF NOT EXISTS notas
(
    id 				INT AUTO_INCREMENT,
    id_usuario		INT,
    nombre_creador 	VARCHAR(100) NOT NULL,
    fecha 			DATE NOT NULL,
    hora 			TIME NOT NULL,
	titulo 			VARCHAR(100) NOT NULL,
	contenido 		VARCHAR(500) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);



INSERT INTO empleados (nombre, salario)
VALUES('Empleado 1', 3500), ('Empleado 2', 8567.63), ('Empleado 3', 5000);


SELECT *
FROM empleados;

TRUNCATE TABLE empleados;

SELECT *
FROM usuarios;

DELETE FROM empleados where id = 7;

TRUNCATE TABLE empleados;


DELIMITER //
CREATE PROCEDURE spInsertarEmpleado
( 
    IN _nombre 			VARCHAR(50),
    IN _salario 		DECIMAL(10, 2)
)
BEGIN
	INSERT INTO empleados (nombre, salario)  VALUES
	(_nombre, _salario);
END//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE spActualizarEmpleado
(
    IN id_empleado			INT,
    IN nombre_empleado 	 	VARCHAR(50),
    IN salario_empleado 	DECIMAL(10, 2)
)
BEGIN
	IF nombre_empleado IS NOT NULL THEN
    	UPDATE empleados
        SET nombre = nombre_empleado
        WHERE id = id_empleado;
    END IF;
    
	IF salario_empleado IS NOT NULL THEN
    	UPDATE empleados 
        SET salario = salario_empleado
        WHERE id = id_empleado;
    END IF;
END//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE spEliminarEmpleado
( 
    IN id_empleado INT
)
BEGIN
	DELETE FROM empleados WHERE id = id_empleado;
END//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE spInsertarUsuario
( 
	IN _nombre 	VARCHAR(100),
    IN _correo 	VARCHAR(50),
    IN _pass 	VARCHAR(50)
)
BEGIN
	INSERT INTO usuarios (nombre, correo, pass)  VALUES
	(_nombre, _correo, _pass);
END//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE login
( 
    IN _correo 	VARCHAR(50),
    IN _pass 	VARCHAR(50)
)
BEGIN
	SELECT *
    FROM usuarios AS u
    WHERE u.correo = _correo AND u.pass = _pass;
END//
DELIMITER ;

CALL login('user5@mail.com', '1234');

DROP PROCEDURE login;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'landowolf10';


DELIMITER //
CREATE PROCEDURE spMostrarNotas
(
	IN id		INT
)
BEGIN
	SELECT *
    FROM notas AS n
    WHERE n.id_usuario = id;
END//
DELIMITER ;

CALL spMostrarNotas(1);

SELECT *
FROM notas;

DELIMITER //
CREATE PROCEDURE spCrearNota
( 
    IN _id_usuario 		INT,
    IN _titulo			VARCHAR(100),
    IN _contenido		VARCHAR(500)
)
BEGIN
	DECLARE nombre_creador 	VARCHAR(100);
    
    SELECT u.nombre
    INTO nombre_creador
    FROM usuarios AS u
    WHERE u.id = _id_usuario;
    
	INSERT INTO notas (id_usuario, nombre_creador, fecha, hora, titulo, contenido)  VALUES
	(_id_usuario, nombre_creador, CURDATE(), CURTIME(), _titulo, _contenido);
END//
DELIMITER ;

CALL spCrearNota(1, 'Luis Orlando Avila Garcia', 'Título de prueba', 'Contenido de prueba');
TRUNCATE TABLE notas;


DELIMITER //
CREATE PROCEDURE spActualizarNota
(
    IN _id 			INT,
    IN _titulo		VARCHAR(100),
    IN _contenido	VARCHAR(500)
)
BEGIN
	IF _titulo IS NOT NULL THEN
    	UPDATE notas
        SET titulo = _titulo
        WHERE id = _id;
    END IF;
    
	IF _contenido IS NOT NULL THEN
    	UPDATE notas 
        SET contenido = _contenido
        WHERE id = _id;
    END IF;
END//
DELIMITER ;

CALL spActualizarNota(1, 'Título de prueba', 'Contenido actualizado');



DELIMITER //
CREATE PROCEDURE spEliminarNota
( 
    IN _id INT
)
BEGIN
	DELETE FROM notas WHERE id = _id;
END//
DELIMITER ;


CALL spEliminarNota(1);