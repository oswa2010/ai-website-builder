# Restaurante Connect Mobile

App Expo para probar Restaurante Connect en iOS y Android con Expo Go.

## Probar en Android con red local

1. Instala Expo Go desde Google Play en el telefono.
2. Conecta el telefono y este computador a la misma red Wi-Fi.
3. Desde la raiz del proyecto ejecuta:

```bash
npm run mobile
```

4. Escanea el QR que muestra Expo con la app Expo Go.

Si el QR no conecta, ejecuta dentro de `mobile/`:

```bash
npm run start:tunnel
```

El modo tunnel es mas lento, pero funciona mejor cuando la red local bloquea conexiones entre dispositivos.
