---
title: Generar imágenes con Deno de la forma más eficiente con ImageScript
excerpt: Aprende a usar las funcionalidades de la librería ImageScript con Deno para generar imágenes con texto de forma rápida y eficiente.
date: '2023/03/26'
readingTime: '30/60 minutos de lectura'
tags:
  - typescript
  - deno
imageUrl: '/posts/generar-imagenes-con-deno.webp'
ogUrl: '/posts/og/generar-imagenes-con-deno.png'
iconUrl: '/posts/deno.webp'
---

Recientemente estuve en búsqueda de una librería con la que poder generar
imágenes de forma automatizada para desplegar una API con Deno. Encontré varias
opciones y después de probarlas, terminé eligiendo
[ImageScript](https://deno.land/x/imagescript).
<br><br> <b>ImageScript</b> es una librería súper liviana ya que no tiene
ninguna dependencia y utiliza métodos de Web Assembly para codificar y
descodificar los binarios de las imágenes. El resultado de esto es una API que
además de ser amigagle y entendible, es muy <b>rápida y eficiente</b>. Ideal
para cualquier tarea en la que necesitemos automatizar el proceso de crear
imágenes.
<br><br> A continuación, una mini guía por varios de los métodos que están
disponibles, junto con un ejemplo final aplicando algunos de estos en una API
con Deno Fresh 💛.

## Cómo utilizar ImageScript

### Crear un lienzo

Para inicializar nuestra imagen, debemos importar la utilidad `Image` desde la
dependencia, e instanciarla. Creemos el archivo `template.ts` como plantilla:

```javascript
// template.ts
import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'

// Establecemos las medidas de nuestro lienzo
const HEIGHT = 800
const WIDTH = 900

// Instanciamos nuestra imagen con las medidas
const template = new Image(WIDTH, HEIGHT)

// Creamos una función con el método clone()
export default function createImage() {
  return template.clone()
}
```

Como se puede ver arriba, luego de crear la imagen con las medidas, exportamos
una función que retorna `template.clone()`. Este método crea una copia de esa
instancia para poder hacer manipulaciones a la imagen sin alterar la plantilla
inicial. La vamos a utilizar para ver varios ejemplos.

📄 Referencia: [Image#clone](https://imagescript.matmen.dev/Image#clone)

### Dar un color de fondo

Para dar un color al fondo de nuestro lienzo, podemos usar el método `fill()`

```javascript
// tutorial/1-fillColor.ts

import createImage from './template.ts'

// Clonamos la imagen
const image = createImage()

// Rellenamos el fondo con un color rojo #FF0000 con 100% opacidad (FF)
image.fill(0xFF0000FF)

// Guardamos el resultado en un nuevo archivo llamando al método encode()
await Deno.writeFile(`./tutorial/output/colorFilled.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/1-fillColor.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/colorFilled.png" alt="" loading="lazy">

<br> El método `fill` recibe un valor hexadecimal indicando el color de relleno.
Podemos incluir también la opacidad del relleno.

📄 Referencia: [Image#fill](https://imagescript.matmen.dev/Image#fill)

### Cargar o renderizar una imagen

Si tenemos una el archivo de una imagen que queremos renderizar en nuestro
lienzo, podemos utilizar el método `decode` para poder transformarlo y
utilizarlo:

```javascript
// tutorial/2-renderImageFS.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

// Primero leemos la imagen en nuestra carpeta
const imageFile = await Deno.readFile('./tutorial/lake.jpg')

// Luego lo convertimos en un objeto Image con el método decode
const decodedImage = await Image.decode(imageFile)

// Lo renderizamos en nuestro lienzo
image.composite(decodedImage, 0, 0)

// Guardamos la imagen nuevamente
await Deno.writeFile(
  `./tutorial/output/renderedImage.png`,
  await image.encode(),
)
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/2-renderImageFS.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/renderedImage.png" alt="" loading="lazy">
<br> Utilizando el método `composite` podemos renderizar imágenes en nuestro
lienzo. El método recibe un parámetro obligatorio y 2 opcionales:

- El primer parámetro es una instancia de Image (la imagen que decodificamos con
  `decode()`)
- El segundo y tercer párametro son las coordenadas X e Y respectivamente.

📄 Referencia: [Image#composite](https://imagescript.matmen.dev/Image#composite)

### Renderizar imagen con una URL

¿Pero qué sucede si la imagen está en internet y sólo tengo su URL? Para ello:

```javascript
// tutorial/3-renderImageFromURL.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const URL = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Cat.png'

// Hacemos fetch de nuestra URL
const response = await fetch(URL)

// Creamos un objeto Uint8Array a partir del array binario de la respuesta
const imageFromURL = new Uint8Array(await response.arrayBuffer())

// Lo codificamos y colocamos en nuestro lienzo
image.composite(await Image.decode(imageFromURL), 0, 0)

await Deno.writeFile(`./tutorial/output/imageFromURL.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/3-renderImageFromURL.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/imageFromURL.png" alt="" loading="lazy">
<br> El método es el mismo `composite`. En este caso obtenemos la imagen y la
codificamos para poder convertirla en un objeto Image manipulable.

ℹ️ Debemos asegurarnos que el archivo que vamos a codificar es de tipo imagen y
su extensión es soportada (jpg, jpeg, png, webp).

### Ajustar una imagen al contenedor

La API cuenta con el método `fit`:

```javascript
// tutorial/4-fitImage.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const lakeImage = await Image.decode(await Deno.readFile('./tutorial/lake.jpg'))

// Primero le indicamos el tamaño de la caja donde debe ajustarse
lakeImage.fit(image.width, image.height)

// La renderizamos en nuestro lienzo
image.composite(lakeImage, 0, 0)

await Deno.writeFile(`./tutorial/output/fitImage.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/4-fitImage.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/fitImage.png" alt="" loading="lazy">
<br> Este método recibe dos parámetros: un ancho y un alto. Estos determinan el
tamaño de una caja delimitadora. La imagen se centrará y ajustará a ese tamaño.
<br> En este caso estamos cargando el ancho y alto de nuestro lienzo, simulando
que el lienzo es el contenedor padre donde tiene que ajustarse. Luego lo
renderizamos con `composite`.

📄 Referencia: [Image#fit](https://imagescript.matmen.dev/Image#fit)

### Contener una imagen

Similar a la propiedad `object-fit: contain` de CSS, podemos crear una caja
delimitadora y hacer que la imagen se posicione dentro de ella sin crear ningun
recorte:

```javascript
// tutorial/5-containImage.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const lakeImage = await Image.decode(await Deno.readFile('./tutorial/lake.jpg'))

lakeImage.contain(image.width, image.height)

image.composite(lakeImage)

await Deno.writeFile(
  `./tutorial/output/imageContained.png`,
  await image.encode(),
)
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/5-containImage.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/imageContained.png" alt="" loading="lazy">
<br> Podemos darle cualquier ancho y alto, pero al darle las medidas de nuestro
lienzo, estamos haciendo que se delimite de la misma manera allí.

📄 Referencia: [Image#contain](https://imagescript.matmen.dev/Image#contain)

### Cubrir un espacio con una imagen

Al igual que la propiedad `object-fit: cover` de CSS, tenemos el método `cover`:

```javascript
// tutorial/6-coverImage.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const lakeImage = await Image.decode(await Deno.readFile('./tutorial/lake.jpg'))

lakeImage.cover(image.width, image.height)

image.composite(lakeImage)

await Deno.writeFile(`./tutorial/output/cover.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/6-coverImage.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/cover.png" alt="" loading="lazy">
<br> 📄 Referencia: [Image#cover](https://imagescript.matmen.dev/Image#cover)

### Renderizar un SVG

Para pintar un SVG en nuestro lienzo podemos usar el método `renderSVG`

```javascript
// tutorials/7-renderSVG.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const svgString = await Deno.readTextFile('./tutorial/deno.svg')

image.composite(
  Image.renderSVG(svgString, 500, Image.SVG_MODE_WIDTH),
)

await Deno.writeFile(`./tutorial/output/renderSVG.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/7-renderSVG.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/renderSVG.png" alt="" loading="lazy">
<br> El método `renderSVG` recibe 3 parámetros:

- El SVG como string: obligatorio
- Un número para escalarlo / un número de ancho / un número de alto
- El modo de redimensionamiento a usar (SVG_MODE_SCALE, SVG_MODE_WIDTH,
  SVG_MODE_HEIGHT): opcional.

Con las combinaciones se obtienen distintos resultados. Por ejemplo:

```javascript
Image.renderSVG(svgString, 500, Image.SVG_MODE_WIDTH)
```

Determina que el ancho del SVG debe ser 500. Se mantiene la relación de aspecto
del svg.

📄 Referencia:
[Image#renderSVG](https://imagescript.matmen.dev/Image#.renderSVG)

### Cortar una imagen

Utiliando el método `crop`:

```javascript
// tutorials/8-cropImage.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

image.composite(
  await Image.decode(await Deno.readFile('./tutorial/lake.jpg')),
)

// Indicamos desde qué punto y cuáles medidas
image.crop(0, 0, 400, 200)

await Deno.writeFile(
  `./tutorial/output/scroppedImage.png`,
  await image.encode(),
)
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/8-cropImage.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/scroppedImage.png" alt="" loading="lazy">

### Cortar imagen como círculo

Utilizando el método `cropCircle`:

```javascript
// tutorials/9-cropCircle.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const lakeImage = await Image.decode(await Deno.readFile('./tutorial/lake.jpg'))

lakeImage.cropCircle(false)

lakeImage.fit(image.width, image.height)

image.composite(lakeImage)

await Deno.writeFile(
  `./tutorial/output/croppedCircle.png`,
  await image.encode(),
)
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/9-cropCircle.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/croppedCircle.png" alt="" loading="lazy">
<br> 📄 Referencia:
[Image#cropCircle](https://imagescript.matmen.dev/Image#cropCircle)

### Dibujar cajas y círculos

Para dibujar en este lienzo, podes utilizar `drawBox` y `drawCircle` indicandole
los parámetros para las coordenadas y las medidas de los elementos.

```javascript
// tutorials/10-drawing.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

const lakeImage = await Image.decode(await Deno.readFile('./tutorial/lake.jpg'))

image.composite(lakeImage)

// Indicamos las coordenadas, las medidas y el color
const box = new Image(200, 200).drawBox(0, 0, 200, 200, 0xFF0000FF)

// Indicamos las coordenadas, el radio y el color
const circle = new Image(200, 200).drawCircle(100, 100, 100, 0x00FF00FF)

image.composite(box)
image.composite(circle)

await Deno.writeFile(`./tutorial/output/drawing.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/10-drawing.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/drawing.png" alt="" loading="lazy">
<br> 📄 Referencia:

- [Image#drawBox](https://imagescript.matmen.dev/Image#drawBox)
- [Image#drawCircle](https://imagescript.matmen.dev/Image#drawCircle)

### Redimensionar las imágenes

Esta función permite darle la dimensión deseada a una imagen. Podemos indicar
ademas si queremos preservar la relación de aspecto:

```javascript
// tutorials/11-resizing.ts

import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
const lakeImage = await Image.decode(await Deno.readFile('./tutorial/lake.jpg'))

// Indicamos las medidas
lakeImage.resize(600, Image.RESIZE_AUTO)

await Deno.writeFile(`./tutorial/output/resized.png`, await lakeImage.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/11-resizing.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/resized.png" alt="" loading="lazy">
<br> El método recibe ancho y alto, sin embargo podemos especificar uno sólo,
junto con el modo automático para que se preverse la relación de aspecto, como
en el ejemplo.

📄 Referencia: [Image#resize](https://imagescript.matmen.dev/Image#resize)

### Renderizar texto

Para escribir en nuestro lienzo, podemos usar `Image.renderText()`. Esta función
nos creará una imagen con el texto que le indiquemos, así podemos añadirla a
nuestro lienzo con `composite`.

```javascript
// tutorials/12-renderText.ts

import {
  Image,
  TextLayout,
} from 'https://deno.land/x/imagescript@1.2.15/mod.ts'
import createImage from './template.ts'

const image = createImage()

// Con la clase TextLayout definimos algunos parámetros para nuestro texto
const textLayout = new TextLayout({
  maxWidth: 800,
  maxHeight: 300,
  wrapStyle: 'word',
})

// Cargamos nuestra fuente
const font = await Deno.readFile('./tutorial/Lato.ttf')

// Enviamos la fuente, el tamaño de la letra, nuestro texto, el color y la configuración (es opcional)
const textImage = Image.renderText(font, 56, 'My text!', 0xFFFFFFFF, textLayout)

image.composite(textImage)

await Deno.writeFile(`./tutorial/output/renderText.png`, await image.encode())
```

[Ver código de este ejemplo](https://github.com/juanespinola05/generate-images-with-deno/blob/main/tutorial/12-renderText.ts)
<br> Resultado:
<img width="300" src="https://raw.githubusercontent.com/juanespinola05/generate-images-with-deno/main/tutorial/output/renderText.png" alt="" loading="lazy">
<br> El método recibe ancho y alto, sin embargo podemos especificar uno sólo,
junto con el modo automático para que se preverse la relación de aspecto, como
en el ejemplo.

📄 Referencia:

- [Image#renderText](https://imagescript.matmen.dev/Image#.renderText)
- [TextLayout](https://imagescript.matmen.dev/TextLayout)

## Donde más buscar

Esta librería tiene muchos métodos más para explorar, incluso para invertir
colores, manejar la iluminación, saturación y opacidad.

Para más información podes consultar la
[documentación](https://imagescript.matmen.dev/) o ingresar a su
[servidor de Discord](https://discord.com/invite/8hPrwAH) para resolver
consultas consultas.

## Generador de imágenes Polaroid

Para que puedas explorar, usé Deno Fresh para mostrar este ejemplo: crear
imagenes polaroid! Super sencillo.

- Deploy: [generate-polaroid.deno.dev](https://generate-polaroid.deno.dev/)
- Repositorio:
  [Ver código](https://github.com/juanespinola05/generate-images-with-deno)

<img src="https://i.imgur.com/b6qdMuD.png" alt="Juanse y un pato" loading="lazy" width="400">
