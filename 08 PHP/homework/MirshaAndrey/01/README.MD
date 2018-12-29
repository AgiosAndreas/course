
В Dockerfile описаны команды для сборки образа на основе образа ubuntu со скриптом ex-08-01.php

Для запуска готового образа:
1. Трeбуется наличие установленного Docker

2. Выполняем команду sudo docker pull mirshaandrey/ex0801 для скачивания образа с Docker Hub

3. Запускаем контейнер sudo docker run -it mirshaandrey/ex0801

4. В контейнере выполняем  php ex-08-01.php

Получаем результат!