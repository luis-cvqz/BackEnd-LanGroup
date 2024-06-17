# Configuración del Proyecto

Documento explicando un guía paso a paso para configurar el proyecto. 

## Configuración del archivo .env

El archivo `.env` es crucial para la configuración de la aplicación. Aquí es donde se almacenan todas las variables de entorno necesarias para el funcionamiento de la aplicación. 

Crear un archivo `.env` con las variabes mostradas en el archivo `.env.example`. Luego, rellena las variables de entorno con tus propios valores. Desglose de cada variable:

- `DB_HOST`: La dirección IP de su base de datos.
- `DB_DATABASE`: El nombre de su base de datos.
- `DB_USER`: El nombre de usuario para acceder a su base de datos.
- `DB_PASSWORD`: La contraseña para acceder a su base de datos.
- `DB_PORT`: El puerto en el que se ejecuta su base de datos.
- `SERVER_PORT`: El puerto en el que se ejecutará el servidor de la aplicación.
- `GRPC_PORT`: El puerto en el que se ejecutará el servidor gRPC.
- `NODE_ENV`: El entorno en el que se ejecutará la aplicación. Puede ser `development` o `production`.
- `JWT_SECRET`: La clave secreta utilizada para firmar los tokens JWT. Puede generar una utilizando un generador de claves aleatorias o simplemente una cadena de caracteres aleatoria.

## Generación del JWT Secret

El `JWT_SECRET` es una cadena de caracteres que se utiliza para firmar y verificar los tokens JWT. Puede generar una utilizando un generador de claves aleatorias o simplemente una cadena de caracteres aleatoria. Asegúrese de que sea una cadena de 35 caracteres y segura, ya que cualquier persona con acceso a esta clave podría firmar tokens JWT en nombre de su aplicación.

Una opcion para generar una clave secreta es utilizar el script `generadorJWT.js` que se encuentra en la carpeta `scripts/`. Para ejecutar el script, simplemente ejecute el siguiente comando:

```sh
node scripts/generadorJWT.js
```

## Base de datos
El sistema utiliza una base de datos MySQL para almacenar y gestionar los datos. Antes de ejecutar las migraciones y los seeders, es necesario crear la base de datos.

### MySQL nativo
Puede utilizar el script `bd.sql` que se encuentra en la carpeta `scripts/` para crear la base de datos. Para ejecutar el script, siga estos pasos:

1. Abra una terminal y navegue hasta la carpeta del proyecto.
2. Ejecute el siguiente comando para iniciar sesión en MySQL:
```sh
mysql -u <nombre_de_usuario> -p
```
3. Ingrese su contraseña cuando se te solicite.
4. Una vez que haya iniciado sesión en MySQL, ejecute el siguiente comando para crear la base de datos:
```sh
source scripts/bd.sql
```
Esto ejecutará el script `bd.sql` y creará la base de datos necesaria para el funcionamiento del sistema.

Recuerde reemplazar `<nombre_de_usuario>` con el nombre de usuario de su instalación de MySQL Server que posea permisos para la creacion de nuevas bases de datos.

Una vez que haya creado la base de datos, puede continuar con la configuración del proyecto ejecutando las migraciones y los seeders.

## Migraciones de Sequelize

Las migraciones de Sequelize son scripts que describen los cambios en su base de datos. Sequelize sigue la filosofía de migración hacia adelante, lo que significa que todas las migraciones son acumulativas y se ejecutan en orden.

Para ejecutar las migraciones, primero asegúrese de que Sequelize CLI esté instalado. Luego, puede ejecutar las migraciones con el siguiente comando:

```sh
npx sequelize-cli db:migrate
```
## Seeders de Sequelize

Los seeders de Sequelize son scripts que llenan su base de datos con datos de prueba. Esto puede ser útil durante el desarrollo para tener un conjunto de datos con los que trabajar.

Para ejecutar los seeders, primero asegúrese de que Sequelize CLI esté instalado. Luego, puede ejecutar los seeders con el siguiente comando:

```sh
npx sequelize-cli db:seed:all
```
Esto ejecutará todos los seeders en el directorio `seeders/` y llenará la tabla de idiomas y roles. Con los datos necesarios.

## Ejecución de la aplicación