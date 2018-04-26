# Запуск без Docker

```bash
npm i

npm run echo

PORT=3000 npm run echo
```

# Собрать Docker
```bash
sudo docker build -t dev:echo-server .
```

# Запуск сервера в Docker
```bash
cd app/

sudo docker run -v $(pwd):/usr/src/app/ -w /usr/src/app/ -p 8080:8080 dev:echo-server npm i && npm run echo
```
