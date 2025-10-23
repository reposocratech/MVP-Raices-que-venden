# 🌿 RAÍCES QUE VENDEN – ALMUYALMA

**Plataforma web para el acompañamiento y gestión de proyectos de copywriting rural.**
Une tecnología, identidad y sensibilidad para escribir con raíces y vender con alma.

---

## 🧡 Sobre Almuyalma

**Almuyalma** nace de la convicción de que la historia y la identidad de un proyecto rural son su activo más valioso.
Soy **Almudena**, y mi compromiso es traducir la pasión que pones en tu tierra y tu oficio en palabras que conecten con tu público.

> “Creo en el copywriting que tiene raíces, que honra la tradición y que está orientado a un futuro sostenible para el entorno rural.
> Trabajamos con el alma para sembrar palabras que florecen en ventas.”

---

## 🛠️ Instalaciones necesarias

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

* [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
* [Node.js](https://nodejs.org/)

---

## 🚀 Configuración inicial

Clona el repositorio y accede al proyecto:

```bash
git clone https://github.com/reposocratech/MVP-Raices-que-venden.git
cd MVP-Raices-que-venden
```

---

## 📦 Estructura del proyecto

El sistema se divide en dos partes principales:

### ⚙️ Backend (Servidor)

```bash
cd server
npm install
```

### 🎨 Frontend (Cliente)

```bash
cd client
npm install
```

---

## 🗃️ Configuración de base de datos

### 1. Crear la base de datos

1. Abre **MySQL Workbench**.
2. Carga y ejecuta el script `almuyalma.sql` incluido en el proyecto.
3. Esto creará automáticamente las tablas necesarias para el funcionamiento del sistema.

### 2. Configurar el archivo `.env`

En la carpeta `/server`, crea un archivo `.env` con tu configuración local de MySQL:

```env
DB_HOST=localhost
DB_USER=root        # Usuario de tu MySQL (por defecto suele ser "root")
DB_PASSWORD=root    # Contraseña de tu MySQL
DB_DATABASE=almuyalma
```

---

## ✉️ Configuración del servicio de emails (Nodemailer)

La plataforma envía correos automáticos para:

* Confirmación de registro
* Comunicación con clientes
* Entrega de textos finales
* Recordatorios y notificaciones

### 🔐 Usando Gmail (recomendado en desarrollo)

1. Activa la **verificación en dos pasos** en tu cuenta de Google.
2. Crea una **contraseña de aplicación** en:
   👉 [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Añade lo siguiente a tu archivo `.env` en `/server`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER=tuemail@gmail.com
EMAIL_PASS=tucontraseñaapp
```

---

## 🖥️ Ejecutar el proyecto en local

### ⚙️ Backend (Node.js + Express)

URL: [http://localhost:4015](http://localhost:4015)

```bash
cd server
npm run dev
```

### 🎨 Frontend (React + Vite)

URL: [http://localhost:5173](http://localhost:5173)

```bash
cd client
npm run dev
```

---

## ✅ Verificación del funcionamiento

### 🧩 Backend

* Abre [http://localhost:4015](http://localhost:4015) o usa **Postman** para probar endpoints.
* Si hay errores, revisa los **logs del servidor**.

### 💻 Frontend

* Accede a [http://localhost:5173](http://localhost:5173).
* Si no se conecta con el backend:

  * Asegúrate de que ambos estén ejecutándose.
  * Revisa la configuración de **CORS** en `server/app.js`.
  * Comprueba las URLs de conexión en el cliente.

---

## 🧰 Solución de problemas

### ❌ Error de conexión a MySQL

* Verifica que el servicio **MySQL** esté activo.
* Asegúrate de que las credenciales `.env` sean correctas.
* Comprueba que la base de datos `almuyalma` exista.

### ❌ El frontend no se comunica con el servidor

* Revisa la consola del navegador y los logs del backend.
* Comprueba el **proxy** o configuración de CORS.

### ❌ Fallos al enviar correos

* Verifica las credenciales SMTP (`EMAIL_USER`, `EMAIL_PASS`).
* Revisa la carpeta de **spam**.
* Asegúrate de usar una **contraseña de aplicación válida** en Gmail.

© 2025 Almuyalma · Raíces que Venden
