-- Сумма оплаченных покупок по каждой стране. Если валюта отличается от USD, то надо сконвертировать сумму в USD;
SELECT customers.country,
    SUM(
        CASE
          WHEN customers.currency = 'EUR' THEN orders.total * 0.87
          ELSE orders.total
        END
    ) as total_sum_USD
  FROM customers
    LEFT JOIN orders
    ON customers.id = orders.customer_id
  WHERE orders.paid = 1
  GROUP BY customers.country
  ORDER BY customers.country;
