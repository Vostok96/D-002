# 💎 Guía de Plantilla y Flujo Operativo: RyM Dedicatorias

Este documento sirve como **contexto técnico, plantilla y procedimiento operativo estandarizado (SOP)** para la creación de dedicatorias web asociadas a pedidos de **Joyería RyM** (`D-001`, `D-002`, `D-003`, etc.).

---

## 📌 1. Modelo de Negocio y Flujo de Experiencia

1. **Venta en Joyería:** El cliente adquiere una joya en [joyeria.rymgroup.org](https://joyeria.rymgroup.org/) y añade el servicio de **Dedicatoria Web Personalizada**.
2. **QR en el Estuche:** Dentro del estuche o en una tarjeta de lujo se imprime el **Código QR** oficial con el SKU correspondiente (`https://d-XXX.rymgroup.org/`).
3. **Experiencia de Unboxing Digital:**
   * La persona agasajada escanea el QR con su smartphone.
   * Visualiza un sobre 3D con sello de lacre dorado con las iniciales **RyM**.
   * Al tocar el sello, el sobre se abre, suena automáticamente la canción elegida, caen pétalos y partículas doradas, y se revela la carta junto con su galería de fotografías y video.

---

## 🏗️ 2. Estructura del Proyecto (`D-002`)

```text
RyM Dedicatorias (D-002)/
├── assets/
│   ├── audio/
│   │   ├── cuando-nos-volvamos-a-encontrar.mp3  # Audio de la canción elegida (.mp3)
│   │   └── cuando-nos-volvamos-a-encontrar.webm # Audio comprimido (.webm)
│   ├── images/
│   │   ├── photo-01.jpg                         # Retrato principal de Tilvi
│   │   └── ... (hasta photo-12.jpg)             # Las 12 fotografías conmemorativas
│   ├── video/
│   │   └── recuerdo-tilvi.mp4                   # Video especial al final
│   ├── favicon.svg                              # Favicon vectorial con gema y corazón dorado
│   └── qr-d002-tilvi.png                        # QR de alta resolución con corrección ECC H (30%)
├── .gitignore                                   # Ignora archivos temporales y de sistema
├── index.html                                   # Maquetación Mobile-First, Tailwind CDN y supresión HUD
├── netlify.toml                                 # Cache inmutable de assets y bloqueo de barra Netlify
├── README.md                                    # Ficha del pedido actual
├── script.js                                    # Lógica del unboxing, audio, apagado en video, lightbox y swipe
├── styles.css                                   # Variables de marca RyM, solapas 3D, video y lightbox
└── GUIA_PLANTILLA_DEDICATORIAS.md               # Este documento de referencia
```
