---
title: Instalar un linter súper fácil para cualquier proyecto de JavaScript o Typescript
excerpt: Tutorial de cómo instalar StandardJS y ts-standard para lintar y formatear tu código de forma automática en cualquier proyecto de Node.js sin configuración en Visual Studio Code
date: '2023/01/30'
readingTime: '10 minutos de lectura'
tags:
  - typescript
  - nodejs
  - javascript
imageUrl: '/posts/linter-con-standard-en-vscode.webp'
ogUrl: '/posts/og/linter-con-standard-en-vscode.png'
iconUrl: '/posts/eslint.webp'
---

#### 🔹 Introducción

Algunas de las cualidades del software de calidad son: **el buen formato** y
**la legibilidad**. El código que es sencillo de leer y entender es más
mantenible a través del tiempo. Esto sumado a que sea consistente a través de
todo el proyecto, por supuesto.
<br> En la mayoría de los casos, la legibilidad está en nuestras manos:
dependiendiendo de la implementación que nosotros escribamos, nuestro código va
a ser más o menos autodescriptible y legible.
<br><br> Dentro de la legibilidad tenemos al **formato que tiene nuestro
código**. Esto es: cuántos espacios usamos para tabular, si usamos comillas
simples o dobles, si dejamos espacio entre las comas, si colocamos punto y coma
al final de todas las líneas... y un montón de otras reglas.
<br> Es re importante que el formato sea el mismo en toda la base del código,
sino parece un literal copy-paste por todos lados de código ajeno.
(probablemente lo sea pero lo importante es que no parezca 🧐).
<br>
<br> Esto no es algo que tenga que ver con el funcionamiento del código,
simplemente se trata de seguir buenas prácticas. Como desarrolladores, nuestro
producto es lo que diseñamos y escribimos. Por ello, un buen programador es uno
que cuida los programas que escribe teniendo en cuenta estos temas.

En el caso de JavaScript, existen herramientas como **ESlint** y **Prettier**
que ayudan a hacer análisis estático del código a medida que estamos
desarrollando, para corregir estos errores de formato.
<br> Personalmente nunca me llevé bien con la configuración de estas
herramientas, y cuando lo quise intentar con TypeScript menos 😒 😹.
<br><br> Por eso mismo, hoy en día uso dos paquetes de NPM que lo único que
necesitan que yo haga es instalarlos y conectarlos: `standard` y `ts-standard`.
Para JavaScript y TypeScript respectivamente.
<br> Ambos están basados en una serie de reglas que tienen el nombre
`JavaScript Standard Style`.

<br> Básicamente, consta en <b>no usar punto y coma ( ; )</b> y <b>utilizar
comillas simples</b>, entre otras reglas.
<br><br> Instalarlas es lo más sencillo que hay y se puede hacer con cualquier
proyecto de Node.js. Veamos...

#### 🔹 Instalando standard con JavaScript

Para usar este estilo con proyectos de JavaScript, vamos a dirigirnos al
directorio de nuestro proyecto e instalar la dependencia:

```bash
$ npm install standard --save-dev
```

ℹ️ Es importante instalarla como dependencia de desarrollo ya que sólo la
necesitamos mientras estamos escribiendo código.

#### 🔹 Configuración de package.json

Esta dependencia trae consigo un archivo `eslintrc.json`, que es el que
especifica qué reglas debe seguir nuestro código.
<br> En nuestro archivo `package.json` vamos a declarar que vamos a estar usando
esa configuración para nuestro proyecto:

```javascript
{
  "devDependencies": {
    "standard": "17.0.0"
  },
  "eslintConfig": {
  	"extends": ["./node_modules/standard/eslintrc.json"]
  }
}
```

Debajo, añadimos "eslintConfig" con la información como aparece en el snippet de
arriba. Esto va a declarar que en nuestro proyecto estamos utilizando standard
como reglas.

A continuación, podemos crear algunos scripts en nuestro `package.json` que van
a resultar útiles:

```javascript
{
  "scripts": {
    "lint": "standard",
    "lint:fix": "standard  --fix"
  }
}
```

- `lint` va a darnos un reporte de todos los archivos que inspeccione.
- `lint:fix` va a formatear el código corrigiendo los errores de formato.

#### 🔹 Integración con Visual Studio Code

Para tener una mejor experiencia con esta herramienta, lo mejor es instalar dos
extensiones en nuestro editor **Visual Studio Code**:

- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
  para resaltar los errores que tangamos en nuestro código de una forma más
  rápida.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  para que nuestro editor comprenda las reglas de nuestro proyecto y notifique
  directamente en el código cuando cometemos errores de formato.

Estas dos extensiones son el par perfecto para que al momento de escribir
tengamos feedback inmediato de las faltas que cometemos.

#### 🔹 Instalación para TypeScript

Para el caso de TypeScript, los pasos son similares, pero tenemos que escribir
algunas cositas más.

El paquete que vamos a utilizar se llama `ts-standard`. Lo instalamos, y
realizamos la declaración de la misma manera:

```bash
$ npm install ts-standard --save-dev
```

ℹ️ También la guardamos como dependencia de desarrollo.

#### 🔹 Configuración de package.json

En nuestro archivo `package.json` vamos a agregar la misma configuración que la
anterior, pero con una opción más:

```javascript
{
  "devDependencies": {
    "standard": "17.0.0",
    "typescript": "4.9.4"
  },
  "eslintConfig": {
    "extends": ["./node_modules/ts-standard/eslintrc.json"],
    "parserOptions": {
      "project": "./tsconfig.json"
    }
  }
}
```

En este caso le indicamos qué reglas usar (el `eslintrc.json` de `ts-standard`)
pero además le pasamos cuál es la configuración de TypeScript de nuestro
proyecto.

🎉 Y Con esto ya estaría funcionando! La integración con Visual Studio Code es
la misma.

#### 🔹 Formateo automático cuando guardo

Lo mejor de todo, es que ni siquiera tenes que usar los scripts del
`package.json`. Podes crear la siguiente configuración en tu proyecto (que
incluso le va a ser útil a tus compañeros) para que cada vez que guardes un
archivo, este se formatee solo.

Vamos a crear una carpeta llamada `.vscode/` y dentro un archivo llamado
`settings.json`. En ese archivo copiamos:

```javascript
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

#### 🔹 Conclusión

Fijate como en re pocos pasos y con casi nada de configuración podes tener un
linter funcionando y sin preocuparte, mantener tu código con un formato
consistente.

Espero que te haya sido útil!

#### 🔹 Links de utilidad

- [StandardJS](https://standardjs.com/)
