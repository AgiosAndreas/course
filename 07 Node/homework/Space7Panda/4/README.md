## Запуск без Docker
1. Установить пакет node.js с официального сайта: https://nodejs.org/en/
2. Установить зависимости командой: npm install
3. Запустить скрипт с помощью консольной команды: npm run echo-server
## Запуск через Docker с созданием образа
1. Для сборки выполнить следующую команду из каталога  "docker build -t mgg:echo-server ."
2. Для запуска сервера в Docker выполнить "docker run -p 8080:8080 mgg:echo-server npm run echo-server"
## Запуск через Docker без создания образа
1. Выполнить команду "docker run -it --rm --name mgg_echo -v "$PWD":/usr/src/app -w /usr/src/app -p 8080:8080 node:alpine sh -c "npm install && npm run echo-server""
## Запуск с помощью DockerHub
1. Выполнить команду "docker run -p 8080:8080 space7panda/echo-server:echo npm run echo-server"