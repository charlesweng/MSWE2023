-- 1
INSERT INTO terms 
(terms_id, terms_description, terms_due_days) 
VALUES (6, 'Net due 120 days', 120);

-- 2
UPDATE terms SET
terms_description = 'Net due 125 days',
terms_due_days = 120
WHERE terms_id = 6;

-- 3
DELETE FROM terms WHERE terms_id = 6;

-- 4
INSERT INTO invoices (invoice_id, vendor_id, invoice_number, invoice_date, invoice_total, payment_total, credit_total, terms_id, invoice_due_date, payment_date)
VALUES (DEFAULT, 32, 'AX-014-027', '2018-08-01', 434.58, 0, 0, 2, '2018-08-31', NULL);
SELECT * FROM invoices WHERE invoice_number = 'AX-014-027';

-- 5
INSERT INTO invoice_line_items (invoice_id, invoice_sequence, account_number, line_item_amount, line_item_description)
VALUES (116, 1, 160, 180.23, 'Hard drive'),
		(116, 2, 527, 254.35, 'Exchange Server update');
SELECT * from invoice_line_items WHERE invoice_id = 116;

-- 6
UPDATE invoices
SET credit_total = 0.1 * invoice_total,
	payment_total = invoice_total - credit_total
WHERE invoice_id = 116;
SELECT * FROM invoices WHERE invoice_id = 116;

-- 7
UPDATE vendors
SET default_account_number = 403
WHERE vendor_id = 44;
SELECT * FROM vendors WHERE vendor_id = 44;

-- 8
UPDATE vendors v JOIN invoices i ON
v.vendor_id = i.vendor_id
SET i.terms_id = 2
WHERE v.default_terms_id = 2;
SELECT i.terms_id, v.default_terms_id 
FROM vendors v JOIN invoices i ON v.vendor_id = i.vendor_id
WHERE v.default_terms_id = 2;

-- 9
DELETE FROM invoice_line_items WHERE invoice_id = 116;
DELETE FROM invoices WHERE invoice_id = 116;
