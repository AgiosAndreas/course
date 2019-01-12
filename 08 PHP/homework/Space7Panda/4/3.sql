-- Количество покупателей без оплаченных покупок;
SELECT COUNT(*) as customers_with_debt FROM(
    SELECT customers.name, orders.paid
    FROM customers
    LEFT JOIN orders ON customers.id = orders.customer_id 
    WHERE orders.paid = 0
    GROUP BY customers.id
 ) as total;
