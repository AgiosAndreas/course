-- Количество покупателей без оплаченных покупок;
SELECT COUNT(customers.id)
FROM customers
WHERE customers.id IN (
    SELECT customer_id
    FROM orders
    WHERE orders.paid = 0
    GROUP BY customer_id
)
