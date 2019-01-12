-- Самая крупная покупка пользователя Mackenzie Feil;
SELECT *
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
WHERE customers.name = 'Mackenzie Feil' AND orders.paid = 1
ORDER BY total DESC
LIMIT 1;
