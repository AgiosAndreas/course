-- Сумма всех оплаченных покупок в долларах(USD);
SELECT SUM(orders.total) as total_USD_profit
FROM orders
LEFT JOIN customers ON customers.id = orders.customer_id
WHERE customers.currency = 'USD' AND orders.paid = 1
