USE ap;

-- 1
CREATE INDEX vendors_vendor_zip_code_ix
ON vendors (vendor_zip_code);

-- 2
CREATE DATABASE IF NOT EXISTS ex;
USE ex;

CREATE TABLE IF NOT EXISTS members
(
member_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR(50),
last_name VARCHAR(50),
address VARCHAR(100),
city VARCHAR(50),
state VARCHAR(50),
phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS committees
(
committee_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
committee_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS members_committees
(
committee_id INT NOT NULL,
member_id INT NOT NULL,
CONSTRAINT members_committees_pk
PRIMARY KEY (committee_id, member_id),
CONSTRAINT members_committees_fk_members
FOREIGN KEY (member_id)
REFERENCES members (member_id),
CONSTRAINT members_committees_fk_committees
FOREIGN KEY (committee_id)
REFERENCES committees (committee_id)
);

-- 3
INSERT INTO members (member_id, first_name, last_name, address, city, state, phone)
VALUES (1, 'Charles', 'Weng', '23939 Sylvan St.', 'Woodland Hills', 'California', '8183128849'),
		(2, 'David', 'Winker', '1367 Elms St.', 'Los Angeles', 'California', '9233654482');

INSERT INTO committees (committee_id, committee_name)
VALUES (1, 'Coding Bootcamp'),
		(2, 'Retirement Party');

INSERT INTO members_committees (member_id, committee_id)
VALUES (1, 2),
		(2, 1),
        (2, 2);
        
SELECT committee_name, last_name, first_name
FROM members m JOIN members_committees mc ON m.member_id = mc.member_id
	JOIN committees c ON mc.committee_id = c.committee_id
ORDER BY committee_name, last_name, first_name;

-- 4
ALTER TABLE members
ADD annual_dues DECIMAL(5, 2) NOT NULL DEFAULT 52.50;

ALTER TABLE members
ADD payment_date DATE;

-- 5
ALTER TABLE committees
MODIFY committee_name VARCHAR(100) UNIQUE;

INSERT INTO committees VALUES(DEFAULT, 'Retirement Party');

