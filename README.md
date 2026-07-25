# ERP Chévere - Cliente

Este es el cliente web para el sistema de gestión ERP Chévere, desarrollado por Hector Rivero con React, TypeScript y Vite. Permite la administración de elementos del menú y la gestión de pedidos de forma ágil y centralizada.

## Tecnologías Utilizadas

El proyecto está construido con las siguientes herramientas y librerías:

- React 19: Biblioteca para la construcción de interfaces de usuario.
- TypeScript: Superset de JavaScript que añade tipado estático y autocompletado avanzado.
- Vite 8: Herramienta de compilación rápida y servidor de desarrollo.
- Tailwind CSS 4: Framework de CSS para un diseño moderno y adaptativo.
- React Router 7: Enrutamiento declarativo para la navegación de la aplicación.
- Axios: Cliente HTTP para realizar peticiones a la API del backend.
- Lucide React: Biblioteca de iconos vectoriales modernos.
- Base UI y shadcn: Componentes de interfaz de usuario accesibles y estilizados.

## Estructura del Proyecto

El código fuente se organiza dentro del directorio src siguiendo una arquitectura modular basada en características (features):

- src/app: Configuración global de la aplicación, proveedores y el enrutador principal.
- src/components: Componentes reutilizables de UI y plantillas de diseño global (layouts).
- src/features: Módulos específicos del negocio. Cada uno contiene sus propios componentes, páginas, servicios de API y tipos.
  - auth: Páginas de inicio de sesión y lógica de autenticación.
  - menu-items: Vistas y formularios para la gestión de platos o productos del menú.
  - pedidos: Componentes y páginas para la creación, selección de productos y listado de pedidos.
- src/hooks: Hooks personalizados de React.
- src/lib: Configuraciones de librerías externas (como el cliente Axios configurado).
- src/utils: Funciones utilitarias generales.

## Requisitos Previos

Asegúrese de tener instalado Node.js (versión 18 o superior recomendada) y npm.

También es necesario que el servidor de la API esté en ejecución (por defecto en http://localhost:3000).

## Configuración del Entorno

1. Cree o verifique la existencia del archivo .env en la raíz del proyecto.
2. Defina la variable de entorno correspondiente a la dirección del servidor de la API:

```env
VITE_API_URL="http://localhost:3000"
```

## Instrucciones de Desarrollo

Siga estos pasos para instalar y ejecutar el proyecto localmente:

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Compilar la aplicación para producción:
   ```bash
   npm run build
   ```

4. Previsualizar la compilación de producción localmente:
   ```bash
   npm run preview
   ```

5. Ejecutar las reglas de análisis de código (linter):
   ```bash
   npm run lint
   ```

## Autor

- **Hector Rivero** - [Portfolio](https://porfoliov4-two.vercel.app/)
