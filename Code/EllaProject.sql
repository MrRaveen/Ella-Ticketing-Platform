CREATE TABLE userInfo(
userID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
fname VARCHAR2(20),
lname VARCHAR2(40),
address VARCHAR2(120),
DOB date,
provience VARCHAR2(20),
city VARCHAR2(20),
NIC VARCHAR2(60),
contactNo VARCHAR2(20),
streetName VARCHAR2(60)
);
INSERT INTO user_info (fname, lname, address, DOB, provience, city, NIC, contactNo, streetName) VALUES
('Raveen', 'Perera', '123 Lake Road, Colombo', TO_DATE('1995-06-15', 'YYYY-MM-DD'), 'Western', 'Colombo', '952345678V', '0771234567', 'Lake Road');

INSERT INTO user_info (fname, lname, address, DOB, provience, city, NIC, contactNo, streetName) VALUES
('Nimali', 'Fernando', '45 Palm Street, Galle', TO_DATE('1992-03-22', 'YYYY-MM-DD'), 'Southern', 'Galle', '923456789V', '0712345678', 'Palm Street');

INSERT INTO user_info (fname, lname, address, DOB, provience, city, NIC, contactNo, streetName) VALUES
('Kamal', 'Jayasinghe', '78 Temple Lane, Kandy', TO_DATE('1988-11-05', 'YYYY-MM-DD'), 'Central', 'Kandy', '882345678V', '0759876543', 'Temple Lane');

INSERT INTO user_info (fname, lname, address, DOB, provience, city, NIC, contactNo, streetName) VALUES
('Tharushi', 'Wijesinghe', '12 Rose Avenue, Kurunegala', TO_DATE('1999-01-30', 'YYYY-MM-DD'), 'North Western', 'Kurunegala', '992345678V', '0765432109', 'Rose Avenue');

INSERT INTO user_info (fname, lname, address, DOB, provience, city, NIC, contactNo, streetName) VALUES
('Sahan', 'De Silva', '90 Ocean Drive, Negombo', TO_DATE('1990-08-12', 'YYYY-MM-DD'), 'Western', 'Negombo', '902345678V', '0781239876', 'Ocean Drive');

SELECT *FROM system.user_info;
SELECT SYS_CONTEXT('USERENV','CURRENT_SCHEMA') FROM dual;
SELECT * FROM USER_INFO;





CREATE TABLE userAcc(
accountID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
createdDateTime TIMESTAMP,
status VARCHAR2(10) NOT NULL CHECK (status IN ('ONLINE','OFLINE')),
accStatus VARCHAR2(10) NOT NULL CHECK (accStatus IN ('ACTIVE','REMOVED','PAUSED')),
lastActiveTime TIMESTAMP,
email VARCHAR2(30),
user_password VARCHAR2(30),
userID NUMBER,
CONSTRAINT fk_userID FOREIGN KEY (userID) REFERENCES userInfo(userID) ON DELETE CASCADE
);
