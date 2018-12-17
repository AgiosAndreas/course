# Торговый автомат

![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TokyoCigaretteVendingMachine.jpg/217px-TokyoCigaretteVendingMachine.jpg?download)

Торго́вый автома́т (сокр. Торгомат) — устройство, осуществляющее мелкорозничную торговлю товарами и услугами, оплата и выдача которых осуществляется с помощью технических приспособлений, не требующих непосредственного участия продавца.

Тебе надо реализовать класс `VendingMachine`, который будет управлять торговым автоматом. В момент включения автомата, опертор указывает какие товары есть в автомате и сколько денег для сдачи.

Пример списка товаров:

```php
$items = [
    [ "name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60 ],
    [ "name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60 ],
    [ "name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65 ],
    [ "name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25 ]
];
```
 У этого класса должен быть метод, которы `vend`.  On creation of a new instance of VendingMachine the items Array and Initial vending machine money is passed. The vend method should take two arguments 1. Selection code of the item (not case sensitive) and 2. Amount of money the user inserts into the machine.

Правила работа автомата:
- если в атомат опустили недостаточно денег, то автомат должен выводить  "Недостаточно денег!"
- если в автомате больше не осталось такого товара, то выводится "<Название Позиции> закончился!".
- если указан неверный код, то выводится "Такого товара нет в автомате!"
- если указан неверный код, то выводится "Такого товара нет в автомате!"
- If an item is correctly selected return "Vending Item Name with 9.40 change.". Where "Item Name" is the name of the item and change if any given.

4. If an item is correctly selected and there is no change needed then return "Vending Item Name". Where "Item Name" is the name of the item.

- If an invalid item is selected return "Invalid selection! : Money in vending machine = 11.20". Where 11.20 is the machines money float.

6. If a selection is successful then the quantity should be updated.

7. The vending machine never runs out of money for simplicity however you will need to keep track of the amount of money in the machine at anytime

8. Change is always given to 2 decimal places ie 7.00

Примеры:

```php

```
