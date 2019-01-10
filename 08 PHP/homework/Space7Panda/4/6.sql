-- Имя и id покупателя с самой большой суммой оплаченных покупок;
SELECT customers.name, customers.id
FROM customers
WHERE customers.id = (
    SELECT customer_id 
    FROM orders 
    WHERE orders.paid = 1
    GROUP BY customer_id
    ORDER BY SUM(total) DESC
    LIMIT 1
)
