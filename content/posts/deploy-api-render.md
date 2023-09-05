---
title: Cómo desplegar una API REST GRATIS en Render con Node.js y TypeScript
excerpt: Cómo desplegar una aplicación de Node.js con Typescript en Render.com, una alternativa a Heroku para crear servicios en distintas plataformas de manera gratuita y rápida.
date: '2023/01/27'
readingTime: '15/20 minutos de lectura'
tags:
  - typescript
  - nodejs
imageUrl: '/posts/deploy-api-render.webp'
ogUrl: '/posts/og/deploy-api-render.png'
iconUrl: '/posts/render.png'
---

Desde que empecé a programar en JavaScript con Node.js hace uno años, siempre
desplegaba todas mis aplicaciones en **Heroku**, con el free tier que solían
tener (incluso lo seguí haciendo hasta que me las dieron de baja en noviembre
cuando inhabilitaron el plan 😂).

Ahora que no está disponible, una buena alternativa es **render.com**. Sun plan
individual para hobbies, estudiantes, y hackers indie (? te ofrece acceso a un
montón de servicios. Podes revisarlos todos acá:
[render pricing](https://render.com/pricing).

Acá abajo voy a mostrar como desplegar una API REST hecha con express en
**render**. La voy a crear con TypeScript.

#### Requerimientos

- Node.js (yo estoy en la versión 16)
- Crear un repositorio en github para el proyecto
- Una cuenta en Render

#### Setup del proyecto

Lo primero es crear un repositorio en nuestra cuenta de Github / Gitbucket /
GitLab y vamos a guardar su URL.

Vamos a comenzar creando el proyecto. Va a ser simple, el punto es ver cómo
hacer el deploy.

En nuestra terminal creamos la carpeta de forma local e iniciamos nuestro
repositorio:

```bash
$ mkdir rest-api-render && cd rest-api-render
$ git init
```

#### Agregamos nuestro repositorio remoto

```bash
$ git remote add origin <url-de-tu-repo-creado>
# En mi caso: git remote add origin git@github.com:juanespinola05/deploy-to-render-tutorial.git
```

Creamos un archivo `.gitignore` y dentro especificamos

```bash
node_modules/
.env
```

#### Inicializamos nuestro proyecto

Instalamos las dependencias necesarias:

```bash
$ npm init -y
$ npm install express dotenv
```

#### Instalación de TypeScript

```bash
$ npm install typescript --save-dev
```

A nuestro archivo `package.json` generado vamos a agregar los siguientes
scripts:

```javascript
// package.json

"scripts": {
  "tsc": "tsc",
  "build": "npm install; tsc",
  "start": "node build/index.js"
},

//...
```

A continuación creamos la configuración para nuestro compilador de TypeScript:

```bash
$ npx tsc --init --outDir build
```

#### Añadimos el archivo de entrada

Creamos nuestra aplicación en `index.ts`:

```javascript
import express from 'express'
const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('API REST desplegada en Render.com!!')
})

app.listen(port, () => {
  console.log(`Express escuchando en http://localhost:${port}`)
})
```

#### Probando nuestra aplicación

Creamos la build:

```bash
$ npm run tsc
```

E iniciamos la app:

```bash
$ npm run start
// Express escuchando en http://localhost:3000
```

#### Commit y push al repositorio remoto

```bash
$ git add . && git commit -m "Ready for deploy"
$ git push origin main
```

#### Creando nuestra aplicación en Render

Una vez que hayas creado tu cuenta, te dirigis a la sección
[Dashboard](https://dashboard.render.com/). Allí, clicamos en `New +` y
seleccionamos la opción `Web Service`

<video src="/posts/render-new-service.webm" loading="lazy" poster="/posts/render-new-service.webp" loop muted autoPlay></video>

Seleccionamos nuestro repositorio y clicamos en `Connect`

<video src="/posts/render-connect-repo.webm" loading="lazy"
poster="/posts/render-connect-repo.webp" loop muted autoPlay></video>

Vamos a rellenar la información de la siguiente forma:

- **Name:** El nombre que quieras darle a tu aplicación.
- **Region:** Podés elegir la que te convenga.
- **Branch:** La rama que queremos desplegar, en mi caso es `main`.
- **Root Directory:** Nuestra carpeta raiz, en mi caso la dejo vacía ya que es
  la propia del repositorio.
- **Environment:** Seleccionamos `Node`.
- **Build Command:** Escribimos `npm run build` (este script instala las
  dependencias y hace la build de Typescript).
- **Start Command:** Escribimos `npm run start` (levanta la aplicación una vez
  que se haya hecho la build).

Más abajo tenemos opciones avanzadas, allí podemos agregar nuestras variables de
entorno necesarias.

ℹ️ Es importante resaltar que si se establece un ambiente de producción,
typescript **no** va a instalarse, ya que es una dependencia de desarrollo.

Finalmente clicamos en `Create Web Service`

🎉 **Y listo!** Sólo debemos esperar a que Render clone nuestro repositorio,
haga la build y despliegue nuestra aplicación.

#### Conclusiones

A partir de este punto podes empezar a crear tu API y expandirla según los
requerimientos de tu proyecto. Tené en cuenta que cada vez que haces PUSH a tu
rama, el deploy se va a hacer de forma automática. Accediendo a `Settings` en el
panel de tu servicio podés cambiar este comportamiento o indicar que sólo se
dispare el deploy cuando ocurren commits en otra rama (por ej. `production`).

ℹ️ Si tenes problemas de incompatibilidades con ciertas dependencias que no sabes
de donde vienen, borra el archivo `package-lock.json`, ejecura `npm install`,
reenvia los cambios al repositorio y solucionado (:

ℹ️ En la página de eventos, donde podes ver los logs del despliegue, la misma
página menciona que podes adquirir un plan pago para tus deploys sean más
rápidos. Es lo que tiene usar el free tier.

ℹ️ Los minutos de build se limitan a 500/mes en el plan individual.

#### Links de utilidad

- Plataforma de render: [render.com](https://render.com)
- Repositorio con el código:
  [Codigo del tutorial](https://github.com/juanespinola05/deploy-to-render-tutorial)
