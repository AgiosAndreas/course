-- Сумма оплаченных покупок по каждой стране. Если валюта отличается от USD, то надо сконвертировать сумму в USD;
SELECT 
    customers.country,
    SUM(
        IF(customers.currency = 'USD', result.total_sum, result.total_sum * 0.87)
    ) as total_sum_in_USD
FROM customers
    JOIN (
        SELECT orders.customer_id, sum(orders.total) as total_sum
        FROM orders
        WHERE orders.paid = 1
        GROUP BY orders.customer_id
    ) as result ON customers.id = result.customer_id
GROUP BY customers.country