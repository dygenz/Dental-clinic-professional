# Dental Clinic Website

Static frontend built with plain HTML, CSS, and JavaScript (no framework, no build step).

## Folder structure

```
dental-clinic-website/
├── index.html
├── css/
│   ├── reset.css        → removes browser inconsistencies
│   ├── variables.css     → design tokens (colors, type, spacing, shadows)
│   └── base.css          → global element styles built on the tokens
├── js/
│   └── main.js            → single JS entry point
├── images/
│   ├── icons/
│   └── photos/
└── README.md
```

Each future section (Hero, Services, Contact, etc.) will get its own CSS file
in `css/` and, if it needs interactivity, its own function in `main.js`. This
keeps every file focused and easy to find six months from now.

## Running locally

There's no build tool, so no `npm install` needed yet. Open `index.html`
directly, or use the VS Code "Live Server" extension for auto-refresh while
editing.
