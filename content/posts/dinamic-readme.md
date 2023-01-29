---
title: Cómo crear un README dinámico para tu perfil de Github con Node.js y Github Actions
excerpt: Paso a paso para crear un programa con Node.js y Github Actions para tener tu propio README dinámico en tu perfil de GitHub que se actualiza automáticamente
date: '2023/01/17'
readingTime: '30/60 minutos de lectura'
tags:
  - javascript
  - nodejs
  - github
imageUrl: '/posts/dinamic-readme-banner.webp'
ogUrl: '/posts/og/dinamic-readme-banner.png'
iconUrl: '/posts/github-actions.webp'
---

No sé si ya estabas al tanto de los ✨ **repositorios especiales** ✨ que podes
crear en tu cuenta de Github. Básicamente es uno que tiene tu mismo nombre de
usuario. Github lo vuelve especial, ya que si dentro tiene un `README.md` (no
tenerlo es delito igual 😳) a este lo va a mostrar en tu perfil.
<br />
<br /> Si tenés ganas de enriquecer tu perfil, darle estilo y hacer que su
contenido sea dinámico, este sencillo tutorial te va a ayudar a construirlo.
<br />

#### Plantilla

Lo primero que vamos a necesitar es establecer cuál va a ser nuestro diseño y
qué información nos interesa compartir. Preparalo a mano según más te guste!
Vamos a meter un poco de código para que luego, algunas partes sean dinámicas.
<br />

Para este tutorial, yo decidí usar este diseño que cree recolectando ideas de
otros usuarios:
<br />
<br /> ![Diseño a usar](https://i.imgur.com/ooH8HTX.png)
<br />

Si no sabés cómo crearlo, te dejo este repositorio y web que te van a servir de
inspiración para poder maquetarlo:

- [Awesome GitHub Profile README](https://github.com/abhisheknaiidu/awesome-github-profile-readme)
- [Awesome GitHub Profile READMEs Web](https://zzetao.github.io/awesome-github-profile/)

También podes utilizar el mismo y hacerle tus modificaciones 😄

Este diseño viene genial para el tutorial. Tiene dos tablas, una de últimos
posts y otra de últimos videos. Si tuviésemos que actualizar manualmente esa
información por cada vez que tenemos un nuevo post o un nuevo video, sería super
tedioso. En su lugar, vamos a usar Github Actions para que se encargue de
traernos lo último a nuestro `README.md` cada cierta cantidad de tiempo.
<br /> Esta va a ser la primera de dos partes. Sólo vamos a completar la tabla
de videos, en la siguiente vemos cómo scrappear un blog y cargar las últimas
publicaciones!

#### Requerimientos

En este tutorial vamos a necesitar:

- Una cuenta en Github, por supuesto
- Git
- Node.js (yo estoy en la versión 16)
- El template engine que conozcas o te guste usar (yo voy a usar
  [EJS](https://ejs.co/))

#### Creando el repositorio

Primero que nada, vamos a dirigirnos a nuestro perfil de Github a crear nuestro
✨ **repo especial** ✨.

En la página de inicio de Github, al lado de su imagen de perfil pueden crear un
nuevo repositorio:
<br />

<div align="center">
  <img src="https://i.imgur.com/0WvQrB1.png" alt="" />
</div>
<br />
Como nombre del repositorio, vamos a poner nuestro mismo nombre de
usuario, para que sea ✨ <b>especial</b> ✨.
<br />
<img src="https://i.imgur.com/riDXmtN.gif" alt="" />
<br />

ℹ️ Solo para este tutorial, yo lo nombre <b>dinamic-readme-tutorial</b>

**Paso importante para poder clonarlo:** vamos a bajar en esta misma página y
marcar la opción "Add README file"
<br /><br />
<img src="https://i.imgur.com/XzK6Orz.png" alt="" />

Una vez creado, vamos a clonarlo en nuestra máquina. Copiamos el link y nos
dirigimos a nuestra terminal:
<br /><br />
<img src="https://i.imgur.com/us3GlGW.png" />
<br /> Si utilizas SSH, copias la dirección que aparece en la imagen. Sino, el
link HTTPS va a estar bien (vas a tener que iniciar sesión al clonar el
repositorio)
<br />

#### Clonando el repositorio

Una vez copiado el link, vamos a nuestra terminal y ejecutamos el siguiente
comando:

```bash
$ git clone <tu-link>

# Por ejemplo: git clone git@github.com:juanespinola05/dinamic-readme-tutorial.git
```

Si utilizas HTTPS va a pedirte que inicies sesión.

A continuación nos metemos en la carpeta y ya podemos comenzar:

```bash
$ cd <nombre-de-la-carpeta>

# Por ejemplo: cd dinamic-readme-tutorial
```

¡Ya podemos empezar!

#### Inicializando el proyecto de Node.JS

Para iniciar, vamos a ejecutar un comando de NPM para que nos prepare nuestro
archivo `package.json`

```bash
$ npm init -y
```

Esto nos va a generar el siguiente archivo:

```javascript
{
  "name": "dinamic-readme-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/juanespinola05/dinamic-readme-tutorial.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/juanespinola05/dinamic-readme-tutorial/issues"
  },
  "homepage": "https://github.com/juanespinola05/dinamic-readme-tutorial#readme"
}
```

A partir de este punto, podes usar tu editor de código preferido para trabajar
en el programa.
<br />

Vamos a habilitar a nuestro proyecto como un módulo para poder utilizar ES
Modules y top level await agregando a nuestro `package.json` el atributo
`"type"="module"`

```javascript
// package.json
{
  "name": "dinamic-readme-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // Acá lo agregamos!
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/juanespinola05/dinamic-readme-tutorial.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/juanespinola05/dinamic-readme-tutorial/issues"
  },
  "homepage": "https://github.com/juanespinola05/dinamic-readme-tutorial#readme"
}
```

#### Instalando las dependencias necesarias

Lo que vamos a utilizar:

- `node-fetch` para tener la fetch api (a partir de la version 17 de Node ya no
  es necesario ya que se encuentra implementado de forma experimental)
- `ejs` para nuestro template engine
- `dotenv` para importar nuestras variables de entorno

```bash
$ npm install ejs dotenv node-fetch -e
```

Vamos a crear el archivo `.gitignore` para evitar enviar ficheros no deseados a
nuestro repositorio remoto en GitHub. Lo creamos en la raíz de nuestro y dentro
escribimos:

```bash
node_modules/
```

Listos para comenzar!

#### Crear plantilla

Vamos a crear nuestra plantilla. Este archivo va a ser de extensión `.ejs`, la
extensión que utiliza el template engine EJS. Lo vamos a utilizar como base para
generar nuestro README:

```html
// template.ejs
<h1>Hola, soy Juan!</h1>
<h3>Si buscas un desarrollador de software con un enfoque creativo e innovador, ¡has encontrado a la persona adecuada!
</h3>

Con más de cinco años de experiencia en el desarrollo de aplicaciones, tengo una sólida comprensión de las mejores
prácticas y una habilidad probada para resolver problemas complejos. Me apasiona experimentar con nuevas tecnologías y
buscar soluciones creativas a los desafíos técnicos. Cuando no estoy programando, me gusta colaborar con otros
desarrolladores en proyectos de código abierto y compartir mis conocimientos en mi blog y en mi cuenta de Twitter. ¡Si
estás buscando a un desarrollador que pueda aportar un enfoque fresco y original a tu proyecto, no dudes en ponerte en
contacto conmigo!

<p align="left">
  <a href="">
    <img alt="" width="50px"
      src="https://user-images.githubusercontent.com/43545812/144034996-602b144a-16e1-41cc-99e7-c6040b20dcaf.png" />
  </a>
  <a href="">
    <img alt="" width="50px"
      src="https://user-images.githubusercontent.com/43545812/144035037-0f415fc7-9f96-4517-a370-ccc6e78a714b.png" />
  </a>
  <a href="">
    <img alt="" width="50px"
      src="https://user-images.githubusercontent.com/43545812/144035088-0dfb165f-8fe0-4d13-896c-876c29d2b128.png" />
  </a>
  <a href="">
    <img alt="" width="50px"
      src="https://user-images.githubusercontent.com/43545812/144035120-1ad5169b-91c7-4078-bef9-6a82c733f373.png" />
  </a>
</p>

<hr />
<h3>Mis últimos posts</h3>
<table>
  <thead>
    <tr>
      <th>Fecha</th>
      <th>Título</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        12/12/2022
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
      <td>
        <a href="#">Leer</a>
      </td>
    </tr>
    <tr>
      <td>
        12/12/2022
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
      <td>
        <a href="#">Leer</a>
      </td>
    </tr>
    <tr>
      <td>
        12/12/2022
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
      <td>
        <a href="#">Leer</a>
      </td>
    </tr>
    <tr>
      <td>
        12/12/2022
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
      <td>
        <a href="#">Leer</a>
      </td>
    </tr>
  </tbody>
</table>
<br />

<hr />
<h3>Mira mis últimos videos</h3>
<table>
  <thead>
    <tr>
      <th>🎬</th>
      <th>Título</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://youtube.com">
          <img src="https://f.hellowork.com/blogdumoderateur/2022/06/youtube-astuces-vignettes.jpg" width="200" />
        </a>
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://youtube.com">
          <img src="https://f.hellowork.com/blogdumoderateur/2022/06/youtube-astuces-vignettes.jpg" width="200" />
        </a>
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://youtube.com">
          <img src="https://f.hellowork.com/blogdumoderateur/2022/06/youtube-astuces-vignettes.jpg" width="200" />
        </a>
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
    </tr>
  </tbody>
</table>
<br />
```

Más adelante vamos a modificar a nuestro archivo con la sintaxis especial de EJS
para que las tablas de posts y videos se generen con la infomación que vamos a
buscar!

#### Escribiendo el index.js

A continuación importamos `writeFileSync` y `readFileSync` que nos van a servir
para escribir y leer archivos respectivamente. También vamos a hacer uso de la
función `resolve` del módulo `path` para crear nuestras rutas a nuestros
archivos y `ejs` para hacer el renderizado

```javascript
// index.js
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import ejs from 'ejs';
```

Creamos nuestras rutas:

```javascript
// index.js
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import ejs from 'ejs';

// Creamos nuestras rutas a nuestros archivos
const TEMPLATE_PATH = resolve('template.ejs');
const README_PATH = resolve('README.md');
```

Vamos a leer nuestro archivo de plantilla y guardar su información en una
constante:

```javascript
// index.js
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import ejs from 'ejs';

const TEMPLATE_PATH = resolve('template.ejs');
const README_PATH = resolve('README.md');

// Leemos el contenido del archivo de
// plantilla y lo guardamos en template
const template = readFileSync(TEMPLATE_PATH);
```

Nuestro proyecto hasta el momento luce así:

<img src="https://i.imgur.com/og01jHl.png" alt="" />
<br />

El archivo `package-lock.json` y la carpeta `node_modules` los crea Node.js.

#### Buscando nuestra información

Este es el momento de crear las funciones que van a obtener nuestra información
para tenerla actualizada.
<br /> Dependiendo de nuestro perfil y lo que queramos hacer, vamos a buscar
información de distintos lugares. En mi caso, necesito traer la información
desde mi blog, y tambien traer los videos de Youtube.
<br /> La idea es simple, si tenes casos diferentes, vas a saber cómo encaminar
la solución y hacer tu propia implementación para buscar tu propia información.

Voy a crear una carpeta llamada `utils/` y dentro de esta, un archivo llamado
`videos.js`

En el archivo `videos.js` procedo a escribir la función para obtener esa
información.
<br /> Para hacer fetching de datos de Youtube, podemos usar Google APIs, hacer
scrapping o, en mi caso, usar una API de Rapid API que lo trae un poco más
simple. Pueden ver información sobre esta en este link:
[Youtube v3 API Documentation](https://rapidapi.com/ytdlfree/api/youtube-v31/)
<br /> Esta API requiere que utilice una API KEY para poder comunicarme con
ella, por lo que voy a crear en la raíz de mi proyecto dos archivos: `.env` y
`.env.example`. En mi archivo .env voy a colocar:

```bash
// .env
RAPID_API_KEY='aidh29r87h23798fyh2b1298rf'
```

```bash
// .env.example
RAPID_API_KEY=''
```

El archivo .env tiene información sensible así que no debe ser enviado a nuestro
repositorio remoto. Para ello, lo agregamos a nuestro archivo `.gitignore`

```bash
node_modules/
.env
```

Nuestro proyecto ahora luce así:

<img src="https://i.imgur.com/rlFSKea.png" alt="">
<br/>

Ahora sí, en nuestro archivo de `videos.js`:

<br />

```javascript
// videos.js

// Importamos la función fetch del paquete node-fetch
import fetch from 'node-fetch';
// Importamos config del módulo dotenv que instalamos
import { config } from 'dotenv';
// Lo ejecutamos para que RAPID_API_KEY esté disponible
// en el ambiente
config();

// Creamos una constante para almacenar el ID de nuestro canal
const CHANNEL_ID = 'UCaw6pZKpqHpK-I0spCw0eeQ';
// Creamos la URL a la que apuntaremos
// Los parametros que tienen indican:
//  maxResults=3 Traer solo 3 videos
//  part=snippet,id Traer el ID del video y sus detalles
//  order=date ordenarlos por fecha
const FETCH_URL =
  `https://youtube-v31.p.rapidapi.com/search?channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`;
// Creamos las opciones necesarias para nuestra petición
const options = {
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};
// Creamos la función que hará el trabajo de la petición
async function getVideosFromAPI() {
  // El try/catch nos permitirá interceptar errores si es que ocurren
  try {
    // Hacemos la petición con fetch()
    const response = await fetch(FETCH_URL, options);
    // Convertimos la respuesta a un objeto
    const data = await response.json();

    // La API nos responde con varios detalles sobre el video
    // Nosotros necesitamos unos pocos, asi que vamos a obtener
    // lo necesario con la función formatData que vamos a crear
    // debajo
    return formatData(data);
  } catch {
    return [];
  }
}

// Esta función recibe el cuerpo de la respuesta
// y devuelve un array de los videos con la información
// que necesitamos
function formatData(data) {
  // Extraemos los items (array) del cuerpo
  const { items } = data;
  // Mapeamos nuestro array para obtener lo que necesitamos
  const videos = items.map((item) => ({
    id: item.id.videoId,
    thumbnail: item.snippet.thumbnails.medium.url,
    title: item.snippet.title,
    url: 'https://youtube.com/watch?v=' + item.id.videoId,
  }));
  // retornamos el nuevo array
  return videos;
}

// Exportamos esta función para poder usarla desde otros ficheros
export default getVideosFromAPI;
```

Una vez que creamos todo nuestra función, ya podemos importarla y llamarla desde
nuestro archivo principal!

```javascript
// index.js
...
// Importamos la función
import getVideosFromAPI from './utils/videos.js'

const TEMPLATE_PATH = resolve('template.ejs')
const README_PATH = resolve('README.md')

const template = readFileSync(TEMPLATE_PATH)

// Creamos el objeto con la información que vamos a necesitar
const data = {
  videos: await getVideosFromAPI() // llamamos a nuestra función
}
```

Podemos probar como venimos hasta este punto con un `console.log`:

```javascript
//index.js
...

const data = {
  videos: await getVideosFromAPI() // llamamos a nuestra función
}
console.log(data)
```

En nuestra terminal:

```bash
$ node index.js
```

Resultado:

```javascript
{
  videos:
  [
    {
      id: 'DWRb05qosak',
      thumbnail: 'https://i.ytimg.com/vi/DWRb05qosak/mqdefault.jpg',
      title: 'AdventJS on the fly #6: Creating Xmas decorations',
      url: 'https://youtube.com/watch?v=DWRb05qosak',
    },
    {
      id: 'gUxmFHvcXgk',
      thumbnail: 'https://i.ytimg.com/vi/gUxmFHvcXgk/mqdefault.jpg',
      title: 'Practicando CSS desde cero #4: Sección de modelos',
      url: 'https://youtube.com/watch?v=gUxmFHvcXgk',
    },
    {
      id: 'TBueCOpgvFo',
      thumbnail: 'https://i.ytimg.com/vi/TBueCOpgvFo/mqdefault.jpg',
      title: 'AdventJS on the fly #4: Box inside a box and another...',
      url: 'https://youtube.com/watch?v=TBueCOpgvFo',
    },
  ];
}
```

#### Modificando nuestra plantilla con EJS

Ya que tenemos nuestra información, sólo nos queda editar nuestro archivo
template para que este se encargue de, por cada video que le enviamos, crear el
elemento HTML para el mismo.
<br /> En un comienzo escribimos videos a mano en nuestro archivo
`template.ejs`. Ahora vamos a reemplazarlos con la sintaxis de EJS para que
estos se rendericen:
<br /> Antes:

```html
// template.ejs
...
<h3>Mira mis últimos videos</h3>
<table>
  <thead>
    <tr>
      <th>🎬</th>
      <th>Título</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://youtube.com">
          <img src="https://f.hellowork.com/blogdumoderateur/2022/06/youtube-astuces-vignettes.jpg" width="200" />
        </a>
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://youtube.com">
          <img src="https://f.hellowork.com/blogdumoderateur/2022/06/youtube-astuces-vignettes.jpg" width="200" />
        </a>
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://youtube.com">
          <img src="https://f.hellowork.com/blogdumoderateur/2022/06/youtube-astuces-vignettes.jpg" width="200" />
        </a>
      </td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </td>
    </tr>
  </tbody>
</table>
...
```

Ahora:

```html
// template.ejs
...
<h3>Mira mis últimos videos</h3>
<table>
  <thead>
    <tr>
      <th>🎬</th>
      <th>Título</th>
    </tr>
  </thead>
  <tbody>
<% videos.forEach(video => { %> 
  <tr>
    <td>
      <a href="<%= video.url %>">
        <img
          width="200"
          src="<%= video.thumbnail %>"
        />
      </a>
    </td>
    <td><%= video.title %></td>
  </tr>
<% }) %> 
  </tbody>
</table>
...
```

Podes encontrar cómo funciona esta sintaxis en la
[documentación de EJS](https://ejs.co/).
<br /> El código que añadimos va a tomar `videos` del objeto `data` que creamos
y va a ejecutar un forEach. Por cada video va a crear los elementos `<tr>` y los
que tiene dentro con la información de cada uno de los videos.

ℹ️ Nótese cómo entre la etiqueta `tbody`está todo indendato sobre el margen. Esto
está hecho a posta, ya que puede pasar que al parsear el markdown, se cree un
snippet de nuestro código generado en lugar de mostrarlo como queremos.

#### Renderizado y guardado de la plantilla

Y por último en nuestro index.js necesitamos crear el renderizado para guardar
nuestro nuevo README.md:

```javascript
//index.js
...
// Transformamos nuestra plantilla a un string
const templateString = template.toString()

// Utilizamos la función render del módulo ejs
// y le enviamos nuestra información para que genere
// el nuevo texto
const renderedText = ejs.render(templateString, data)

// Guardamos el texto creado en nuestro archivo
writeFileSync(README_PATH, renderedText)
```

Y listo!!!!! Para probar podemos hacer nuevamente

```bash
$ node index.js
```

Esto deberia traernos la información, formatearla, leer la plantilla,
renderizarla y guardar el resultado en README.md

#### Automatización con Github Actions

Github Actions es una plataforma de **CI/CD** que por supuesto está integrada a
github y nos va a permitir crear lo que se llaman <u>workflows</u>. Estos
workflows son simplemente scripts donde detallamos una <b>serie de pasos y
eventos para que se ejecuten ciertas tareas en nuestros repositorios.</b>

<br /> Nosotros vamos a crear un workflow especial que se ejecute, por ejemplo,
todos los días a las 12pm. La idea es que este proceso cargue nuestro código, lo
ejecute y los nuevos cambios los guarde en nuestro repositorio. Así de esa
manera, todos los días a las 12pm de forma automática Github va a actualizar
nuestro `README.md` con la información nueva!
<br />
<br /> ℹ️ Si te interesa conocer cómo funcionan Github Actions en detalle y
aprender más sobre integración continua, podes indagar más en su documentación:
[Github Actions Documentation](https://docs.github.com/en/actions)

En nuestro proyecto vamos a crear una carpeta llamada `.github/` y dentro de
esta, otra llamada `workflows`. Dentro de esta última, vamos a crear un archivo
`llamado update-readme.yaml`. En este archivo vamos a especificar las reglas que
necesitamos, que son las siguientes:

```yaml
name: Automaticaly update README
on:
  push:
    branches:
      - main
  schedule:
    - cron: '0 12 * * *'

jobs:
  render_readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Generate README.md
        run: node index.js
        env:
          RAPID_API_KEY: ${{ secrets.RAPID_API_KEY }}
      - name: Save new READ.ME
        uses: mikeal/publish-to-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH_NAME: 'main'
```

A estos scripts se los conoce como Cron Jobs: tareas que se ejecutan
periodicamente. Este específicamente se ejectuta:

```yaml
schedule:
  - cron: '0 12 * * *'
```

Podes configurar tu periodo en esta página:
[Crontab.guru - The cron schedule expression editor](https://crontab.guru/)

El **Job** que aparece debajo llamado `render_readme` simplemente establece
todos los pasos para:

1. Montar una máquina con Ubuntu
2. Cargar nuestro código
3. Instalar Node.js en la máquina
4. Instalar las dependencias que utiliza nuestro proyecto
5. Ejecutar nuestro archivo de entrada `index.js`
6. Si hay cambios, hacerles commit y push automático a nuestro repositorio
   (actualizarlo)

Para que el paso número 5 pueda ejecutarse necesitamos proveerle la variable de
entorno necesaria (RAPID_API_KEY en este caso) que no está disponible ya que no
es información que enviamos a nuestro repositorio. Para añadirla vamos a seguir
estos pasos:
<br />
<br /> En la página de nuestro repositorio, nos dirigimos a: **Settings >
Secrets and Variables > Actions > New repository Secret** y en esa pantalla
rellenamos la información:
<br />
<br /> ![](https://i.imgur.com/0dtagB8.gif)
<br /> Para el último paso, nuestra "GITHUB_TOKEN" va a tener que tener permisos
para leer y escribir en nuestro repositorio. Para eso tenemos que ir a la
configuración de nuestro repositorio y habilitarla **Settings > Actions >
General > Workflow Permissions > Read and write permissions**:
<br />
<br /> ![](https://i.imgur.com/ekzzOYa.gif)

Este proceso también se dispara cuando nosotros hacemos un push a nuestro
repositorio, es decir cada vez que nosotros mismos enviamos cambios:

```yaml
on:
  push:
    branches:
      - main
```

Si tus rama tiene un nombre distinto, vas a tener que reemplazarlo en el lugar
de `main`

#### Enviando todo a nuestro repositorio

Tan solo falta hacer commit y enviar todo a GitHub!

```bash
$ git add .
$ git commit -m "Initial script for automatic readme"
$ git push origin main
```

Este push va a disparar el workflow y vamos a poder ver cómo se ejecuta en
nuestro repositorio, en la pestaña de **Actions**

<br />
Así, por ejemplo se está generando y actualizando mi README a diario:
<br /><br />
<img src="https://i.imgur.com/wp8GREf.png" alt="" />

#### Conclusión

Y listo! 🎉🎉 Así es como creamos un readme dinámico y ✨ **especial** ✨

En la segunda parte de este post, vamos a completar la tabla de post, haciendo
scrapping con puppeteer, una manera distinta para poder obtener información.

Espero que este post te haya sido de ayuda o te haya dado nuevas ideas para
crear tu propio programa. Si te gustó no dudes en dejar una estrellita en el
repositorio ⭐

#### Links de utilidad

- [Repositorio dinamic-readme-tutorial/](https://github.com/juanespinola05/dinamic-readme-tutorial/)
- [Plantilla usada](https://pastebin.com/gv7J4Wau)
  <br/>
