use ap;
SELECT vendor_name from vendors;
SELECT COUNT(*) AS number_of_invoices, 
	   SUM(invoice_total) AS grand_invoice_total
FROM invoices;

-- select_vendor_city_state script
SELECT vendor_name, vendor_city, vendor_state
FROM vendors
ORDER BY vendor_name;

-- select_vendor_total_due script
SELECT COUNT(*) AS number_of_invoices,
    SUM(invoice_total - payment_total - credit_total) AS total_due
FROM invoices
WHERE invoice_total - payment_total - credit_total > 0;

-- select_vendor_information script
SELECT vendor_name, vendor_city
FROM vendors
WHERE vendor_id = 34;

SELECT COUNT(*) AS number_of_invoices,
    SUM(invoice_total - payment_total - credit_total) AS total_due
FROM invoices
WHERE vendor_id = 34;