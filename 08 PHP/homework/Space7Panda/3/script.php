<?php

class vendingMachine {

	protected $items;
	protected $vendCash;

	public function __construct($items, $vendCash) {
		$this->items = $items;
		$this->vendCash = $vendCash;
	}

	public function vend($code, $cash) {

		$index = array_search($code, array_column($this->items, "code"));

		if (is_int($index) == false) {
			echo "Такого товара нет в автомате!\n";
			return;
		}

		$name = $this->items[$index]["name"];
		$quantity = $this->items[$index]["quantity"];
		$price = $this->items[$index]["price"];

		if ($cash < $price) {
			$this->vendCash += $cash;

			echo "Недостаточно денег!\n";
			return;
		}

		if ($quantity <= 0) {
			$this->vendCash += $cash;

			echo "$name закончился!\n";
			return;
		}

		if ($cash > $price) {
			$change = $cash - $price;
			$this->vendCash += $price;
			$quantity -= 1;

			echo "Возьмите $name. Ваша сдача - $change\n";
			return;
		}

		if ($cash == $price) {
			$this->vendCash += $cash;
			$quantity -= 1;

			echo "Возьмите $name\n";
			return;
		}
	}

	public function getVendCash() {
		echo "В автомате осталось $this->vendCash едениц валюты.\n";
	}

	public function getVendItems() {

		for ($i = 0; $i < count($this->items); $i++) {
			$name = $this->items[$i]["name"];
			$quantity = $this->items[$i]["quantity"];

			echo "$name $quantity штук  \n";
		}
	}
}

$items = [
	[ "name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60 ],
	[ "name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60 ],
	[ "name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65 ],
	[ "name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25 ],
	[ "name" => "Чипсы", "code" => "A05", "quantity" => 0, "price" => 1.25 ]
];

$firstVend = new vendingMachine($items, 100);
$firstVend->vend("A01", 0);
$firstVend->vend("A05", 2);
$firstVend->vend("A07", 5);
$firstVend->vend("A03", 0.65);
$firstVend->vend("A02", 10);

$firstVend->getVendCash();
$firstVend->getVendItems();