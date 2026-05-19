<div align="center">
  <img src="./assets/images/banner_1.jpg" alt="Running Head Banner" />
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-1.0.0-lightgreen.svg)

</div>

<div align="center">

   [English](../README.md) | [Português](./README_pt.md) | Español | [Français](./README_fr.md) | [简体中文](./README_zh-CN.md)

</div>

---

¡Transforma tus notas con un hermoso encabezado de metadatos estilo blog! 📝✨

Running Head es un plugin de Obsidian que agrega automáticamente un encabezado personalizable debajo de los títulos de tus notas, mostrando la fecha de publicación, el tiempo estimado de lectura, una insignia de última actualización y cualquier propiedad personalizada de frontmatter que desees.

## Características

- **📝 Múltiples Diseños**: Elige entre un estilo Blog (todo debajo del título) o un estilo Wiki (insignias en la parte superior derecha).
- **⏱️ Tiempo de Lectura y Fechas**: Calcula y muestra automáticamente el tiempo de lectura y fechas bellamente formateadas según tu idioma.
- **🧩 Campos Personalizados**: Muestra cualquier propiedad YAML como hermosas insignias (pills), enlaces o texto directamente en el encabezado.
- **📁 Alcance de Carpetas**: Mantén limpio tu baúl ocultando campos personalizados específicos en ciertas carpetas.
- **🍞 Breadcrumb de Carpetas**: Navega fácilmente con un rastro de navegación en el que puedes hacer clic para ver exactamente dónde está tu nota.
- **🤝 Integraciones Poderosas**: Se integra perfectamente con el plugin **Bases** (inyectando iconos personalizados en los encabezados de tabla) y el plugin **Typify** (heredando hermosos estilos de insignias).
- **🌍 Internacionalización**: Totalmente traducido al inglés, portugués (Brasil), español, francés y chino simplificado.

## Cómo Usar

1. **Configurar Fechas**: En los ajustes del plugin, configura las claves YAML utilizadas para la fecha de creación (ej. `date`) y de actualización (ej. `updated`).
2. **Agregar Campos Personalizados**:
   - Ve a **Ajustes > Running Head**.
   - En "Campos personalizados", haz clic en **Añadir**.
   - Escribe la clave YAML de la propiedad que quieres mostrar (ej. `Autor` o `Categoría`).
   - Opcionalmente añade una etiqueta o restringe el campo para que no aparezca en carpetas específicas.
3. **Personalizar Apariencia**: Ajusta los tamaños de fuente, el formato de fecha, la velocidad de lectura (WPM) y elige si deseas mostrar el rastro de navegación.

¡Voilá! Tus metadatos ahora se muestran elegantemente debajo del título de la nota ✨

## Instalación

### Instalación Manual
1. Descarga el último lanzamiento: `main.js`, `manifest.json` y `styles.css`.
2. Crea una carpeta llamada `running-head` dentro del directorio `.obsidian/plugins/`.
3. Pega los archivos allí.
4. Recarga Obsidian y activa el plugin.

## Avisos

> [!Important]  
> Si usas propiedades de tipo Casilla de verificación (Checkbox), actualmente se mostrarán como texto sin procesar (`true` o `false`) en el encabezado. Recomendamos usar otros tipos de propiedades (como etiquetas o texto) para una mejor representación visual en el contexto del encabezado.

> [!Note]  
> La función de **Iconos de tabla** solo afecta al encabezado de propiedades del plugin **Bases** cuando el modo de vista está en Tabla.

> [!Tip]  
> Si tienes el plugin **Typify** instalado, Running Head detectará y aplicará automáticamente tus estilos de Typify a las insignias coincidentes en el encabezado de metadatos.

## Desarrollo

Si quieres compilar el plugin tú mismo, haz lo siguiente:

1. Clona este repositorio.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev` para iniciar la compilación en modo watch.

## Descargo de responsabilidad

Este plugin fue diseñado para darle una sensación más elegante y "publicada" a las notas de tu baúl de Obsidian.

Agradecimiento especial a [Antigravity](https://antigravity.google/) por la inestimable asistencia en la construcción, refactorización y optimización de este código.

Si encuentras algún error, abre un *issue* y haré todo lo posible por solucionarlo. ¡Las contribuciones mediante pull requests siempre son bienvenidas! 😉
