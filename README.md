# Library core

Esto es un API RESTFull de una libreria.
Creada con NODEJS, EXPRESS y MONGODB.

## Cómo utilizar

Se requiere conocimientos de NODE y uso de terminales para
utilizar este API

Se requiere tener MongoDB en su maquina y corriendo.

1. Clonar este proyecto (Obvio)
2. ```cd library/src``
3. ```npm i && npm run watch```
4. Su API deberia estar corriendo en ```localhost:2302/api/v1```
6. Si desea cambiar el puerto verifique la carpeta ```config/index```

#### NOTA:

Debes crear libros para poder interactuar con las rutas
el flujo correcto seria crear algunos libros primero.

El modelo de un libro esta basado en los detalles que normalmente tiene un libro 
de amazon y otros detalles ya que en los requerimientos no se especifica
la informacion que deben tener.

### Crear un libro

~~ Ruta: localhost:2302/api/v1/books 
~~ Metodo: POST

Para crear un libro algunos campos son obligatorios.

##### Require => *
##### Optional => !

name: *
isbn: *
desc: !
publisher: !
publicDate: !
language: !

Porque REQUIRE*

Segun investigue los libros tienen un numero unico llamado ISBN
por lo cual seria recomendable que si registras un libro agregues ese tipo de
informacion puede evaluarse y ponerse Opcional.

El nombre es necesario Obviamente seria redundate explicarlo.

### Ver listado de libros

~~ Ruta: localhost:2302/api/v1/books
~~ Metodo: GET

Luego de crear varios libros podra ver el listado

### Visualizar un libro

~~ Ruta: localhost:2302/api/v1/books/:code
~~ Metodo: GET

Si vez el listado de libros cada libro devuelve un campo ~~CODE~~
el cual se utiliza como id.

Pasalo como parametro a la url. como en el ejemplo

Ejemplo:
```localhost:2302/api/v1/books/a35c2d```
Metodo: GET

#### De donde sale el valor de CODE? 
Cuando creas un libro se toma el _id que asigna MONGODB y se utiliza solo 7 digitos
de este ID 

### porque crear otro tipo de ID?
Es simple, MONGODB crea un ID con mas de 20 caracteres por lo cual no es muy amigable.
se entiende que con un copia de 7 digitos de este mismo se puede trabajar mas amigablemente
y tener rutas mas cortas y legibles.

el CODE de 7 digitos se crea con letras Mayus, Minus y numeros.

### Eliminar un libro

~~ Ruta: localhost:2302/api/v1/books/:code
~~ Metodo: DELETE

Leer "Visualizar un libro" para entender el uso del parametro :code

### Actualizar un libro

~~ Ruta: localhost:2302/api/v1/books/:code
~~ Metodo: PUT

Leer "Visualizar un libro" para entender el uso del parametro :code

Lea los campos de "Crear un libro" para ver las opciones que puede actualizar


## Dependencias

Esta API utiliza Express Validation para evitar crear libros sin sus debidos campos
y limpiar los datos.

Se utiliza un ORM Mongoose para interactuar con MONGODB