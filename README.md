# Sitio estático para GitHub Pages

Este proyecto contiene una página web estática creada para presentar al grupo de trabajo y captar clientes.

## Archivos principales

- `index.html` — página principal del sitio.
- `styles.css` — estilos del sitio.
- `images/` — carpeta con las imágenes referenciadas en `index.html`.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Clona el repositorio en tu computadora o copia los archivos del proyecto al repositorio.
3. Asegúrate de que el contenido principal esté en la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `images/` (carpeta con las imágenes)
4. Haz commit y push al repositorio.

### Opción A: Publicar desde la rama `main`

1. En GitHub, ve a la página del repositorio.
2. Haz clic en `Settings` > `Pages`.
3. En `Source`, selecciona `main` y luego `/ (root)`.
4. Haz clic en `Save`.
5. GitHub dará una URL como `https://<tu-usuario>.github.io/<tu-repositorio>/`.

### Opción B: Publicar desde la rama `gh-pages`

1. Crea una rama llamada `gh-pages`.
2. Sube los archivos a esa rama.
3. En GitHub, ve a `Settings` > `Pages`.
4. En `Source`, selecciona `gh-pages` y `/ (root)`.
5. Guarda y usa la URL que GitHub provea.

## Rutas de las imágenes

Estas son las referencias usadas en `index.html`:

- `images/fondo/f1.jpg`
- `images/banderillero/b1.jpg`
- `images/banderillero/b2.jpg`
- `images/banderillero/b3.jpg`
- `images/banderillero/b4.jpg`
- `images/pesaje/p1.jpg`
- `images/pesaje/p2.jpg`
- `images/pesaje/p3.jpg`
- `images/pesaje/p4.jpg`
- `images/fertilizadora/f1.jpg`
- `images/fertilizadora/f2.jpg`
- `images/fertilizadora/f3.jpg`
- `images/fertilizadora/f4.jpg`

> Si no quieres usar todas las imágenes, puedes eliminar las referencias de `index.html` o reemplazarlas por otras.

## Ajustes rápidos

- Cambia los textos de contacto en `index.html` si querés usar otro correo, teléfono o redes.
- Si no querés un fondo con imagen, elimina la propiedad `background-image` en la clase `.hero` dentro de `styles.css`.

## Recomendación

Una vez que tengas el repositorio listo, revisa el sitio en la URL de GitHub Pages y confirma que las imágenes carguen correctamente.
