# Baloncesto · Caracterización del Deporte

Sitio web educativo sobre baloncesto, elaborado para la asignatura **Evaluación Motriz y Detección
Deportiva** (Entrenamiento Deportivo), Fundación Universitaria del Área Andina.

Autores: Samuel López Cruz · Juan José Guarín — 2026.

## Contenido

El sitio cubre 10 secciones navegables: Inicio, Historia (mundial y Colombia), Clasificación y
categorías, Reglamento y material, Demandas físicas y fisiológicas, Perfil por posición, Desarrollo
juvenil y lesiones, Atletas referentes, Ventanas de entrenabilidad (fases sensibles) y Detección de
talento, más la sección de Referencias con la bibliografía completa en formato APA 7.

## Stack técnico

- [React](https://react.dev/) + [Vite](https://vite.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) con paleta, tipografía y espaciado personalizados
- [React Router](https://reactrouter.com/) (una ruta por sección)
- Todo el contenido está embebido en `src/data/*.ts` (sin backend ni base de datos)

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior (recomendado 22+)
- npm (se instala junto con Node.js)

Para comprobar que los tienes instalados:

```bash
node --version
npm --version
```

## Cómo correr el proyecto en local

1. Instala las dependencias (solo la primera vez, o cuando cambien):

   ```bash
   npm install
   ```

2. Levanta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre en el navegador la URL que aparece en la terminal (normalmente
   [http://localhost:5173](http://localhost:5173)). Los cambios en el código se reflejan al instante.

## Cómo generar el build de producción

```bash
npm run build
```

Esto compila TypeScript, verifica que no haya errores y genera una carpeta `dist/` con los
archivos estáticos listos para publicar. Para revisar ese build localmente antes de subirlo:

```bash
npm run preview
```

## Estructura del proyecto

```
src/
  components/   Componentes reutilizables (Navbar, Footer, tarjetas, tablas, iconos SVG propios…)
  data/         Contenido del sitio en TypeScript (historia.ts, reglamento.ts, atletas.ts…)
  pages/        Una página por sección de navegación
  App.tsx       Definición de rutas (React Router)
  main.tsx      Punto de entrada de la aplicación
```

Para editar el contenido de una sección, se modifica su archivo en `src/data/`; el texto no está
mezclado con el JSX de las páginas.

### Nota sobre `src/data/fases-sensibles.ts`

El documento fuente de "fases sensibles" trae la estructura de la tabla (capacidades agrupadas ×
edad de 1 a 40 años) pero sin los rangos de color rellenados explícitamente. Cada capacidad quedó
marcada en ese archivo con un comentario `// TODO: ajustar rango según la fuente original`: los
rangos actuales son una aproximación pedagógica editable, no un dato inventado como si fuera cifra
de investigación. Si consigues el dato exacto de la fuente original, solo hay que actualizar el
arreglo `rango: [min, max]` de la capacidad correspondiente.

## Despliegue

El proyecto ya incluye:

- `vercel.json` — reescritura de rutas para que React Router funcione en Vercel sin dar 404 al
  refrescar una página interna.
- `netlify.toml` — configuración equivalente para Netlify (`build.command`, `build.publish` y
  redirect a `index.html`).

Instrucciones completas de despliegue paso a paso (desde cero, sin cuenta previa) más abajo en este
documento / en el mensaje de entrega del proyecto.

## Licencia y uso

Proyecto educativo sin fines comerciales, elaborado con fines de evaluación académica. El contenido
está respaldado por las fuentes citadas en la sección de Referencias del sitio.
