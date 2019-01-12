-- Имя и id покупателя с самой большой суммой оплаченных покупок;
SELECT customers.name, customers.id, SUM(orders.total) as total_paid
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
WHERE orders.paid = 1
GROUP BY customers.id
ORDER BY SUM(orders.total) DESC
LIMIT 1;
