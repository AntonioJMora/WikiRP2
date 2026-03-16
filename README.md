# WikiRP2
## Datos del alumno
- Nombre: Antonio Jesús Mora Cabeza
- Curso: 1º DAW A
- Correo: nmorcab2106@g.educaand.es

## Fase 1
### Capturas W3C
- Index
![](assets/imagenes/w3c/Validacion_index.png)

- Personajes
![](assets/imagenes/w3c/Validacion_personajes.png)

- Grupos
![](assets/imagenes/w3c/Validacion_grupos.png)

- Servidor
![](assets/imagenes/w3c/Validacion_servidor.png)

- Facciones
![](assets/imagenes/w3c/Validacion_facciones.png)

- Contacto
![](assets/imagenes/w3c/Validacion_contacto.png)

- Ellie Ashford
![](assets/imagenes/w3c/Validacion_ellie.png)

### Decisiones tomadas
- En la página de contacto, apenas aparecen cosas en un principio ya que se quieren añadir con JS, al darle a cada boton de radio se mostrará una información u otra.

- Lá página de Ellie Ashford es para mostrar tablas y demás

- Las páginas a revisar son:
    - [index.html](index.html)
    - [servidor.html](servidor.html)
    - [personajes.html](personajes.html)
    - [ellie-ashford.html](personajes/ellie-ashford.html)
    - [grupos.html](grupos.html)
    - [facciones.html](facciones.html)
    - [contacto.html](contacto.html)

    Las demás páginas no han podido ser terminadas pero estás muestran todo o casi todo lo pedido.

## Fase 2
- El css se encuentra en [styles.css](assets/css/styles.css)
- Esta es la captura del W3C del css
    ![](assets/imagenes/w3c/Validacion_css.png)

- Aquí puedes encontrar la demo de GitHub pages: https://antoniojmora.github.io/WikiRP2/index.html

- Las media query creadas son para pantallas pequeñas y móviles, estas se encuentran al final del todo

## Fase 3
- El js se encuentra en [script.js](assets/js/script.js)

### Funcionalidades

- La primera funcionalidad es en la página de [contacto.html](contacto.html). En esta, se añaden datos mediante JS al formulario, dando dos opciones, modificar datos de un personaje que ya haya en la página, o añadir uno nuevo.

- La segunda es en [grupos.html](grupos.html). En esta lo que se hace es una interaccion directa con la página web, pudiendo añadir en una lista de cards grupos nuevos, indicando si estan activos, disueltos, o en que servidor está. Además, se podrá añadir una imagen. Estos se podrán añadir o eliminar. Aunque los que añada el usuario se eliminarán al recargar la página, si se quisieran guardar, se podría poner un localStorage para que guarde los datos en el navegador.
