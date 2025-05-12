#  🛠️ Configuración del Entorno para Workshop ES6+

Este documento proporciona instrucciones detalladas para configurar tu entorno de desarrollo antes de comenzar el workshop.

##  📋 Requisitos previos

Para aprovechar al máximo este workshop, necesitarás:

- ***Node.js*** (v18.0.0 o superior)
- ***npm*** (incluido con Node.js)
- ***Git*** (para clonar el repositorio)
- ***Visual Studio Code*** (recomendado)
- ***Navegador moderno*** (Chrome, Firefox, Edge)

##  🔧 Instalación de herramientas

###  Instalación de Node.js y npm

1. Visita [Node.js official website](https://nodejs.org/)

2. Descarga la versión LTS (Long Term Support) para tu sistema operativo

3. Sigue las instrucciones de instalación

Para verificar la instalación, abre una terminal y ejecuta:

```bash
node --version  
# Debería mostrar v18.x.x o superior*

npm --version   
# Debería mostrar 8.x.x o superior*
```

### Instalación de Git

### Windows

1. Descarga Git desde git-scm.com
2. Ejecuta el instalador y sigue las instrucciones

### macOS

- Instala Git usando Homebrew:

```shell
    brew install git
```

- O descarga desde git-scm.com

### Linux

```shell
# Ubuntu/Debian*
sudo apt update
sudo apt install git

# Fedora*
sudo dnf install git
```

### Instalación de Visual Studio Code

1. Descarga VS Code desde code.visualstudio.com
2. Ejecuta el instalador y sigue las instrucciones

   ### 📁 Configuración del proyecto

### Clonación del repositorio

```bash

# Abre una terminal y navega a la ubicación donde quieres el proyecto
cd /ruta/donde/guardar/proyecto

# Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# Ingresa al directorio del proyecto
```

### Instalación de dependencias

Una vez dentro de la carpeta del proyecto, ejecuta:

```shell
npm install
```

Este comando instalará todas las dependencias necesarias definidas en el archivo package.json.

### Extensiones recomendadas para VS Code

Para maximizar tu productividad, te recomendamos instalar las siguientes extensiones:

1. **ESLint**: Para detectar errores de código
2. **Prettier**: Para formatear automáticamente tu código
3. **JavaScript (ES6) code snippets**: Snippets para ES6
4. **Jest**: Para ejecución de tests integrada

Para instalar extensiones en VS Code:

1. Abre VS Code
2. Ve a la vista de extensiones (Ctrl+Shift+X / Cmd+Shift+X)
3. Busca e instala cada extensión mencionada

## **🖥️ Configuración específica por sistema operativo**

### Windows

- Asegúrate de tener instalado Windows Terminal para una mejor experiencia
- Usa PowerShell o Git Bash en lugar de CMD

### macOS

- Recomendamos usar iTerm2 en lugar de la Terminal por defecto
- Asegúrate de tener instaladas las herramientas de línea de comandos de Xcode

### Linux

- La mayoría de distribuciones modernas funcionarán sin configuración adicional
- Asegúrate de tener instalados los paquetes de desarrollo básicos
