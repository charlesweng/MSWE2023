-- 1
-- SELECT DISTINCT vendor_name
-- FROM vendors JOIN invoices ON vendors.vendor_id = invoices.vendor_id
-- ORDER BY vendor_name;
SELECT DISTINCT vendor_name
FROM vendors
WHERE vendor_id IN 
(
SELECT vendor_id FROM invoices
)
ORDER BY vendor_name;

-- 2
SELECT invoice_number, invoice_total
FROM invoices
WHERE payment_total > 
(
SELECT AVG(payment_total) FROM invoices
WHERE payment_total > 0
);

-- 3
SELECT account_number, account_description
FROM general_ledger_accounts
WHERE NOT EXISTS 
(
SELECT * 
FROM invoice_line_items 
WHERE account_number = general_ledger_accounts.account_number
);

-- 4
SELECT vendor_name, i.invoice_id, invoice_sequence, line_item_amount
FROM vendors v JOIN
invoices i
ON v.vendor_id = i.vendor_id
JOIN invoice_line_items l
ON i.invoice_id = l.invoice_id
WHERE i.invoice_id IN (SELECT invoice_id FROM invoice_line_items WHERE invoice_sequence > 1)
ORDER BY vendor_name, invoice_id, invoice_sequence;

-- 5
SELECT SUM(unpaid_invoice) FROM
(
SELECT v.vendor_id, MAX(invoice_total - payment_total - credit_total) AS unpaid_invoice
FROM vendors v JOIN invoices i ON v.vendor_id = i.vendor_id
GROUP BY vendor_id
HAVING unpaid_invoice > 0
) t1;

-- 6
WITH vendor_cte AS
(
SELECT vendor_name, vendor_city, vendor_state,
COUNT(*) OVER(PARTITION BY vendor_city, vendor_state) AS vendor_count
FROM vendors
)
SELECT vendor_name, vendor_city, vendor_state
FROM vendor_cte
WHERE vendor_count = 1
ORDER BY vendor_state, vendor_city;

-- 7
SELECT vendor_name, invoice_number, invoice_date, invoice_total
FROM vendors v JOIN invoices iv ON v.vendor_id = iv.vendor_id
WHERE iv.invoice_date =
(
SELECT MIN(i.invoice_date)
FROM invoices i
WHERE i.vendor_id = iv.vendor_id
)
ORDER BY vendor_name;