# 🛠️ Configuración del Entorno para Workshop ES6+

Este documento proporciona instrucciones detalladas para configurar tu entorno de desarrollo antes de comenzar el workshop de JavaScript ES6+.

## 📋 Requisitos previos

Para aprovechar al máximo este workshop, necesitarás:

- **Node.js** (v22.x LTS o superior - recomendado)
- **npm** (v10.x o superior - incluido con Node.js)
- **Git** (v2.30 o superior)
- **Visual Studio Code** (versión más reciente)
- **Navegador moderno** (Chrome 120+, Firefox 120+, Edge 120+, Safari 17+)

## 🔧 Instalación de herramientas

### 📦 Instalación de Node.js y npm

#### Opción 1: Descarga directa (Recomendada)

1. Visita [Node.js official website](https://nodejs.org/)
2. Descarga la **versión LTS actual (v22.x)** para tu sistema operativo
3. Ejecuta el instalador y sigue las instrucciones del asistente

#### Opción 2: Usando gestores de versiones (Para desarrolladores avanzados)

**Windows (usando Chocolatey):**

```powershell
# Instalar Chocolatey primero (si no lo tienes)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar Node.js LTS
choco install nodejs-lts
```

**macOS (usando Homebrew):**

```bash
# Instalar Homebrew primero (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js LTS
brew install node@22
```

**Linux (usando NodeSource):**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora/RHEL/CentOS
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install nodejs
```

#### ✅ Verificación de instalación

Abre una terminal/símbolo del sistema y ejecuta:

```bash
node --version
# Debería mostrar: v22.x.x o superior

npm --version
# Debería mostrar: v10.x.x o superior

npx --version
# Debería mostrar: v10.x.x o superior
```

### 🔗 Instalación de Git

#### Windows

1. Descarga Git desde [git-scm.com](https://git-scm.com/download/win)
2. Ejecuta el instalador `.exe`
3. **Configuraciones recomendadas durante la instalación:**
   - Use Visual Studio Code as Git's default editor
   - Use Git from the command line and also from 3rd-party software
   - Use the OpenSSL library
   - Checkout Windows-style, commit Unix-style line endings
   - Use Windows' default console window

#### macOS

```bash
# Opción 1: Homebrew (recomendada)
brew install git

# Opción 2: Xcode Command Line Tools
xcode-select --install

# Opción 3: Descarga directa desde git-scm.com
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# Fedora
sudo dnf install git

# Arch Linux
sudo pacman -S git

# openSUSE
sudo zypper install git
```

#### ✅ Verificación y configuración inicial de Git

```bash
# Verificar instalación
git --version
# Debería mostrar: git version 2.30.x o superior

# Configuración inicial (reemplaza con tus datos)
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
git config --global init.defaultBranch main

# Verificar configuración
git config --list --global
```

### 💻 Instalación de Visual Studio Code

#### Descarga e instalación

1. Visita [code.visualstudio.com](https://code.visualstudio.com/)
2. Descarga la versión para tu sistema operativo
3. Ejecuta el instalador y sigue las instrucciones

#### Configuración inicial recomendada

Abre VS Code y configura:

1. **Configuración básica (Ctrl/Cmd + ,):**

   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "javascript.updateImportsOnFileMove.enabled": "always",
     "editor.tabSize": 2,
     "editor.insertSpaces": true
   }
   ```

2. **Extensiones esenciales** (instala desde la barra lateral de extensiones):

```bash
# Comando para instalar todas las extensiones recomendadas
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension xabikos.JavaScriptSnippets
code --install-extension ms-vscode.vscode-jest
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.live-server
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

**Extensiones detalladas:**

- **Prettier**: Formateo automático de código
- **ESLint**: Detección de errores y mejores prácticas
- **JavaScript (ES6) code snippets**: Snippets útiles para ES6+
- **Jest**: Testing integrado
- **Live Server**: Servidor local para desarrollo
- **Auto Rename Tag**: Renombrado automático de etiquetas HTML
- **Path Intellisense**: Autocompletado de rutas de archivos

## 📁 Configuración del proyecto

### 🔄 Clonación del repositorio

```bash
# Abre una terminal y navega a donde quieras guardar el proyecto
cd ~/Documentos/Desarrollo  # Ajusta la ruta según tu preferencia

# Clona el repositorio (reemplaza con la URL real)
git clone https://github.com/tu-usuario/01-es6-workshop.git

# Ingresa al directorio del proyecto
cd 01-es6-workshop

# Verifica la estructura del proyecto
ls -la  # Linux/macOS
dir     # Windows
```

### 📦 Instalación de dependencias

```bash
# Instala todas las dependencias del proyecto
npm install

# Verifica que todo se instaló correctamente
npm list --depth=0

# Instala dependencias globales útiles para desarrollo
npm install -g live-server nodemon http-server
```

### 🔧 Scripts disponibles

El proyecto incluye varios scripts npm útiles:

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Linting del código
npm run lint

# Formatear código con Prettier
npm run format

# Verificar sintaxis sin corregir
npm run lint:check
```

## 🖥️ Configuración específica por sistema operativo

### 🪟 Windows

**Terminal recomendada:**

```powershell
# Instalar Windows Terminal (recomendado)
winget install Microsoft.WindowsTerminal

# O usar PowerShell 7+
winget install Microsoft.PowerShell
```

**Configuraciones adicionales:**

- Habilita WSL2 si planeas trabajar con herramientas Unix
- Usa Git Bash como terminal alternativa
- Configura PowerShell con perfil personalizado

### 🍎 macOS

**Terminal mejorada:**

```bash
# Instalar iTerm2 (opcional pero recomendado)
brew install --cask iterm2

# Instalar Oh My Zsh para mejor experiencia de terminal
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Herramientas de desarrollo:**

```bash
# Instalar Xcode Command Line Tools
xcode-select --install

# Verificar instalación
xcode-select -p
```

### 🐧 Linux

**Dependencias de desarrollo:**

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y build-essential curl wget

# Fedora
sudo dnf groupinstall "Development Tools" && sudo dnf install curl wget

# Arch Linux
sudo pacman -S base-devel curl wget
```

## 🌐 Configuración del navegador

### Chrome DevTools (Recomendado para desarrollo)

1. **Extensiones útiles:**
   - React Developer Tools
   - Vue.js devtools
   - JSON Viewer
   - Web Developer

2. **Configuración de DevTools:**
   - Habilita "Disable cache" cuando DevTools esté abierto
   - Configura "Throttling" para simular conexiones lentas
   - Activa "Paint flashing" para optimización de rendimiento

### Firefox Developer Edition

Alternativa excelente con herramientas específicas para desarrollo web.

## ✅ Verificación final del entorno

Ejecuta este script de verificación para asegurar que todo esté configurado:

```bash
# Crear archivo de verificación
cat > verificar-entorno.js << 'EOF'
#!/usr/bin/env node

console.log('🔍 Verificando entorno de desarrollo...\n');

// Verificar Node.js
const nodeVersion = process.version;
console.log(`✅ Node.js: ${nodeVersion}`);

// Verificar npm
const { execSync } = require('child_process');
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm: v${npmVersion}`);
} catch (error) {
  console.log('❌ npm no encontrado');
}

// Verificar Git
try {
  const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
  console.log(`✅ ${gitVersion}`);
} catch (error) {
  console.log('❌ Git no encontrado');
}

// Verificar características ES6+
console.log('\n🔍 Verificando soporte ES6+...');
const features = [
  { name: 'Arrow Functions', test: () => (() => true)() },
  { name: 'Template Literals', test: () => `test` === 'test' },
  { name: 'Destructuring', test: () => { const [a] = [1]; return a === 1; } },
  { name: 'Classes', test: () => class Test {} },
  { name: 'Promises', test: () => Promise.resolve(true) },
  { name: 'Async/Await', test: async () => await Promise.resolve(true) }
];

features.forEach(feature => {
  try {
    feature.test();
    console.log(`✅ ${feature.name}`);
  } catch (error) {
    console.log(`❌ ${feature.name}`);
  }
});

console.log('\n🎉 Entorno configurado correctamente!');
console.log('📚 Ya puedes comenzar el workshop ES6+');
EOF

# Ejecutar verificación
node verificar-entorno.js
```

## 🆘 Solución de problemas comunes

### Error: "node: command not found"

**Solución:** Reinstala Node.js o verifica que esté en el PATH del sistema.

### Error: "npm: command not found"

**Solución:** npm viene con Node.js. Reinstala Node.js desde el sitio oficial.

### Error de permisos en npm (Linux/macOS)

```bash
# Configurar npm para usar directorio local
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### VS Code no reconoce extensiones

**Solución:** Reinicia VS Code y verifica que las extensiones estén habilitadas.

### Git no está configurado

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## 📞 Soporte

Si encuentras problemas durante la configuración:

1. **Consulta la documentación oficial** de cada herramienta
2. **Revisa los issues** del repositorio del workshop
3. **Pregunta en el foro** del curso o comunidad
4. **Verifica versiones** - asegúrate de usar las versiones recomendadas

---

## 🚀 ¡Listo para comenzar

Una vez completada toda la configuración, estarás preparado para aprovechar al máximo el workshop de JavaScript ES6+.

**Siguiente paso:** Abre el archivo `README.md` del proyecto y sigue las instrucciones para comenzar con el primer módulo.

¡Feliz aprendizaje! 🎓
