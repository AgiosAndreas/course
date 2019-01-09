-- 5 самых больших покупок в евро(EUR);
SELECT *
FROM orders, customers
WHERE customers.currency = 'EUR' AND orders.paid = 1
ORDER BY total DESC
LIMIT 5;