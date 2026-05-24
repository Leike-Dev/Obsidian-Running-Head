<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.0-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | [Português](./README_pt.md) | Español | [Français](./README_fr.md) | [简体中文](./README_zh-CN.md)

</div>

---

¡Transforma tus notas con un hermoso encabezado de metadatos estilo blog! 📝✨

**Running Head** es un plugin de Obsidian que agrega automáticamente un encabezado personalizable a tus notas, mostrando la fecha de publicación, el tiempo estimado de lectura, una etiqueta de actualización, la ruta de navegación de la nota, una barra de progreso de desplazamiento y cualquier propiedad personalizada de frontmatter que desees.

## Características

- **📝 Múltiples diseños**: Elija entre el estilo **Blog** (ruta encima del título, metadatos debajo) o el estilo **Wiki** (metadatos encima del título, ruta debajo).
- **⏱️ Tiempo de lectura y fechas**: Calcula y muestra automáticamente el tiempo de lectura y fechas formateadas según tu idioma (soporta idiomas asiáticos).
- **🧩 Campos personalizados**: Muestra cualquier propiedad YAML, como hermosas "píldoras", enlaces o texto en el encabezado y casillas de verificación — con posicionamiento **encima** o **debajo** del título individualmente.
- **📁 Alcance de carpetas**: Mantén limpio tu baúl ocultando campos personalizados en carpetas específicas (soporta múltiples carpetas por campo).
- **🍞 Ruta de la nota**: Navega fácilmente con una ruta de carpetas en la que puedes hacer clic mostrando exactamente dónde está tu nota, con resaltado opcional de la carpeta actual.
- **📊 Barra de progreso de desplazamiento**: Una elegante barra de progreso fija en la parte superior de la nota que rastrea tu posición de lectura en tiempo real.
- **🎨 Colores personalizados**: Define los colores de la etiqueta de actualización, de la ruta de la nota o de la barra de progreso de forma simple e individual.
- **📅 Formato de fecha flexible**: Elija el idioma de formato entre 18 idiomas disponibles o defina un formato personalizado usando la sintaxis de [Moment.js](https://momentjs.com/).
- **💾 Gestión de datos**: Exporta las configuraciones completas como JSON y colócalas en otro baúl o dispositivo fácilmente.
- **🤝 Integraciones poderosas**: Se integra perfectamente con el plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** (heredando los hermosos estilos de píldoras hechos por ti).
- **🌍 Internacionalización**: Interfaz completamente traducida al inglés, portugués (Brasil), español, francés y chino simplificado (basta usar Obsidian en uno de estos idiomas).

## Cómo usar

### 1. Configure propiedades del frontmatter

En los ajustes del plugin, configura las claves YAML utilizadas para:

- **Fecha de creación** (por defecto: `date`)
- **Fecha de actualización** (por defecto: `updated`)

*U otras propiedades de tipo fecha de tu preferencia.*

### 2. Personalice el diseño y la apariencia

- **Tamaño del título**: Ajusta el tamaño del título de tus notas.
- **Tamaño de los metadatos**: Ajusta el tamaño de los metadados que configuraste para aparecer en el encabezado.
- **Diseño del encabezado**: Elija entre Wiki (metadatos encima del título, ruta debajo) o Blog (ruta encima del título, metadatos debajo).
- **Ruta de la nota**: Muestra la ruta de carpetas de la nota encima del título (oculto en notas de la raíz del vault).
- **Resaltar carpeta actual**: Aplica el color de acento al último segmento de la ruta.
- **Barra de progreso de desplazamiento**: Muestra una elegante barra de progreso de lectura en la parte superior de la nota.
- **Mostrar etiqueta de actualización**: Muestra la fecha de última modificación de la nota cuando fue alterada después de su creación.
- **Color de resaltado de carpeta**: Color personalizado para la ruta (vacío = color de acento del tema).
- **Color de la barra de progreso**: Color de la barra de progreso (vacío = color de acento del tema).
- **Color de la etiqueta de actualización**: Color de fondo de la etiqueta de fecha (vacío = color predeterminado del tema).

### 3. Configurar fecha y lectura

- **Idioma de formato**: Elija entre 18 idiomas disponibles (en-US, ja-JP, pt-BR, es-ES y otros).
- **Formato personalizado**: Use la sintaxis de Moment.js (ej. `DD/MM/YYYY`, `MMMM D, YYYY`). Cuando está vacío, usa el formato predeterminado del idioma.
- **Abreviar nombres de meses**: Opte por nombres de meses cortos (ej: "ene." en vez de "enero").
- **Mostrar tiempo de lectura**: Active o desactive el tiempo estimado mostrado junto a la fecha.
- **Velocidad de lectura**: Palabras por minuto para calcular el tiempo estimado (por defecto: `200`) (soporta idiomas asiáticos).

### 4. Campos personalizados

1. Ve a **Ajustes > Running Head**.
2. En "Campos personalizados", haz clic en **Añadir**.
3. Configura las opciones del campo:
   - **Clave YAML**: La propiedad del frontmatter a mostrar (ej. `Autor`, `Categoría`, `tags`).
   - **Etiqueta de visualización**: Texto opcional mostrado antes del valor.
   - **Mostrar etiqueta**: Active para mostrar la etiqueta en la nota.
   - **Posición**: Elija **Encima del título** o **Debajo del título**.
   - **Ocultar en carpeta**: Oculte el campo en carpetas específicas (soporta múltiples carpetas).
4. Usa el botón **Gestionar** para editar, reordenar o eliminar campos existentes.

### 5. Configurar navegación por pestañas

1. Ve a **Ajustes > Running Head**.
2. En **Navegación por pestañas**, configura el estilo visual de las pestañas (**Subrayado**, **Píldora** o **Minimalista**).
3. Haz clic en **Añadir** en **Nueva propiedad de pestaña** para registrar una clave de propiedad del frontmatter (ej. `tabs-home`).
4. En el frontmatter de tus notas, define esa propiedad como de tipo **Lista** (List) en Obsidian.
5. En la lista, puedes añadir:
   - El enlace a la nota de destino en formato wiki: `"[[Nota de Destino]]"` o `"[[Nota de Destino|Alias]]"`
   - Un nombre personalizado opcional: `"[name, Mi Nombre Personalizado]"`
   - Un icono de Lucide opcional: `"[icon, home]"` (consejo: haz clic en el selector de iconos en la configuración para copiar la etiqueta lista al portapapeles)

> [!Note]
> - El orden en el que insertas los elementos de la lista (`[name, ...]`, `[icon, ...]` y `[[Link]]`) no importa para su funcionamiento.
> - Si hay más de un enlace de nota en la lista de la propiedad, la pestaña apuntará al último enlace añadido.

### 6. Gestión de datos

- **Exportar**: Genera un JSON con toda tu configuración actual para copiar o guardar.
- **Importar**: Pega un JSON de configuración para aplicarlo rápidamente en otro baúl o dispositivo.

Y ahí lo tienes, tus metadatos ahora se muestran de forma elegante en tus notas. ✨

## Instalación

### Instalación manual
1. Descarga el último lanzamiento: `main.js`, `manifest.json` y `styles.css`.
2. Crea una carpeta llamada `running-head` dentro del directorio `.obsidian/plugins/`.
3. Pega los archivos allí.
4. Recarga Obsidian y activa el plugin en **Ajustes > Plugins de la comunidad**.

## Avisos

> [!Tip]  
> Si tienes el plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** instalado, Running Head detectará y aplicará automáticamente tus estilos de Typify a las píldoras coincidentes en el encabezado de metadatos (si así lo deseas).

> [!Tip]  
> El tema Minimal, de Kepano, fue el que más dolor de cabeza dio para ajustar y dejarlo lo mejor posible. Funciona perfectamente en él, ¿de acuerdo?

> [!Tip]  
> Usa la función de **Exportar/Importar** para compartir tus ajustes entre baúles o hacer una copia de seguridad de tu configuración antes de experimentar con nuevos cambios.

## Desarrollo

Si quieres compilar el plugin tú mismo, haz lo siguiente:

1. Clona este repositorio.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev` para iniciar la compilación en modo *watch*.

## Descargo de responsabilidad

Este plugin fue diseñado para darle una sensación más elegante y "publicada" a las notas de tu baúl de Obsidian. Y como otras veces, nació de mi deseo de personalizar mi baúl (a veces los deseos nos hacen crear cosas increíbles, así como también gastar horas y horas hasta que quede de la manera que queremos... jaja).

Agradecimiento especial a [Antigravity](https://antigravity.google/) por la inestimable asistencia en la construcción, refactorización y optimización del código fuente. Pero nada se hace por arte de magia, este plugin fue probado, vuelto a probar, volteado de adentro hacia afuera para que sea lo más optimizado, liviano, bueno, hermoso y funcional posible para todos los que buscan algo como esto.

Si encuentras algún error, por favor abre un *issue* y haré todo lo posible por solucionarlo. ¡Las contribuciones mediante *pull requests* siempre son bienvenidas! 😉
