# mentiunq-front
Repositorio frontend para mentiUNQ, una aplicación similar a la conocida mentimeter.

### Requerimientos recomendados:

    Node v14.5.3
    NPM v7.12.0

### Instalación

Una vez descargado el proyecto y en la carpeta raiz del mismo se debe instalar las dependencias con el comando
```npm install```


### Levantar proyecto

Para ejecutar el proyecto y que se levanta el servidor se deberá correr
```npm run dev```
Esto creará un servidor donde está corriendo la app, en la siguiente url ```http://localhost:5173/```

### Estructura del proyecto

Para una correcta organización, el proyeco se dividió en varias carpetas dentro de la carpeta src, cada una almacena elementos con responsabilidades separadas y se divide en:
- assets: archivos como imágenes o svgs que se mostrarán
- views: vistas de cada pantalla que visualice el usuario
- components: componentes reutilizables en la app
- services: servicios que interactuan con el back o algún agente externo
- utils: carpeta donde se guardan utiles que pueden representar constantes o funciones utilizadas a lo largo del proyecto

### Estructura y paths de la app

La app cuenta con distintas vistas donde cada una mostrará una pantalla en particular bajo su endpoint característico
Esta estructura se puede ver en el archivo ```src/App.jsx```
  - El path ```/app/presentation/:hash/edit``` será la vista donde el usuario ya logueado pueda editar uan presentación en particular indicada bajo el uriparam ```:hash```. Se corresponde al elemento ```EditPresentation```.
  - El path ```app/presentation/:hash``` sera la vista donde se visualiza una presentación en particular al momento de presentar. Se corresponde al elemento ```Presentation```.
  - El path ```/app``` mostrará todas las presentaciones de un usuario logueado. Se corresponde al elemento ```Presentations```.
  - El path ```/help``` será la vista para mostrar como utilizar la app. Se corresponde al elemento ```Help```
  - El path ```"/"``` será la vista raiz del sitio. Se corresponde al elemento ```Home```

### Archivo de configuración

Dentro de la carpeta raiz se deberá crear un archivo ```config.json``` donde allí irá la configuración similar a un archivo ENV 
Actualmente tiene la siguiente estructura
```json
{
    "GOOGLE_OAUTH_CLIENTID": "KEY"
}```