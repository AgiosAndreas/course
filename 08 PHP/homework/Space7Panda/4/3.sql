-- Количество покупателей без оплаченных покупок;
SELECT COUNT(DISTINCT customers.id)
    FROM customers
    LEFT JOIN orders ON customers.id = orders.customer_id 
    WHERE orders.paid = 0 OR orders.paid IS NULL
