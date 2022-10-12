-- 1
SELECT vendor_id, SUM(invoice_total) AS invoice_total
FROM invoices
GROUP BY vendor_id;

-- 2
SELECT vendor_name, SUM(payment_total) AS payment_total
FROM vendors v JOIN invoices i on v.vendor_id = i.vendor_id
WHERE vendor_name IS NOT NULL and payment_total IS NOT NULL
GROUP BY vendor_name
ORDER BY payment_total DESC;

-- 3
SELECT vendor_name, COUNT(*) AS invoices, SUM(invoice_total) AS invoice_total
FROM vendors v JOIN invoices i ON v.vendor_id = i.vendor_id
GROUP BY vendor_name
ORDER BY invoices DESC;

-- 4
SELECT account_description, COUNT(*) AS items, SUM(line_item_amount) AS line_item_amount
FROM general_ledger_accounts g JOIN invoice_line_items i ON g.account_number = i.account_number
GROUP BY account_description
HAVING items > 1
ORDER BY line_item_amount DESC;

-- 5
SELECT account_description, COUNT(*) as items, SUM(line_item_amount) AS line_item_amount
FROM general_ledger_accounts g JOIN invoice_line_items l ON g.account_number = l.account_number
JOIN invoices i ON l.invoice_id = i.invoice_id
WHERE invoice_date BETWEEN '2018-04-01' AND '2018-06-30'
GROUP BY account_description
HAVING items > 1
ORDER BY line_item_amount DESC;

-- 6
SELECT 
IF(GROUPING(g.account_number) = 1, 'Grand Total', g.account_number) AS account_number, 
SUM(line_item_amount) AS line_item_amount
FROM general_ledger_accounts g JOIN invoice_line_items l ON g.account_number = l.account_number
GROUP BY g.account_number WITH ROLLUP;

-- 7
SELECT vendor_name, COUNT(DISTINCT g.account_number) AS accounts
FROM vendors v JOIN invoices i ON v.vendor_id = i.vendor_id
JOIN invoice_line_items l ON i.invoice_id = l.invoice_id
JOIN general_ledger_accounts g ON l.account_number = g.account_number
GROUP BY vendor_name
HAVING accounts > 1;

-- 8
SELECT 
IF(GROUPING(t.terms_id) = 1, 'Grand Total', t.terms_id) AS terms_id, 
IF(GROUPING(v.vendor_id) = 1, 'Balance Total', v.vendor_id) AS vendor_id, 
MAX(payment_date) AS last_payment_date,
SUM(invoice_total - payment_total - credit_total) AS balance_due
FROM terms t JOIN vendors v ON t.terms_id = v.default_terms_id
JOIN invoices i ON v.vendor_id = i.vendor_id
GROUP BY t.terms_id, v.vendor_id WITH ROLLUP;