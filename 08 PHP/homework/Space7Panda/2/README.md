##Запуск тестов скрипта
1. Скачать docker https://www.docker.com/products/docker-desktop
2. Запустить скрипт командой '$ docker run -it --rm --name mgg_test -v "$PWD":/usr/src/app -w /usr/src/app phpunit/phpunit test'