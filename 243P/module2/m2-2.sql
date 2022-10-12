-- 1
SELECT *
FROM vendors v JOIN
	 invoices i ON
     v.vendor_id = i.vendor_id;

-- 2
SELECT v.vendor_name, i.invoice_number, i.invoice_date,
		i.invoice_total - i.payment_total - i.credit_total AS balance_due
FROM vendors v JOIN
	 invoices i ON
     v.vendor_id = i.vendor_id
WHERE i.invoice_total - i.payment_total - i.credit_total <> 0
ORDER BY v.vendor_name ASC;

-- 3
SELECT v.vendor_name, v.default_account_number AS default_account,
				g.account_description AS "description"
FROM vendors v JOIN
	 general_ledger_accounts g ON
     v.default_account_number = g.account_number
ORDER BY g.account_description, v.vendor_name;

-- 4
SELECT v.vendor_name, i.invoice_date, i.invoice_number,
	l.invoice_sequence AS li_sequence, l.line_item_amount AS li_amount
FROM vendors v JOIN
	invoices i ON
    v.vendor_id = i.vendor_id JOIN
    invoice_line_items l ON
    l.invoice_id = i.invoice_id
ORDER BY v.vendor_name, i.invoice_date, i.invoice_number, l.invoice_sequence;

-- 5
SELECT v1.vendor_id, v1.vendor_name,
	CONCAT(v1.vendor_contact_first_name, ' ', v1.vendor_contact_last_name) AS contact_name
FROM vendors v1 JOIN
	vendors v2 ON
    v1.vendor_id <> v2.vendor_id AND
    v1.vendor_contact_last_name = v2.vendor_contact_last_name
ORDER BY v1.vendor_contact_last_name;

-- 6
SELECT g.account_number, g.account_description
FROM general_ledger_accounts g LEFT JOIN
	invoice_line_items i ON
    i.account_number = g.account_number
WHERE i.invoice_id IS NULL
ORDER BY g.account_number;

-- 7
SELECT vendor_name, 'CA' AS vendor_state
FROM vendors
WHERE vendor_state = 'CA'
UNION
SELECT vendor_name, 'Outside CA' AS vendor_state
FROM vendors
WHERE vendor_state <> 'CA'
ORDER BY vendor_name;