## Запуск без Docker
1. Установить пакет node.js с официального сайта: https://nodejs.org/en/
2. Установить зависимости командой: npm install
3. Запустить скрипт с помощью консольной команды: npm run echo-server
## Запуск через Docker
1. Для сборки выполнить следующую команду из каталога  "docker build -t ssv:echo-server ."
2. Для запуска сервера в Docker выполнить "docker run -p 8080:8080 mgg:echo-server npm run echo-server"