# 🍽️ CopperBites – DSM Cátedra 3

Proyecto desarrollado para la Cátedra 3 de la materia **Desarrollo de Software para Móviles**. La app permite visualizar platos de un restaurante, ver detalles, crear nuevos con imagen incluida, y agruparlos por categoría.

---

## ✅ Paso a paso para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/frnndcndr-dsm-c3-fix.git
cd frnndcndr-dsm-c3-fix
```

### 2. Instalar dependencias

```bash
# Navegación y router
npx expo install expo-router react-native-screens react-native-safe-area-context

# Picker de imágenes
npx expo install expo-image-picker

# Async Storage
npx expo install @react-native-async-storage/async-storage

# Dotenv para variables de entorno
npm install dotenv

# Axios para llamadas a la API
npm install axios

# Mapa de google cloud
npx expo install expo-location
npm install react-native-dotenv
npm install react-native-maps-directions
npx expo install react-native-maps
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
EXPO_PUBLIC_API_URL=http://192.168.X.X:3000/api
```

📌 Reemplazar `192.168.X.X` con la IP local de tu backend (importante si usás dispositivo físico).

### 4. Ejecutar el proyecto

```bash
npx expo start
```

---

## 🧰 Tecnologías utilizadas

- **Expo + React Native**  
- **Expo Router** (navegación basada en archivos)  
- **Axios** (consumo de API REST)  
- **Cloudinary** (subida de imágenes)  
- **TypeScript**  
- **React Native Paper** (UI)  
- **AsyncStorage** (manejo de sesión)  

---

## 🧱 Estructura del proyecto

```
frnndcndr-dsm-c3-fix/
├── README.md
├── app.json
├── babel.config.ts
├── eslint.config.js
├── package.json
├── tsconfig.json
├── app/
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   ├── contact.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── explore.tsx
│   │   ├── index.tsx
│   │   ├── menu.tsx
│   │   └── menu/
│   │       └── [id].tsx
│   ├── admin/
│   │   └── create-dish.tsx
│   └── auth/
│       ├── login.tsx
│       └── signup.tsx
├── assets/
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   └── images/
│       ├── baconcheeseburger.webp
│       ├── cocacola.webp
│       └── spicyburger.webp
├── components/
│   ├── Collapsible.tsx
│   ├── ExternalLink.tsx
│   ├── HapticTab.tsx
│   ├── HelloWave.tsx
│   ├── ParallaxScrollView.tsx
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   ├── shared/
│   │   ├── AppButton.tsx
│   │   └── AppInput.tsx
│   └── ui/
│       ├── IconSymbol.ios.tsx
│       ├── IconSymbol.tsx
│       ├── TabBarBackground.ios.tsx
│       └── TabBarBackground.tsx
├── constants/
│   └── Colors.ts
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
├── scripts/
│   └── reset-project.js
└── services/
    ├── api.ts
    ├── AuthService.ts
    ├── cloudinary.ts
    └── DishService.ts
```

---

## 💡 Funcionalidades implementadas

- ✅ Navegación fluida entre pantallas con Expo Router
- ✅ Agrupación de platos por categoría (main course, dessert, etc.)
- ✅ Consumo de API backend con `axios`
- ✅ Detalle dinámico de platos vía `GET /dishes/:id`
- ✅ Creación de platos con imagen usando Cloudinary
- ✅ Subida de imágenes desde galería con `expo-image-picker`
- ✅ Diseño responsivo, limpio y adaptado a móviles
- ✅ Autenticación y almacenamiento de token en `AsyncStorage`

---

## 📝 Observaciones

> No se implementó carrito, mapa interactivo ni notificaciones, ya que el objetivo fue enfocarse en los aspectos principales solicitados por la rúbrica, garantizando fluidez, consumo de API, subida de imágenes y diseño consistente.

---

## 👨‍💻 Autor

- **Nombre:** Fernando Condori Godoy
- **Materia:** Desarrollo de Software para Móviles  
- **Año:** 2025  
- **Cátedra:** Cátedra 3