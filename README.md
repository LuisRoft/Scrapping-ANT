# Proyecto de Scrapping de Citaciones de la ANT

Este proyecto utiliza Playwright para realizar scrapping de la web de la ANT y obtener información sobre las citaciones de los usuarios. Además, integra AI SDK (modelo Gemini) para generar respuestas automáticas basadas en los datos extraídos y usa Mailjet y Telegram para enviar notificaciones.

## Tecnologías

- **Playwright:** Automatización de navegación y extracción de datos.
- **Vercel AI SDK:** Uso del modelo Gemini (clave secreta obtenida desde Google AI Studio).
- **Mailjet:** Envío de correos electrónicos.
- **Telegram Bot:** Envío de mensajes.
- **pnpm:** Gestor de paquetes utilizado en este proyecto.

## Requisitos

- Node.js v22.14.0 o superior (requisito para usar TypeScript).
- pnpm instalado globalmente.
- Cuenta de Mailjet para obtener MJ_PUBLIC_KEY y MJ_PRIVATE_KEY.
- Bot de Telegram para la clave TELEGRAM_KEY.
- Crear un Channel en Telegram y agregar tu bot al channel
- Clave Privada para Gemini (Se obtiene en Google AI Studio).

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <repositorio-url>
   cd <nombre-del-directorio>
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```properties
   MJ_PUBLIC_KEY='<tu-public-key>'
   MJ_PRIVATE_KEY='<tu-private-key>'
   TELEGRAM_KEY='<tu-telegram-bot-key>'
   TL_NAME_CHANNEL='<tu-telegram-canal-nombre>'
   GOOGLE_GENERATIVE_AI_API_KEY='<tu-google-api-key-obtenida-en-google-ai-studio>'
   USER_CI='<cedula-del-usuario>'
   EMAIL_TO='<correo-destino>'
   EMAIL_NAME='<nombre-usuario>'
   ```

## Uso

Ejecuta el script para realizar el scrapping y generar una respuesta:

```bash
pnpm start
```

El script:

- Rellena el campo de cédula en la web de la ANT.
- Verifica si el usuario tiene citaciones.
- Utiliza el modelo Gemini para generar una respuesta con los detalles de la citación o un mensaje alternativo.
- Envía el resultado por Telegram o correo electrónico (según se descomenten las líneas correspondientes en el código).

## Funcionalidad

- **Scrapping:** Extrae la información sobre citaciones de la ANT.
- **Generación de Respuestas:** Usa el modelo Gemini para crear una respuesta amigable e informativa.
- **Notificación:** Permite enviar notificaciones por correo (Mailjet) o por Telegram. Descomenta las líneas correspondientes en `index.ts` para habilitar la opción deseada.

## Contribuciones

Si deseas contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama: `git checkout -b feature/nueva-caracteristica`.
3. Realiza tus cambios y haz commit: `git commit -am 'Añadir nueva característica'`.
4. Haz push a tu rama: `git push origin feature/nueva-caracteristica`.
5. Abre un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
