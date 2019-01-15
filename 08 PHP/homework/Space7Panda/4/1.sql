-- 5 самых больших покупок в евро(EUR);
SELECT orders.id, orders.total as total_in_EUR
  FROM customers
    LEFT JOIN orders
    ON customers.id = orders.customer_id
  WHERE orders.paid = 1
    AND customers.currency = 'EUR'
  ORDER BY orders.total DESC
  LIMIT 5;
