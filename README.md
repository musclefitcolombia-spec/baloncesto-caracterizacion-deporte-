# Baloncesto · Caracterización del Deporte

Sitio web educativo sobre baloncesto, elaborado para la asignatura **Evaluación Motriz y Detección
Deportiva** (Entrenamiento Deportivo), Fundación Universitaria del Área Andina.

Autores: Samuel López Cruz · Juan José Guarín — 2026.

## Contenido

El sitio cubre 11 secciones navegables: Inicio, Historia (mundial y Colombia), Clasificación y
categorías, Reglamento y material, Demandas físicas y fisiológicas, Perfil por posición, Desarrollo
juvenil y lesiones, Atletas referentes, Ventanas de entrenabilidad (fases sensibles), Detección de
talento y una Calculadora de clasificación morfológica (somatotipo), más la sección de Referencias
con la bibliografía completa en formato APA 7.

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

## Cómo correr las pruebas unitarias

```bash
npm run test
```

Corre con [Vitest](https://vitest.dev/) las pruebas de `src/lib/somatotipo.test.ts`: las fórmulas de
Heath-Carter (ectomorfia en sus tres tramos, endomorfia, mesomorfia), las coordenadas de la
somatocarta contra los valores de control del prompt del proyecto, y la clasificación en las 13
categorías.

## Estructura del proyecto

```
src/
  components/   Componentes reutilizables (Navbar, Footer, tarjetas, tablas, iconos SVG propios…)
  data/         Contenido del sitio en TypeScript (historia.ts, reglamento.ts, atletas.ts…)
  lib/          Lógica pura sin UI (fórmulas del somatotipo, motor de recomendaciones)
  pages/        Una página por sección de navegación
  App.tsx       Definición de rutas (React Router)
  main.tsx      Punto de entrada de la aplicación
```

Para editar el contenido de una sección, se modifica su archivo en `src/data/`; el texto no está
mezclado con el JSX de las páginas.

### Nota sobre las fotografías

Las fotografías de `src/assets/images/` son de uso libre (licencia Pexels: gratis para uso
comercial y no comercial, sin atribución obligatoria) y se eligieron por su temática —cancha,
balón, acción de juego, jóvenes jugando—, nunca como retrato de un deportista con nombre propio.
Los jugadores identificados por nombre (sección Atletas) usan a propósito una tarjeta con iniciales
en vez de una fotografía real, para no publicar fotos de prensa con derechos de autor de terceros.

### Nota sobre `src/data/fases-sensibles.ts`

El documento fuente de "fases sensibles" trae la estructura de la tabla (capacidades agrupadas ×
edad de 1 a 40 años) pero sin los rangos de color rellenados explícitamente. Cada capacidad quedó
marcada en ese archivo con un comentario `// TODO: ajustar rango según la fuente original`: los
rangos actuales son una aproximación pedagógica editable, no un dato inventado como si fuera cifra
de investigación. Si consigues el dato exacto de la fuente original, solo hay que actualizar el
arreglo `rango: [min, max]` de la capacidad correspondiente.

### Calculadora de clasificación morfológica (somatotipo)

Sección añadida en `src/pages/CalculadoraSomatotipo.tsx`, basada en Abella del Campo et al. (2016)
y el método Heath-Carter. Archivos relacionados: `src/lib/somatotipo.ts` (fórmulas y clasificación en
13 categorías), `src/lib/recomendaciones.ts` (motor de reglas, umbrales comentados),
`src/data/somatotipo-referencias.ts` (datos de la Tabla 1 del artículo, el somatotipo de élite y los
5 jugadores referentes), `src/components/Somatocarta.tsx` (gráfico SVG propio).

**Decisiones tomadas por ambigüedad en el prompt** (documentadas aquí para que puedan ajustarse):

- **Jugadores referentes actuales (§5.4):** se reutilizan, sin cambios, los mismos 5 jugadores ya
  publicados en `src/data/atletas.ts` ("Perfil físico ideal por posición": Shai Gilgeous-Alexander,
  Anthony Edwards, Jayson Tatum, Giannis Antetokounmpo, Nikola Jokić), en vez de investigar jugadores
  nuevos — para no contradecir lo que el sitio ya publica, y porque ya tienen talla/peso/envergadura
  con fuente verificada (Basketball-Reference.com, 2026).
- **Estimación de talla adulta (§7.3):** se implementó el método de la **talla media parental**
  (Tanner y Whitehouse) en vez de Khamis-Roche (1994), porque los coeficientes exactos de este
  último no se pudieron verificar contra una fuente a la vista; la fórmula usada es simple, citable y
  ampliamente documentada: niños (talla padre + talla madre + 13) / 2 cm, ±8,5 cm.
- **Orientación a otro deporte (§7.5):** se implementó el mecanismo (umbral de distancia + edad
  mínima) pero **no se incluye una lista de deportes alternativos**: no se encontró literatura
  específica y verificable que cruce estos somatotipos de baloncesto con perfiles morfológicos de
  otros deportes concretos. El componente muestra un texto explicando esta limitación en vez de
  inventar la lista.
- **Nomenclatura de las 13 categorías:** se usa la forma formal de dos palabras ("Mesomórfico
  endomorfo", "Ectomorfo balanceado", "Mesomorfo-ectomorfo"…), verificada contra tres fuentes
  independientes (ver comentario en `somatotipo.ts`), en vez de la forma compacta de una sola
  palabra que el artículo base usa de forma informal para sus propias submuestras pequeñas (p. ej.
  "mesoectomorfo"), porque esa forma compacta no resultó consistente entre las fuentes consultadas.
- **Ubicación en el menú:** se agregó entre "Detección de talento" y "Referencias".

**Hallazgo a verificar (no es un error de este proyecto):** al probar la calculadora de punta a
punta con los valores medios del Pívot de la Tabla 1 (húmero, fémur, perímetros y pliegues), la
fórmula de mesomorfia —que es lineal en sus 6 variables— da ≈3,10, mientras que el artículo reporta
2,31±0,70 para ese grupo. Se verificó dos veces la transcripción de esos valores contra el PDF
original y coinciden con la Tabla 1. El detalle completo queda documentado como comentario en
`src/data/somatotipo-referencias.ts`, junto a la hipótesis más probable (los autores promediaron la
mesomorfia de precisión completa de cada uno de los 5 pívots, no la calcularon desde las columnas
redondeadas de la tabla publicada).

**Pendiente:** no se encontró una fuente verificable que recomiende deportes alternativos por
somatotipo (ver punto anterior); la sección correspondiente queda con el mecanismo listo pero sin
datos, documentado como tal en pantalla.

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
