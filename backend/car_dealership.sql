BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Billing" (
	"billing_id"	INTEGER,
	"date"	INTEGER,
	"payment_method"	TEXT,
	"email"	TEXT,
	"emp_id"	INTEGER,
	"service_id"	INTEGER,
	"sale_id"	INTEGER,
	PRIMARY KEY("billing_id"),
	FOREIGN KEY("emp_id") REFERENCES "Employee"("emp_id"),
	FOREIGN KEY("sale_id") REFERENCES "Sale"("sale_id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("service_id")
);
CREATE TABLE IF NOT EXISTS "Customer" (
	"cust_id"	INTEGER,
	"f_name"	TEXT,
	"l_name"	TEXT,
	"phone_num"	INTEGER,
	"email"	TEXT,
	"address"	TEXT,
	"customer_role"	TEXT,
	"service_id"	INTEGER,
	"sale_id"	INTEGER,
	PRIMARY KEY("cust_id"),
	FOREIGN KEY("sale_id") REFERENCES "Sale"("sale_id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("service_id")
);
CREATE TABLE IF NOT EXISTS "Employee" (
	"emp_id"	INTEGER,
	"f_name"	TEXT,
	"l_name"	TEXT,
	"phone_num"	INTEGER,
	"email"	TEXT,
	"address"	TEXT,
	"employee_role"	INTEGER,
	"inventory_id"	INTEGER,
	"billing_id"	INTEGER,
	"service_id"	INTEGER,
	"sale_id"	INTEGER,
	PRIMARY KEY("emp_id"),
	FOREIGN KEY("billing_id") REFERENCES "Billing"("billing_id"),
	FOREIGN KEY("inventory_id") REFERENCES "Inventory"("inventory_id"),
	FOREIGN KEY("sale_id") REFERENCES "Sale"("sale_id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("service_id")
);
CREATE TABLE IF NOT EXISTS "Inventory" (
	"inventory_id"	INTEGER,
	"item_status"	TEXT,
	"emp_id"	INTEGER,
	"vehicle_id"	INTEGER,
	PRIMARY KEY("inventory_id"),
	FOREIGN KEY("emp_id") REFERENCES "Employee"("emp_id"),
	FOREIGN KEY("vehicle_id") REFERENCES "Vehicle"("vehicle_id")
);
CREATE TABLE IF NOT EXISTS "Sale" (
	"sale_id"	INTEGER,
	"date_sold"	INTEGER,
	"temp_tag_num"	INTEGER,
	"cust_id"	INTEGER,
	"emp_id"	INTEGER,
	"billing_id"	INTEGER,
	"vehicle_id"	INTEGER,
	PRIMARY KEY("sale_id"),
	FOREIGN KEY("billing_id") REFERENCES "Billing"("billing_id"),
	FOREIGN KEY("cust_id") REFERENCES "Customer"("cust_id"),
	FOREIGN KEY("emp_id") REFERENCES "Employee"("emp_id"),
	FOREIGN KEY("vehicle_id") REFERENCES "Vehicle"("vehicle_id")
);
CREATE TABLE IF NOT EXISTS "Service" (
	"service_id"	INTEGER,
	"mileage_arrival"	INTEGER,
	"mileage_depart"	INTEGER,
	"final_estimate"	INTEGER,
	"emp_id"	INTEGER,
	"cust_id"	INTEGER,
	"vehicle_id"	INTEGER,
	"billing_id"	INTEGER,
	PRIMARY KEY("service_id"),
	FOREIGN KEY("billing_id") REFERENCES "Billing"("billing_id"),
	FOREIGN KEY("cust_id") REFERENCES "Customer"("cust_id"),
	FOREIGN KEY("emp_id") REFERENCES "Employee"("emp_id"),
	FOREIGN KEY("vehicle_id") REFERENCES "Vehicle"("vehicle_id")
);
CREATE TABLE IF NOT EXISTS "Vehicle" (
	"vehicle_id"	INTEGER,
	"model"	TEXT,
	"year"	INTEGER,
	"make"	TEXT,
	"VIN"	INTEGER,
	"vehicle_status"	TEXT,
	"inventory_id"	INTEGER,
	"sale_id"	INTEGER,
	"service_id"	INTEGER,
	PRIMARY KEY("vehicle_id"),
	FOREIGN KEY("inventory_id") REFERENCES "Inventory"("inventory_id"),
	FOREIGN KEY("sale_id") REFERENCES "Sale"("sale_id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("service_id")
);
INSERT INTO "Billing" VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "Customer" VALUES (1,'John','Smith','765-245-0853','john.smith@gmail.com','256 Oak Street','purchase',NULL,NULL);
INSERT INTO "Customer" VALUES (2,'Jane','Doe','765-983-2743','jane.doe@gmail.com','902 Green Lane','service',NULL,NULL);
INSERT INTO "Employee" VALUES (1,'Oliver','Keller','356-9275-445','oliverkeller@gmail.com','245 Poplar Avenue','mechanic',NULL,NULL,NULL,NULL);
INSERT INTO "Employee" VALUES (2,'Jessie','Henderson','954-124-7721','jessiehessie@hotmail.com','444 Normal Lane','billing',NULL,NULL,NULL,NULL);
COMMIT;
