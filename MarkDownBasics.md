##                     Sintaxis básica de Markdown
___
### Markdown nació como herramienta de conversión de texto plano  a HTML en 2004.
___
# Encabezados
### El elemento más básico son los encabezados.Hay 6 tamaños y se escriben con el numeral '#'
# H1
## H2
### H3 etc.
___
# Citas
### Para añadir citas hay que usar el simbolo mayor que '>'
> Esto es una cita
> Continuacion de la cita
___
# Listas desordenadas
### Las listas desordenadas son muy fáciles en Markdown.Solo necesitan empezar con un guión,asterisco o simbolo de suma(-,* y +).Esto es según aplicación,el estandar es el guión.
- Elemento desordenado 1
* Elemento desordenado 2
+ Elemento desordenado 3
___
# Lista numerada
### Para crear una lista numerada u ordenada sólo hay que incluir el número seguido de un punto y después un espacio.
1. Tarea ordenada 1
2. Tarea ordenada 2
3. Tarea ordenada 3
___
## Igual que en HTML se pueden anidar listas.Simplemente hay que usar una tabulación:
1. Elemento ordenado 1
    - Desordenado 1
    - Desordenado 2
2. Elemento ordenado 2
    1. Subelemento 1
    2. Subelemento 2
        1. Anidado 1
        2. Anidado 2
___        
# Separadores
### Para incluir separadores entre secciones de texto basta con escribir tres guiones bajos seguidos(___) y se creará una linea separadora.Markdown intercambiara estos simbolos por un 'hr'
___
# Negritas y cursivas
## Si rodeo un elemento con un asterisco aplicaré cursiva al texto.Con dos lo pondré en negrita y si quiero realizar ambas cosas usaré triples asteriscos.E.g:
*No sé si tengo tiempo*.**Quizás me dé pronto** por vencido y en luagr de eso ***me eche una siesta***
___
# Enlaces
### Para crear enlaces simplemente tengo que poner entre corchetes el texto que quiero utilizar como texto ancla.Acto seguido y entre paréntesis el enlace o dirección al recurso en cuestión.Si adicional pongo un string entrecomillado tras un espacio hará de tooltip del enlace.
[Enlace a url 1](https://google.com "enlace a google")
[Otro enlace](https://google.com "otro enlace a google")
### También puedo simplemente incluir la URL entre los simbolos mayor que y menor que y hará de enlace:
<https://google.com>
___
# Imagenes
### Las imágenes se añaden de una manera similar a los enlaces.En este caso el texto alternativo asociado a las mismas va  entre corchetes,seguido de la dirección al recurso entre parentesis.Además va un simbolo de exclamación al principio de todo para marcar que es una imagen y no un enlace:
![imagen 01](https://cdn.pixabay.com/blog/preview/2020/12/29/23-53-28-932_640x420.jpg)
___
![otra imagen](https://cdn.pixabay.com/blog/preview/2020/04/06/06-01-35-810_640x420.jpg)

# Imprimir código
### Para poder imprimir código y que no sea interpretado si es una linea basta con dejar 4 espacios en blanco. Si es más de una linea es más fácil encerrarlo entre triples virgulillas al principio y final:
    <hr>
    <hr>
### Parece que las triples virgulillas no funcionan en Jupyter

# Anular Markdown
### Pero si quiero usar estos simbolos de manera normal,¿como lo puedo hacer?.Simplemente hay que escapar los simbolos Markdown con una barra invertida o contrabarra y no serán interpretados por MD
\*No voy a ser interpretado como cursiva \*

## Tarea
### Mirar el video del calvo de markdown



```python
### 

```
