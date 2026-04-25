# Book AI Analyst - Frontend Web App

El frontend de Book AI Analyst es una aplicación web interactiva de una sola página (SPA) construida con React, TypeScript y Vite. Proporciona una interfaz moderna con un diseño híbrido: permite a los usuarios buscar y leer libros clásicos directamente desde Open Library, e incluye una "Zona de Análisis" interactiva donde los usuarios pueden seleccionar texto para obtener significados profundos e implicaciones literarias impulsadas por Inteligencia Artificial.

## Getting Started

Estas instrucciones te proporcionarán una copia del proyecto frontend funcionando en tu máquina local para propósitos de desarrollo y pruebas. Consulta la sección de despliegue para obtener notas sobre cómo implementar el proyecto en un sistema en vivo.

### Prerequisites

¿Qué cosas necesitas para instalar el software y cómo instalarlas?

- **Node.js** (v18 o superior): Entorno de ejecución para JavaScript. Descargar Node.js
- **npm** (usualmente incluido con Node.js) o **Yarn**: Gestor de paquetes para instalar dependencias.
- El Backend de Spring Boot en ejecución (opcional pero recomendado para la experiencia completa).

### Installing

Una serie de ejemplos paso a paso que te indican cómo obtener un entorno de desarrollo en ejecución.

1. **Clonar el repositorio y navegar al directorio del frontend:**
   Abre tu terminal y ubícate en la carpeta correspondiente.
   ```bash
   cd book-ai-app/frontend
   ```

2. **Instalar las dependencias del proyecto:**
   Descarga e instala todos los paquetes necesarios definidos en `package.json`.
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz de la carpeta frontend (puedes copiar el `.env.example` si existe) y define la URL de tu backend:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. **Ejecutar el servidor de desarrollo:**
   Inicia Vite con Hot Module Replacement (HMR) para un desarrollo ultra rápido.
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000` (o en el puerto que te indique la consola).

### Ejemplo de uso (Demo):

- Entra a la URL local en tu navegador.
- En la barra de búsqueda escribe "Volar sobre el pantano" o "Moby Dick" y presiona Buscar.
- Haz clic en "Leer y Analizar".
- En la zona derecha, escribe una frase, selecciona con el ratón una palabra desconocida y presiona el botón flotante "✨ Preguntar a la IA".

## Running the tests

Explica cómo ejecutar las pruebas automatizadas para este sistema. Nota: Este proyecto base está preparado para integrarse con Vitest y React Testing Library.

```bash
npm run test
```

### Break down into end-to-end tests

Estas pruebas verifican que los flujos principales del usuario de la interfaz funcionen correctamente desde el renderizado hasta la interacción.

Por ejemplo, probar que el botón contextual de la IA aparece únicamente cuando el usuario sombrea un texto en el área de análisis:

```typescript
// Ejemplo conceptual de prueba con React Testing Library
test('muestra el botón de IA al seleccionar texto en el textarea', async () => {
  render(<ReaderView />);
  const textarea = screen.getByPlaceholderText(/Escribe o pega aquí/i);
  
  // Simular escritura y selección
  await userEvent.type(textarea, 'Un abismo insondable');
  textarea.setSelectionRange(10, 20); // Selecciona 'insondable'
  fireEvent.mouseUp(textarea);

  expect(screen.getByText('✨ Preguntar a la IA')).toBeInDocument();
});
```

### And coding style tests

Para mantener la consistencia del código, puedes ejecutar el linter incluido (ESLint):

```bash
npm run lint
```

## Deployment

Agrega notas adicionales sobre cómo implementar esto en un sistema en vivo.

**Despliegue en Azure Static Web Apps:**

1. Sube tu código a un repositorio en GitHub.
2. En el portal de Azure, crea un nuevo recurso Static Web App.
3. Conecta tu cuenta de GitHub y selecciona el repositorio y la rama de producción.
4. En los Build Details (Detalles de compilación), selecciona React o configura lo siguiente:
   - App location: `/frontend`
   - Api location: (dejar en blanco)
   - Output location: `dist`
5. Una vez desplegado, ve a la sección de configuración de la Static Web App en Azure y añade la variable de entorno `VITE_API_URL` apuntando a la URL pública de tu backend de Spring Boot.

*(Alternativamente, puedes compilar manualmente con `npm run build` y subir la carpeta `dist/` generada a cualquier hosting estático como Vercel o Netlify).*

## Built With

- **React 18** - Biblioteca principal para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Entorno de desarrollo y empaquetador ultrarrápido
- **Tailwind CSS** - Framework CSS basado en utilidades para el diseño responsive
- **Lucide React** - Colección de iconos modernos (ej. lupa, libro)

## Contributing

Por favor, lee `CONTRIBUTING.md` para obtener detalles sobre nuestro código de conducta y el proceso para enviarnos solicitudes de extracción (pull requests).

## Versioning

Usamos SemVer para el versionado. Para las versiones disponibles, mira las etiquetas en este repositorio.

## Authors

- **Arquitecto / Tech Lead** - *Trabajo inicial* - Book AI Analyst

Mira también la lista de contribuyentes que participaron en este proyecto.

## License

Este proyecto está licenciado bajo la Licencia MIT - mira el archivo `LICENSE.md` para detalles.

## Acknowledgments

- A Internet Archive por su BookReader embebible, que permite ojear millones de libros clásicos de manera gratuita.
- Al patrón arquitectónico BFF (Backend For Frontend) que nos permitió delegar el manejo de la IA a Java.
- Inspiración tomada de las herramientas de lectura modernas asistidas por inteligencia artificial.