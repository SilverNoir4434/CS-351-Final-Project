BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Billing" (
	"billing_id"	INTEGER,
	"date"	INTEGER,
	"payment_method"	TEXT,
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
	"VIN"	TEXT,
	"vehicle_status"	TEXT,
	"inventory_id"	INTEGER,
	"sale_id"	INTEGER,
	"service_id"	INTEGER,
	PRIMARY KEY("vehicle_id"),
	FOREIGN KEY("inventory_id") REFERENCES "Inventory"("inventory_id"),
	FOREIGN KEY("sale_id") REFERENCES "Sale"("sale_id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("service_id")
);
INSERT INTO "Billing" VALUES (1,'09/24/2025','cash',NULL,NULL,NULL);
INSERT INTO "Customer" VALUES (1,'John','Smith','765-245-0853','john.smith@gmail.com','256 Oak Street','purchase',NULL,NULL);
INSERT INTO "Customer" VALUES (2,'Jane','Doe','765-983-2743','jane.doe@gmail.com','902 Green Lane','service',1,NULL);
INSERT INTO "Employee" VALUES (1,'Oliver','Keller','356-9275-445','oliverkeller@gmail.com','245 Poplar Avenue','mechanic',NULL,NULL,1,NULL);
INSERT INTO "Employee" VALUES (2,'Jessie','Henderson','954-124-7721','jessiehessie@hotmail.com','444 Normal Lane','billing',NULL,NULL,NULL,NULL);
INSERT INTO "Employee" VALUES (3,'Whittney','Silvertongue','666-999-1234','moneyzilla@dollar.eth','002 Manor Road','salesperson',NULL,NULL,NULL,NULL);
INSERT INTO "Employee" VALUES (4,'Theodore','Akers','087-274-8412','akerbaker@yahoo.com','992 Hill Heights Boulevard','billing',NULL,NULL,NULL,NULL);
INSERT INTO "Inventory" VALUES (1,'main_lot',2,1);
INSERT INTO "Inventory" VALUES (2,'remote_lot',2,2);
INSERT INTO "Sale" VALUES (1,'09/24/2025',872,1,3,1,2);
INSERT INTO "Service" VALUES (1,19200,21000,7000,1,2,1,1);
INSERT INTO "Vehicle" VALUES (1,'Fjordbuster',2018,'Hondra','98724568192749241','in_service',1,NULL,1);
INSERT INTO "Vehicle" VALUES (2,'Smaverick',1987,'Treesan','85734189762450814','sold',2,1,NULL);
CREATE VIEW Billing_View AS
SELECT
	emp.f_name,
	emp.l_name,
	bil.date,
	bil.payment_method
FROM Employee as emp
JOIN Billing as bil ON emp.emp_id = bil.emp_id
WHERE emp.employee_role = "billing_staff";
CREATE VIEW Mechanic_View AS
SELECT
	emp.f_name,
	emp.l_name,
	vcl.make,
	vcl.model,
	srv.mileage_arrival,
	srv.mileage_depart,
	srv.final_estimate
FROM Employee as emp
JOIN Service as srv ON emp.emp_id = srv.emp_id
JOIN Vehicle as vcl ON srv.vehicle_id = vcl.vehicle_id
WHERE emp.employee_role = "mechanic";
CREATE VIEW Salesperson_View AS
SELECT
	emp.f_name,
	emp.l_name,
	sal.date_sold,
	sal.temp_tag_num,
	inv.status
FROM Employee as emp
JOIN Sale as sal ON emp.emp_id = sal.emp_id
JOIN Inventory as inv ON sal.vehicle_id = inv.vehicle_id
WHERE emp.employee_role = "salesperson";
COMMIT;
