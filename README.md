PWA

1. Enviroments

enviroments/enviroment.prod.ts

api_url: "http://localhost:3000/api"

2. ng buid

3. npm i -g http-server //instalándolo como dependencia de desarrollo no se ha conseguido hacer funcionar

4. ng add @angular/pwa

* angular.json:
    - Añade manifest.json en el apartado de assets
    - Añade flag serviceWorker: true
    - Añade configuración 'ngswConfigPath' con la ruta del archivo de configuración para el service worker ngsw-worker.js
* package.json: Añade dependencia a @angular/service-worker
* index.html:
    - link a manifest.json
    - meta theme-color para cuando se "instale" en algún dispositivo
    - noscript html tag
* manifest.json: configuración de la aplicación para cuando se "instale" en el dispositivo
* ngsw-config.json: archivo de configuración y estrategias de cacheo para el service worker que crea angular.
* app.module.ts: registra e instala el service worker ngsw-worker.js (auto generado por angular basado en ngsw-config.json)
* icons: iconos en diferentes tamaños para usarse como icono de aplicación cuando se instale en algún dispositivo