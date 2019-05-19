# Library core

Esto es un API RESTFull de una libreria.
Creada con NODEJS, EXPRESS y MONGODB.

## Cómo utilizar

Se requiere conocimientos de NODE y uso de terminales para
utilizar este API

Se requiere tener MongoDB en su maquina y corriendo.

1. Clonar este proyecto (Obvio)
2. ```cd library/src```
3. ```npm i && npm run watch```
4. Su API deberia estar corriendo en ```localhost:2302/api/v1```
6. Si desea cambiar el puerto verifique la carpeta ```config/index```

#### NOTA:

Debes crear libros para poder interactuar con las rutas,
el flujo correcto seria crear algunos libros primero.

El modelo de un libro esta basado en los detalles que normalmente tiene un libro 
de amazon y otros detalles ya que en los requerimientos no se especifica
la informacion que deben tener.

## Listado de acciones

- [Crear un libro](#crear-un-libro)
- [Ver listado de libros](#ver-listado-de-libros)
- [Visualizar un libro](#visualizar-un-libro)
- [Eliminar un libro](#eliminar-un-libro)
- [Actualizar un libro](#actualizar-un-libro)
- [Crear una pagina de libro](#crear-una-pagina-de-libro)
- [Ver todas las pagina de un libro](#ver-todas-las-pagina-de-un-libro)
- [Ver una pagina de un libro](#ver-una-pagina-de-un-libro)
- [Eliminar una pagina](#eliminar-una-pagina)
- [Actualizar una pagina](#actualizar-el-contenido-de-una-pagina)

### Rutas

Todas las rutas que veras mas adelante deben estar corriendo en 
``` localhost:2302/api/v1/your-route ```

##### /api/v1 ?
Esto es solo un prefijo en las rutas para futuras actualizaciones en el API
cambiar la v1 por la siguiente v2, vX "Puede editar los archivos y cambiar esto
en ``` config/index```"

#### Casi todas las rutas son las mismas WTF???
Si, la variante aqui sera el METODO en que Consultes el API y algunos parametros.
Como interactuas con un API que solo trata de libros es amigable utilizar un endpoint
familiar y poco variante.

### Crear un libro

```~~ Ruta: /books```

```~~ Metodo: POST```

Para crear un libro algunos campos son obligatorios.

##### Require => *
##### Optional => !

1. name: *
2. isbn: *
3. desc: !
4. publisher: !
5. publicDate: !
6. language: !

Porque REQUIRE*?

Segun investigue los libros tienen un numero unico llamado ISBN
por lo cual seria recomendable que si registras un libro agregues ese tipo de
informacion puede evaluarse y ponerse Opcional.

El nombre es necesario Obviamente seria redundate explicarlo.

``` 
{
    "book": {
        "name": "Más Allá de la Salud: Libro de Recetas Paleo y Keto",
        "isbn": "978-1978282179",
        "paperback": 240,
        "publisher": "CreateSpace Independent Publishing Platform",
        "publicDate": "2017-11-22T04:00:00.000Z",
        "language": "Español",
        "registered": "2019-05-19T17:22:02.121Z",
        "code": "3435a9",
        "desc": "¿Otro libro más de nutrición? ¿Pero cuántos más se necesitan? 
        Vivimos en un mundo con demasiada información, pero la falta de acción de
        las personas en su salud es lo que ha creado la epidemia de enfermedades 
        que existen hoy en día. De hecho, la obesidad, diabetes, enfermedades 
        neurológicas, las enfermedades relacionadas a las hormonas y la inflamación
        están ahora mismo en sus niveles más altos en la historia del mundo.",
    }
}

```

### Ver listado de libros

```~~ Ruta: /books```

```~~ Metodo: GET```

Luego de crear varios libros podra ver el listado

### Visualizar un libro

```~~ Ruta: /books/:code```

```~~ Metodo: GET```

Si vez el listado de libros cada libro devuelve un campo ```~~CODE~~```
el cual se utiliza como id.

Pasalo como parametro a la url. como en el ejemplo

Ejemplo:

```localhost:2302/api/v1/books/a35c2```

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

```~~ /books/:code```

```~~ Metodo: DELETE```

Leer "Visualizar un libro" para entender el uso del parametro :code

### Actualizar un libro

```~~ Ruta: /books/:code```

```~~ Metodo: PUT```

Leer "Visualizar un libro" para entender el uso del parametro :code

Lea los campos de "Crear un libro" para ver las opciones que puede actualizar

_______________________________________________________________________________________________________

## Pages

### Crear una pagina de libro

```~~ Ruta: /books/:book/pages```

```~~ Metodo: POST```

### NOTA:
Segun los requerimientos se debe listar las paginas en HTML o TEXTO, supuse que seria para dar uso del API
con un un editor de texto WYSIWYG, esto quiere decir que la entrada de contenido por defecto sera HTML desde un editor.

Redundacia: Para crear una pagina su contenido debe ser creado con HTML simulando un editor de texto tipo "TinyMCE"

#### Flujo
1. Enviar datos al API
2. Agrega el :book parametro **(este es el campo CODE de un libro)**
3. Tu URL debe verse similar a esta: ``` /books/a35c2/pages ```
4. { content: "your HTML" }

Boom! Deberias tener una pagina creada y un libro actualizado.
**OJO:** Cuando crea una pagina se actualiza el **paperback** del libro.

``` 
{
    "page": {
        "content": "<div><h3>Build beautiful content for the web with Tiny</h3>
        <p>The rich text editing platform that helped launch Atlassian, 
        Medium, Evernote, and more.</p></div>",
        "prevPage": 0,
        "nextPage": 2,
        "page": 1,
        "registered": "2019-05-19T05:59:42.891Z"
    }
}
```

##### Require => *

1. content: *

Las paginas tienen otros campos pero estos se llenan segun otro tipo de
informacion en la DB, por ejemplo:

1. nextPage
2. prevPage
3. page

Se agrega el numero de pagina y la pagina anterior como la siguiente.

### Ver todas las pagina de un libro

```~~ Ruta: /books/:book/pages```

```~~ Metodo: GET```

### NOTA:
Segun los requerimientos se debe listar las paginas en HTML o TEXTO, por defecto el contenido es añadido en HTML
por lo que el valor por defecto del formato sera HTML.

#### Flujo
1. Tu URL debe verse similar a esta: ``` /books/a35c2/pages ```

2. Boom! Deberias tener un listado de paginas.

### NOTA FORMATEAR LOS DATOS:

el formato es HTML por defecto si quieres ver el contenido en **TEXTO PLANO**
1. solo agrega un **QUERY** a la URL:
2. Tu URL debe verse similar a esta: ``` /books/a35c2/pages?format=text ```

``` 
{
    "content": "Build beautiful content for the web with TinyThe
    rich text editing platform that\nhelped launch Atlassian,
    Medium, Evernote, and more.",
    "prevPage": 14,
    "nextPage": 16,
    "page": 15,
    "registered": "2019-05-19T06:20:01.793Z"
 }, 
 x200 pages..
     
```

### Ver una pagina de un libro

```~~ Ruta: /books/:book/pages/:page```

```~~ Metodo: GET```

### NOTA:
Puedes ver las paginas en HTML o TEXTO, por defecto el contenido es añadido en HTML
por lo que el valor por defecto del formato sera HTML.

#### Flujo
1. Tu URL debe verse similar a estas: 
2. ``` /books/a35c2/pages/1 ```
3. ``` /books/a35c2/pages/3 ```
4. ``` /books/a35c2/pages/5 ```
5. ``` /books/a35c2/pages/2 ```

6. Boom! Deberias tener un pagina.

### NOTA FORMATEAR LOS DATOS:

el formato es HTML por defecto si quieres ver el contenido en **TEXTO PLANO**
1. solo agrega un **QUERY** a la URL:
2. Tu URL debe verse similar a estas:
3. ``` /books/a35c2/pages/1?format=text ```
4. ``` /books/a35c2/pages/3?format=html ```
5. ``` /books/a35c2/pages/5?format=text ```
6. ``` /books/a35c2/pages/2?format=html ```

### Eliminar una pagina

```~~ Ruta: /books/:book/pages/:page```

```~~ Metodo: DELETE```

### Actualizar el contenido de una pagina

```~~ Ruta: /books/:book/pages/:page```

```~~ Metodo: PUT```

{ content: "YOUR HTML" }

## Dependencias

Esta API utiliza Express Validation para evitar crear libros sin sus debidos campos
y limpiar los datos.

Se utiliza un ORM Mongoose para interactuar con MONGODB

```sanitize-html:```  Validar HTML 

```HTML-to-text:```  Transformar HTML en TEXTO
