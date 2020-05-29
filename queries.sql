-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.Id,
    a.CategoryName,
    ProductName
FROM Product AS p
    JOIN Category AS a ON p.CategoryId = a.id
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT o.id, o.ShipName
FROM [Order] AS o
WHERE OrderDate < '2012-08-09';


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.


SELECT p.ProductName, od.quantity
FROM [OrderDetail] AS od
    JOIN Product AS p ON p.Id = od.ProductId
WHERE od.orderId = 10251



-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

Select o.Id, c.CompanyName, e.LastName
FROM [Order] as o
    JOIN Customer as c ON c.Id = o.CustomerID
    JOIN Employee as e ON e.Id = o.EmployeeId
