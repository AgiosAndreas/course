<?php

interface Dispenser {

	public function vend($code, $cash);
	public function showCash();
	public function showItems();
	
}

class LogicOperations {

	public function sortArr() {

		$sortedArr = array();

		foreach ($this->items as $key => $value) {
			$sortedArr[$value['code']] = $value; 
		}

		$this->items = $sortedArr;
	}

	public function checkExpDate($code) {
		
		if ($this->items[$code]['expiration date']) {

			$todayDate = date('d.m.Y');
			$itemDate = $this->items[$code]['expiration date'];

			if (strtotime($todayDate) > strtotime($itemDate)) {
			
				$this->items[$code]['quantity'] = 0; 
			}
		}
	}

	public function decreaseQuantity($code) {
		$this->items[$code]['quantity'] -= 1; 
	}

	public function addCash($cash) {
		$this->vendCash += $cash;
	}

}

class VendingMachine extends LogicOperations implements Dispenser {

	protected $items;
	protected $vendCash; 

	public function __construct($items) {
		$this->items = $items;
		$this->vendCash = 0;
	}

	public function vend($code, $cash) {

		$this->sortArr();
		$this->checkExpDate($code);

		$name = $this->items[$code]['name'];
		$price = $this->items[$code]['price'];

		if ($this->items[$code]['quantity'] <= 0) {

			echo "$name закончился!\n";

			return;
		}

		if ($cash < $price) {

			echo 'Недостаточно денег!' . "\n";
		
			return;
		}

		if ($cash == $price) {

			$this->addCash($cash);
			$this->decreaseQuantity($code);

			echo "Возьмите $name\n";
			return;
		}

		if ($cash > $price) {

			$this->addCash($price);
			$this->decreaseQuantity($code);

			$change = $cash - $price;

			echo "Возьмите $name. Ваша сдача - $change\n";
			return;
		}

	}
	
	public function showCash() {
		echo "В торгомате " . $this->vendCash . " валюты.\n";
	}

	public function showItems() {

		foreach ($this->items as $key=>$value) {

			echo $this->items[$key]['name'] 
				. " " 
				. $this->items[$key]['quantity']
				. "шт.\n";
		}

	}
}

$items = [
	[ "name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60 ],
	[ "name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60 ],
	[ "name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65 ],
	[ "name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25 ],
	[ "name" => "Колбаса", "code" => "A05", "quantity" => 1, "price" => 2.05, "expiration date" => "20.12.2018"],
	[ "name" => "Консервы", "code" => "A06", "quantity" => 10, "price" => 1.05, "expiration date" => "20.12.2025"]
];

$vend = new VendingMachine($items);

$vend->vend('A01', 6);
$vend->vend('A06', 6);
$vend->vend('A05', 6);
$vend->showCash();
$vend->showItems();