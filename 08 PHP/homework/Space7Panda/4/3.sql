-- Количество покупателей без оплаченных покупок;
SELECT COUNT(customers.id)
FROM customers
where customers.id IN (
    SELECT customer_id
    FROM orders
    WHERE orders.paid = 0
    GROUP BY customer_id
)
