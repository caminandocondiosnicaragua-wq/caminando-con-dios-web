# Caminando con Dios

## Plataforma Oficial del Ministerio

Bienvenido al proyecto oficial de desarrollo de la plataforma **Caminando con Dios**.

Este proyecto tiene como propósito construir un ecosistema digital que permita administrar, publicar y distribuir contenido bíblico desde una única fuente de información.

---

# Visión del Proyecto

Construir una plataforma moderna, escalable y automatizada que permita publicar contenido cristiano sin duplicar trabajo.

El objetivo es escribir el contenido una sola vez en Notion y distribuirlo automáticamente hacia diferentes plataformas.

---

# Arquitectura General

```
                Notion
                   │
                   ▼
         Google Apps Script
              │        │
              │        ▼
              │   API JSON
              │        │
              ▼        ▼
      Google Sheets   Sitio Web
              │
              ├── Devocionales
              ├── Biblioteca Bíblica
              ├── Recursos
              ├── Estudios
              ├── PDF
              ├── YouTube
              └── Futuras plataformas
```

---

# Objetivos

- Centralizar todo el contenido en Notion.
- Automatizar la sincronización de información.
- Eliminar trabajo repetitivo.
- Publicar automáticamente el contenido.
- Crear una plataforma rápida y adaptable.
- Facilitar el crecimiento del ministerio.

---

# Tecnologías

- Notion
- Google Apps Script
- Google Sheets
- GitHub
- GitHub Pages
- HTML5
- CSS3
- JavaScript

---

# Flujo de trabajo

1. Crear el contenido en Notion.
2. Sincronizar mediante Google Apps Script.
3. Actualizar Google Sheets.
4. Publicar mediante la API.
5. Mostrar automáticamente el contenido en la página web.

---

# Estado del Proyecto

## Fase 1
✅ Sincronización Notion → Google Sheets

## Fase 2
🟡 Desarrollo de la API JSON

## Fase 3
⬜ Desarrollo del sitio web

## Fase 4
⬜ Biblioteca Bíblica

## Fase 5
⬜ Automatizaciones adicionales

---

# Próximas Funciones

- Devocional del día
- Buscador
- Biblioteca Bíblica
- Estudios Bíblicos
- Recursos descargables
- Multilenguaje
- Modo oscuro
- Diseño adaptable (Responsive)
- Aplicación Web (PWA)

---

# Principios del Proyecto

- Escribir una sola vez.
- Automatizar siempre que sea posible.
- Mantener una arquitectura modular.
- Documentar todos los cambios importantes.
- Priorizar la simplicidad y el rendimiento.

---

# Autor

Ministerio Caminando con Dios

Desarrollado utilizando Notion, Google Apps Script y GitHub.
