-- Сумма всех оплаченных покупок в долларах(USD);
SELECT SUM(orders.total)
FROM orders
WHERE orders.paid = 1 AND orders.customer_id IN (
    SELECT customers.id
    FROM customers
    WHERE customers.currency = 'USD'
)
