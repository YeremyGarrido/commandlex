@echo off
echo 🧹 Limpiando cache de Next.js...
if exist .next rmdir /s /q .next
echo ✅ Cache limpiada

echo.
echo 🔄 Reiniciando servidor de desarrollo...
echo.
echo ⚠️  IMPORTANTE: Despues de que inicie el servidor:
echo    1. Abre el navegador en http://localhost:3000
echo    2. Presiona Ctrl + Shift + R para forzar recarga
echo    3. Abre DevTools (F12) y ve a la pestaña Console
echo    4. Busca errores en rojo
echo.

npm run dev
