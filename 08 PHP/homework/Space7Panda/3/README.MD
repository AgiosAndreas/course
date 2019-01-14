1. Установить composer https://getcomposer.org/
2. Установить зависимости командой '$ composer install'
3. Оптимизировать автозагрузчик командой '$ composer dump-autoload -o'
4. Запустить тесты из корня командой '$ ./vendor/bin/phpunit --bootstrap vendor/autoload.php --testdox app/test'