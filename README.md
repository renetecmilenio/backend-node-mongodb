# 🛠️ Backend App - Estructura de Ramas

Este repositorio contiene tres ramas principales, cada una representando una etapa distinta en la evolución arquitectónica de la aplicación backend: desde una estructura monolítica simple hasta una implementación con microservicios utilizando Docker.

---

## 🔹 Rama `main` — Código Modular

En esta rama, el código está organizado en **módulos separados**, lo que facilita el mantenimiento y escalabilidad del proyecto.

### Scripts disponibles (`package.json`):

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js",
  "start:prod": "cross-env NODE_ENV=production node server.js",
  "test": "jest"
}
```

### Cómo iniciar el servidor:

```bash
npm run dev
```

---

## 🔸 Rama `monolito` — Estructura Monolítica

En esta rama, toda la lógica de la aplicación está contenida en un solo archivo (`server.js`), ideal para demostraciones simples o proyectos pequeños.

### Script para iniciar el servidor:

```json
"start:serv": "node --watch server.js"
```

### Cómo iniciar el servidor:

```bash
npm run start:serv
```

---

## 🐳 Rama `docker` — Microservicios con Docker

La aplicación está **dockerizada** y dividida en **microservicios**, permitiendo una arquitectura más escalable y desacoplada.

### Cómo construir e iniciar los contenedores:

```bash
docker compose up --build
```

---

## 📌 Resumen

| Rama       | Estructura             | Tecnología destacada     |
|------------|------------------------|---------------------------|
| `monolito` | Código en un solo archivo | `node`, `--watch`        |
| `main`     | Código modular          | `nodemon`, `jest`         |
| `docker`   | Microservicios          | `Docker`, `docker-compose` |

---

Si estás comenzando, puedes explorar la rama `monolito` primero y luego avanzar hacia `main` y `docker` para aprender sobre modularización y contenedores.

---

📁 *Hecho con Node.js y ❤️ para fines educativos.*
