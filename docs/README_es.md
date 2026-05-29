<div align="center">
  <img src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/banner_1.jpg" alt="Running Head Banner" />
  
  <br>

  ![License](https://img.shields.io/badge/license-MIT-lightblue.svg)
  ![Version](https://img.shields.io/badge/version-2.0.1-lightgreen.svg)

</div>

<div align="center">

[English](../README.md) | [Português](./README_pt.md) | Español | [Français](./README_fr.md) | [简体中文](./README_zh-CN.md)

</div>

---

**Running Head** es un plugin increíble de Obsidian que agrega un encabezado de metadados altamente personalizable. Sigue fechas, propiedades de frontmatter personalizadas, rutas de carpetas y navegación por pestañas de forma integrada y sin complicaciones.


## 🌟 Recursos en Acción

### 1. 📅 Fechas de Creación & Última Actualización
Sigue el historial de tus notas de forma dinámica. Formatea las fechas usando 18 idiomas predeterminados o tus propios patrones de [Moment.js](https://momentjs.com/). Una etiqueta inteligente de modificación se muestra automáticamente cuando se edita una nota después de su creación.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/creation_dates.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/last_update_dates.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 2. 📐 Estilos de Diseño
Elige entre los diseños **Estilo Blog** (ruta de carpeta sobre el título, metadados abajo) o **Estilo Wiki** (encabezado de metadados sobre el título, ruta abajo) para adaptarlos a la estética de tus notas.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/layout_styles.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 3. 🍞 Ruta de la Nota (Breadcrumbs)
Navega fácilmente con una ruta de carpetas interactiva que muestra exactamente dónde está tu nota, con resaltado opcional de la carpeta activa actual.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/breadcrumbs.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 4. 🏷️ Campos Personalizados de YAML & Alcance de Carpetas
Renderiza cualquier propiedad de frontmatter (texto, listas, casillas de verificación) como campos personalizados o hermosas píldoras en tu encabezado. Oculte campos específicos en directorios determinados usando alcances de carpetas flexibles para mantener limpio tu espacio de trabajo.

> [!NOTE]
> La demostración agregando un campo de texto sirve como ilustración; estas opciones se aplican a cualquier propiedad de metadado personalizado.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/custom_fields.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/folder_scopes.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


### 5. 🗂️ Interactive Tabs Navigation
Crea elegantes encabezados de navegación para saltar entre notas relacionadas usando propiedades de frontmatter. Personaliza el estilo visual de las pestañas (**Subrayado**, **Píldora** o **Minimalista**) y añade iconos de Lucide o nombres personalizados fácilmente.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/tabs_navigation.mp4" autoplay loop muted playsinline controls style="max-width: 100%;"></video>
</div>


### 6. 📊 Progreso de Lectura & Integración con Typify
Agrega una barra discreta y altamente personalizable en la parte superior de la nota para rastrear tu posición de lectura en tiempo real. Running Head también se integra perfectamente con el plugin **[Typify](https://github.com/Leike-Dev/Obsidian-Typify)** para herdar colores y estilos de píldoras automáticamente.

<div align="center">
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/scroll_progress.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
  <video src="https://github.com/Leike-Dev/obsidian-running-head/raw/main/docs/assets/images/typify_integration.mp4" autoplay loop muted playsinline controls style="max-width: 48%;"></video>
</div>


## ⚙️ Características Adicionales

* **🎨 Colores Personalizados**: Define los colores de la etiqueta de actualización, la ruta de la nota o la barra de progreso de forma simple e individual.
* **💾 Gestión de Datos**: Exporta las configuraciones completas como JSON e impórtalas en otro baúl o dispositivo fácilmente.
* **🌍 Internacionalización**: Interfaz completamente traducida al inglés, portugués (Brasil), español, francés y chino simplificado (basta usar Obsidian en uno de estos idiomas). Si hay errores de traducción o mejoras, por favor házmelo saber.


## 🚀 Quick Start

1. **Active el Plugin**: Ve a Ajustes del Obsidian $\rightarrow$ Plugins de la comunidad, busca **Running Head** y actívalo.
2. **Configure Frontmatter**: Configura tus claves YAML para creación (por defecto `date`) y actualización (por defecto `updated`):
   ```yaml
   date: 2026-05-29
   updated: 2026-05-29
   ```
3. **Configure Campos Personalizados**: Ve a ajustes del plugin $\rightarrow$ **Campos Personalizados** y haz clic en **Añadir** para mapear cualquier clave YAML (ej. `Autor`, `tags`) al encabezado.
4. **Cree Pestañas**: En **Navegación por Pestañas**, registra una propiedad YAML de tipo lista (ej. `tabs-home`) y define los enlaces de las notas relacionadas.

### 📝 Ejemplo de Estructura YAML para Pestañas
```yaml
tabs-home:
  - "[[Nota Principal]]"
  - "[icon, home]"
  - "[name, Panel]"
```

> [!Note]
> - El orden en el que insertas los elementos de la lista (`[name, ...]`, `[icon, ...]` y `[[Link]]`) no importa para su funcionamiento.
> - Si hay más de un enlace de nota en la lista de la propiedad, la pestaña apuntará al último enlace añadido.


## 📦 Instalación

### Instalación manual
1. Descarga el último lanzamiento: `main.js`, `manifest.json` y `styles.css`.
2. Crea una carpeta llamada `running-head` dentro del directorio `<Seu-Vault>/.obsidian/plugins/`.
3. Pega los archivos allí.
4. Recarga Obsidian y activa el plugin en **Ajustes > Plugins de la comunidad**.


## 🛠️ Desarrollo

Si quieres compilar el plugin tú mismo, haz lo siguiente:
1. Clona este repositorio.
2. Instala las dependencias: `npm install`
3. Ejecuta `npm run dev` para iniciar la compilación en modo *watch*.


## ⚠️ Descargo de responsabilidad

Este plugin fue diseñado para darle una sensación más elegante y "publicada" a las notas de tu baúl de Obsidian. And como otras veces, nació de mi deseo de personalizar mi baúl (a veces los deseos nos hacen crear cosas increíbles, así como también gastar horas y horas hasta que quede de la manera que queremos... jaja).

Agradecimiento especial a [Antigravity](https://antigravity.google/) por la inestimable asistencia en la construcción, refactorización y optimización del código fuente. Pero nada se hace por arte de magia, este plugin fue probado, vuelto a probar, volteado de adentro hacia afuera para que sea lo más optimizado, liviano, bueno, hermoso y funcional posible para todos los que buscan algo como esto.

Si encuentras algún error, por favor abre un *issue* y haré todo lo posible por solucionarlo. ¡Las contribuciones mediante *pull requests* siempre son bienvenidas! 😉
