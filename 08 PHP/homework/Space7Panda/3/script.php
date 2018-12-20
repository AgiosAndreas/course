<?php

class vendingMachine {

	protected $items;
	protected $vendCash;

	public function __construct($items, $vendCash) {
		$this->items = $items;
		$this->vendCash = $vendCash;
	}

	public function vend($code, $cash) {
		
		if (!array_key_exists($code, $this->items)) {
			$this->vendCash += $cash;

			echo 'Такого товара нет в автомате!' . "\n";
			return;
		}

		$name = $this->items[$code]['name'];
		$price = $this->items[$code]['price'];

		
		if ($cash < $price) {
			$this->vendCash += $cash;

			echo 'Недостаточно денег!' . "\n";
		
			return;
		}

		if ($this->items[$code]['quantity'] <= 0) {
			$this->vendCash += $cash;

			echo "$name закончился!\n";
			return;
		}
		
		if ($cash > $price) {
			$change = $cash - $price;
			$this->vendCash += $price;
			$this->items[$code]['quantity'] -= 1;

			echo "Возьмите $name. Ваша сдача - $change\n";
			return;
		}

		if ($this->vendCash += $cash) {
			$this->items[$code]['quantity'] -= 1;	

			echo "Возьмите $name\n";
			return;
		}
	}

	public function getVendCash() {
		echo "В автомате осталось $this->vendCash едениц валюты.\n";
	}

	public function getVendItems() {
		echo "В автомате остался следующий список товаров:\n";

		foreach ($this->items as $value) {
			echo $value['name'] . ' ' . $value['quantity'] . "\n";
		}
	}
}

$items = [
	'A01'=>[ 'name' => 'Шоколад белый', 'quantity' => 10, 'price' => 0.60 ],
	'A02'=>[ 'name' => 'Шоколад молочный', 'quantity' => 3, 'price' => 0.60 ],
	'A03'=>[ 'name' => 'Пиво светлое', 'quantity' => 1, 'price' => 0.65 ],
	'A04'=>[ 'name' => 'Вода без газа', 'quantity' => 1, 'price' => 0.25 ],
	'A05'=>[ 'name' => 'Чипсы', 'quantity' => 0, 'price' => 1.25 ]
];

$firstVend = new vendingMachine($items, 100);
$firstVend->vend('A01', 0.1);
$firstVend->vend('A05', 2);
$firstVend->vend('A07', 10);
$firstVend->vend('A03', 0.65);
$firstVend->vend('A02', 10);

$firstVend->getVendCash();
$firstVend->getVendItems();

$firstVend->vend('A02', 2);
$firstVend->vend('A02', 15);
$firstVend->vend('A02', 15);

$firstVend->getVendCash();
$firstVend->getVendItems();

