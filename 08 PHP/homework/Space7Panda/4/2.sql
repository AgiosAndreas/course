-- Самая крупная покупка пользователя Mackenzie Feil;
SELECT customers.name,
    orders.id as order_id,
    orders.total
  FROM customers
    LEFT JOIN orders
    ON customers.id = orders.customer_id
  WHERE customers.name = 'Mackenzie Feil'
    AND orders.paid = 1
  ORDER BY total DESC
  LIMIT 1;
