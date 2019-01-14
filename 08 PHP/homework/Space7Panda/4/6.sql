-- Имя и id покупателя с самой большой суммой оплаченных покупок;
SELECT * FROM(
    SELECT 
        customers.name,
        customers.id,
        SUM(
            CASE
            WHEN customers.currency = 'EUR' THEN orders.total * 0.87
            ELSE orders.total
            END
        ) as total_paid_USD
    FROM customers
    LEFT JOIN orders ON customers.id = orders.customer_id
    WHERE orders.paid = 1
    GROUP BY customers.id
) as new
ORDER BY new.total_paid_USD DESC
LIMIT 1;