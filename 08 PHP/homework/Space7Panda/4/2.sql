-- Самая крупная покупка пользователя Mackenzie Feil;
SELECT *
FROM orders, customers
WHERE customers.name = 'Mackenzie Feil' AND orders.paid = 1
ORDER BY total DESC
LIMIT 1;