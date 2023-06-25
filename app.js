let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');
let app = express();
let _ = require('lodash');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
    secret: 'secret',
    cookie: { maxAge : 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

const db = mysql.createConnection({
    host: '34.93.233.252',
    user: 'root',
    password: 'Ashok1963',
    database: 'omtex'
});

let item_array; 
let vendor_array;
let message = '';

function setItemArray(results) {
    item_array = results;
}

function setVendorArray(rows) {
    vendor_array = rows;
}

function setSalesmanArray(rows) {
    salesman_array = rows;
}

const date = new Date();
const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
});

db.connect(function (err) {
    if (err) {
        console.log("Database Not Connected" + err.message);
    } else {
        console.log("Database Connected");
    }
});

app.get('/', function (req, res) {
    res.render("home");

    db.query("SELECT item_name FROM item_info_and_stocks", function (err, results) {
        if (err) throw err;
        else {
            setItemArray(results);
        }
    });

    db.query("SELECT vendor_name FROM vendor_info", function (err, results) {
        if (err) throw err;
        else {
            setVendorArray(results);
        }
    });

    db.query("SELECT customer_name FROM customer_info", function(err, results) {
        setCustomerArray(results);
    });

    db.query("SELECT employee_name FROM employee_info", function(err, results) {
        setSalesmanArray(results);
    });

    const sql = "SELECT invoice_no FROM purchase WHERE payment_status = 'Unpaid'";
    db.query(sql, function(err, results) {
        setUnpaidInvoices(results);
    });

    db.query("SELECT * FROM payments_to_vendors ORDER BY row_id DESC", function(err, results) {
        setpaymentsToVendors_Table (results);
    });

    db.query("SELECT * FROM payments_from_customers ORDER BY row_id DESC", function(err, results) {
        setpaymentsFromCustomers_Table (results);
    });

    db.query("SELECT * FROM payments_to_employees ORDER BY row_id DESC", function(err, results) {
        setpaymentsToEmployees_Table (results);
    });

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });
});

//======================================================PURCHASE===============================================================


app.get('/purchase', function (req, res) {
    db.query("UPDATE purchase SET payment_status = 'Paid' WHERE balance <= 0");
    let sql = "SELECT * FROM purchase ORDER BY row_id DESC";
    db.query(sql, function (err,results) {
        res.render('purchaseTable', {table: results});
    });

    db.query("SELECT item_name FROM item_info_and_stocks", function (err, results) {
        if (err) throw err;
        else {
            setItemArray(results);
        }
    });

    db.query("SELECT vendor_name FROM vendor_info", function (err, rows) {
        if (err) throw err;
        else {
            setVendorArray(rows);
        }
    });

});

app.get('/purchaseForm', function(req, res) {
    res.render('purchaseForm', {item_array: item_array, formattedDate: formattedDate, vendor_array: vendor_array});
});

app.post('/purchaseForm', function(req, res) {
    for(let i = 0; i < req.body.item_name.length; i++) {
        let sql1 = "call insert_into_purchase_bill_details("+"'"+req.body.invoice_no+"'"+","+"'"+req.body.vendor_name+"'"+","+"'"+req.body.item_name[i]+"'"+","+req.body.qty[i]+","+req.body.price[i]+","+req.body.discount[i]+","+req.body.taxable_value[i]+","+req.body.gst[i]+","+req.body.gst_value[i]+","+req.body.total[i]+")";
        let sql2 = "call insert_into_item_info_and_stocks_if_item_not_present("+"'"+req.body.item_name[i]+"'"+")";
        db.query(sql2);
        db.query(sql1);
    }
    
    let sql4 = "call insert_into_vendor_info("+"'"+req.body.vendor_name+"'"+")";
    db.query(sql4);
    
    let sql3 = "call insert_into_purchase("+"'"+req.body.invoice_no+"'"+","+"'"+req.body.vendor_name+"'"+","+req.body.sub_total+","+req.body.cash_discount+","+req.body.grand_total+","+req.body.grand_total+","+"'NO',0,0,'Unpaid','"+req.body.date+"')";
    db.query(sql3);

    const sql = "SELECT invoice_no FROM purchase WHERE payment_status = 'Unpaid'";
    db.query(sql, function(err, results) {
        setUnpaidInvoices(results);
    });

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });

    res.redirect('/purchase');
});

app.post('/updatePurchaseTable', function(req, res) {
    let sql5 = "UPDATE purchase SET physically_received_status="+"'"+req.body.physically_received_status+"'"+",payment_status="+"'"+req.body.payment_status+"'"+"WHERE invoice_no="+"'"+req.body.invoice_no+"'";
    db.query(sql5);

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });
    
    res.redirect("/purchase");
});

app.post('/deletePurchaseTable', function(req, res) {
    let sql6 = "CALL delete_from_purchase('"+req.body.deletedItem+"',"+"'"+req.body.physically_received_status+"')";
    db.query(sql6);

    db.query("SELECT * FROM payments_to_vendors ORDER BY row_id DESC", function(err, results) {
        setpaymentsToVendors_Table (results);
    });
    
    res.redirect('/purchase');
});

app.post('/showPurchaseDetails', function(req, res) {
    const sql7 = "SELECT * FROM purchase_bill_details WHERE invoice_no="+"'"+req.body.invoice_number+"'";
    db.query(sql7, function(err, rows) {
        res.render("purchaseDetails", {purchaseDetailsTable: rows, invoice_number: req.body.invoice_number, grandTotal: req.body.grandTotal, cashDiscount: req.body.cashDiscount, vendorName: req.body.vendorName, date: req.body.date, subTotal: req.body.subTotal});
    });
});



//===========================================================SALES===========================================================

let customer_array;
let salesman_array;

function setCustomerArray(results) {
    customer_array = results;
}

function setSalesmanArray(rows) {
    salesman_array = rows;
}

app.get('/salesTable', function(req, res) {
    let sql = "SELECT * FROM sales ORDER BY row_id DESC";
    db.query(sql, function (err,results) {
        res.render('salesTable', {table: results, message: req.flash('message')});
    });

    db.query("SELECT customer_name FROM customer_info", function(err, results) {
        setCustomerArray(results);
    });

    db.query("SELECT employee_name FROM employee_info", function(err, rows) {
        setSalesmanArray(rows);
    });

    db.query("SELECT item_name FROM item_info_and_stocks", function (err, results) {
        if (err) throw err;
        else {
            setItemArray(results);
        }
    });
});

app.get('/salesForm', function(req, res) {
    res.render('salesForm', {item_array: item_array, formattedDate: formattedDate, customer_array: customer_array, salesman_array: salesman_array});
});

app.post('/salesForm', function(req, res) {
    for(let i = 0; i < req.body.item_name.length; i++) {
        let sql1 = "call insert_into_sales_details("+"'"+req.body.invoice_no+"'"+","+"'"+req.body.customer_name+"'"+","+"'"+req.body.item_name[i]+"'"+","+req.body.qty[i]+","+req.body.price[i]+","+req.body.discount[i]+","+req.body.taxable_value[i]+","+req.body.gst[i]+","+req.body.gst_value[i]+","+req.body.total[i]+",'"+req.body.sales_type+"')";
        let sql2 = "call insert_into_item_info_and_stocks_if_item_not_present("+"'"+req.body.item_name[i]+"'"+")";
        db.query(sql2);
        db.query(sql1);
    }
    let sql4 = "call insert_into_customer_info("+"'"+req.body.customer_name+"'"+")";
    db.query(sql4);
    let sql3 = "call insert_into_sales("+"'"+req.body.invoice_no+"'"+","+"'"+req.body.customer_name+"'"+","+req.body.sub_total+","+req.body.cash_discount+","+req.body.grand_total+","+"'"+req.body.sales_type+"','"+req.body.date+"','"+req.body.salesman+"')";
    db.query(sql3);
    const sql5 = "call insert_into_employee_info("+"'"+req.body.salesman+"')";
    db.query(sql5);

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });

    res.redirect('/salesTable');
});

app.post('/updateSalesTable', function(req, res) {
    let sql5 = "UPDATE sales SET type="+"'"+req.body.type+"'"+"WHERE invoice_no="+"'"+req.body.invoice_no+"'";
    
    db.query(sql5, (err) => {
        if (err) {
            console.log("Insufficient Stocks");
            message = "Insufficient Stocks, Can not convert to Sales";
            req.flash('message', message);
            res.redirect("/salesTable");
        } else {
            db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
                setstocksTable (results);
            });
            message = "Converted to Sales Successfully";
            req.flash('message', message);
            res.redirect("/salesTable");
        }
    });
});

app.post('/deleteSalesTable', function(req, res) {
    let sql6 = "CALL delete_from_sales('"+req.body.deletedItem+"',"+"'"+req.body.type+"')";
    db.query(sql6);

    res.redirect('/salesTable');
});

app.post('/showSalesDetails', function(req, res) {
    const sql7 = "SELECT * FROM sales_details WHERE invoice_no="+"'"+req.body.invoice_number+"'";
    db.query(sql7, function(err, rows) {
        res.render("salesDetails", {salesDetailsTable: rows, invoice_number: req.body.invoice_number, grandTotal: req.body.grandTotal, cashDiscount: req.body.cashDiscount, customerName: req.body.customerName, date: req.body.date, subTotal: req.body.subTotal});
    });
});

//===========================================================RETURNS============================================================

app.get('/returnTable', function (req, res) {
    let sql = "SELECT * FROM returns ORDER BY row_id DESC";
    db.query(sql, function (err, results) {
        res.render('returnTable', {table: results});
    });

    db.query("SELECT customer_name FROM customer_info", function(err, results) {
        setCustomerArray(results);
    });

    db.query("SELECT employee_name FROM employee_info", function(err, rows) {
        setSalesmanArray(rows);
    });

    db.query("SELECT item_name FROM item_info_and_stocks", function (err, results) {
        if (err) throw err;
        else {
            setItemArray(results);
        }
    });

    db.query("SELECT vendor_name FROM vendor_info", function (err, rows) {
        if (err) throw err;
        else {
            setVendorArray(rows);
        }
    });
});

app.get('/returnForm', function (req, res) {
    res.render('returnForm', {item_array: item_array, formattedDate: formattedDate, customer_array: customer_array, salesman_array: salesman_array, vendor_array: vendor_array});
});

app.post('/returnForm', function (req, res) {
    for(let i = 0; i < req.body.item_name.length; i++) {
        let sql1 = "call insert_into_return_details("+"'"+req.body.return_id+"'"+",'"+req.body.type+"','"+req.body.party_name+"'"+","+"'"+req.body.item_name[i]+"'"+","+req.body.qty[i]+","+req.body.price[i]+","+req.body.total[i]+",'"+req.body.date+"')";
        db.query(sql1);
    }
    console.log(req.body.party_name);
    let sql3 = "call insert_into_returns("+"'"+req.body.return_id+"'"+","+"'"+req.body.type+"',"+"'"+req.body.party_name+"'"+","+req.body.total_return_price+",'"+req.body.date+"','"+req.body.return_by+"')";
    db.query(sql3);

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });

    res.redirect('/returnTable');
});

app.post('/showReturnDetails', function(req, res) {
    const sql7 = "SELECT * FROM return_details WHERE return_id="+"'"+req.body.return_id+"'";
    db.query(sql7, function(err, rows) {
        res.render("returnDetails", {returnDetailsTable: rows, return_id: req.body.return_id, total_return_price: req.body.total_return_price, type: req.body.type, party_name: req.body.party_name, date: req.body.date});
    });
});


//===========================================================PAYMENTS===========================================================
let unpaidInvoices;
let paymentsToVendors_Table;
let paymentsFromCustomers_Table;
let paymentsToEmployees_Table;

function setUnpaidInvoices (results) {
    unpaidInvoices = results;
}

function setpaymentsToVendors_Table (results) {
    paymentsToVendors_Table = results;
}

function setpaymentsFromCustomers_Table (results) {
    paymentsFromCustomers_Table = results;
}

function setpaymentsToEmployees_Table (results) {
    paymentsToEmployees_Table = results;
}


app.get('/payments', function(req, res) {
    res.render('payments', {vendor_array: vendor_array, customer_array: customer_array, salesman_array: salesman_array, invoice_array: unpaidInvoices, formattedDate: formattedDate, table1: paymentsToVendors_Table, table2: paymentsFromCustomers_Table, table3: paymentsToEmployees_Table});
});

app.post('/paymentReceived', function(req, res) {
    const sql = "INSERT INTO payments_from_customers(customer_name, payment_received, mode_of_payment, date) VALUES ('"+req.body.customer+"',"+req.body.payment_received+",'"+req.body.mode_of_payment+"','"+req.body.date1+"')";
    db.query(sql);
    
    db.query("SELECT * FROM payments_from_customers ORDER BY row_id DESC", function(err, results) {
        setpaymentsFromCustomers_Table (results);
    });

    setTimeout(function() { res.redirect('/payments'); }, 300);
});

app.post('/paymentGiven', function(req, res) {
    const sql = "INSERT INTO payments_to_vendors(invoice_no, vendor_name, payment_given, mode_of_payment, date) VALUES ('"+req.body.invoice_no+"','"+req.body.vendor+"',"+req.body.payment_given+",'"+req.body.mode_of_payment+"','"+req.body.date2+"')";
    db.query(sql);
    db.query("SELECT * FROM payments_to_vendors ORDER BY row_id DESC", function(err, results) {
        setpaymentsToVendors_Table (results);
    });

    db.query("UPDATE purchase SET payment_status = 'Paid' WHERE balance <= 0");

    const sql2 = "SELECT invoice_no FROM purchase WHERE payment_status = 'Unpaid'";
    db.query(sql2, function(err, results) {
        setUnpaidInvoices(results);
    });

    setTimeout(function() { res.redirect('/payments'); }, 300);
});

app.post('/paymentToEmployee', function(req, res) {
    const sql = "INSERT INTO payments_to_employees(employee_name, amount_given, mode_of_payment, date) VALUES ('"+req.body.employee+"',"+req.body.amount_given+",'"+req.body.mode_of_payment+"','"+req.body.date1+"')";
    db.query(sql);
    
    db.query("SELECT * FROM payments_to_employees ORDER BY row_id DESC", function(err, results) {
        setpaymentsToEmployees_Table (results);
    });

    setTimeout(function() { res.redirect('/payments'); }, 300);
});

app.post('/delete_paymentGiven', function(req, res) {
    const sql = "DELETE FROM payments_to_vendors WHERE row_id="+req.body.deletedItem;
    db.query(sql);

    db.query("UPDATE purchase SET payment_status = 'Unpaid' WHERE invoice_no='"+req.body.invoice_no1+"' AND balance > 0");
    db.query("SELECT * FROM payments_to_vendors ORDER BY row_id DESC", function(err, results) {
        setpaymentsToVendors_Table (results);
    });

    const sql1 = "SELECT invoice_no FROM purchase WHERE payment_status = 'Unpaid'";
    db.query(sql1, function(err, results) {
        setUnpaidInvoices(results);
    });

    setTimeout(function() { res.redirect('/payments'); }, 300);
});

app.post('/delete_paymentReceived', function(req, res) {
    const sql = "DELETE FROM payments_from_customers WHERE row_id="+req.body.deletedItem1;
    db.query(sql);

    db.query("SELECT * FROM payments_from_customers ORDER BY row_id DESC", function(err, results) {
        setpaymentsFromCustomers_Table (results);
    });
    
    setTimeout(function() { res.redirect('/payments'); }, 300);
});

//===========================================================STOCKS===========================================================

let stocksTable;

function setstocksTable (results) {
    stocksTable = results;
}

app.get('/stocks', function(req, res) {
    res.render('stocks', {table: stocksTable});
});

app.post('/update_stocksTable', function(req, res) {
    const sql = "UPDATE item_info_and_stocks SET item_name="+"'"+req.body.item_name+"'"+",qty_stock="+req.body.qty_available+",uom='"+req.body.uom+"',size="+"'"+req.body.size+"'"+",item_category="+"'"+req.body.category+"'"+",brand="+"'"+req.body.brand+"',type='"+req.body.type+"',cost_price="+req.body.cp+",sell_price="+req.body.sp+",hsn='"+req.body.hsn+"' WHERE row_id="+req.body.item_no;
    db.query(sql);

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });

    setTimeout(function() { res.redirect('/stocks'); }, 300);
});

app.get('/newItem', function(req, res) {
    res.render('newItem');
});

app.post('/addNew_Item', function(req, res) {
    const sql = "INSERT INTO item_info_and_stocks (item_name, qty_stock, uom, size, item_category, brand, type) VALUES ('"+req.body.item+"',"+req.body.qty_available+",'"+req.body.uom+"','"+req.body.size+"','"+req.body.category+"','"+req.body.brand+"','"+req.body.type+"')";
    db.query(sql);

    db.query("SELECT * FROM item_info_and_stocks", function(err, results) {
        setstocksTable (results);
    });
    setTimeout(function() { res.redirect('/stocks'); }, 300);
});

//===========================================================CASH-BOOK===========================================================
let amount_in_bank;
let amount_in_cash;

app.get('/cashBook', function(req, res) {
    db.query("SELECT balance FROM amount_in_bank", (err, results) => {
        amount_in_bank = results[0].balance;
    });

    db.query("SELECT balance FROM amount_in_cash", (err, results) => {
        amount_in_cash = results[0].balance;
    });

    const sql = "SELECT * FROM cash_book ORDER BY row_id DESC LIMIT 500";
    db.query(sql, function(err, results) {
        res.render('cashbook', {formattedDate: formattedDate, table: results, amount_in_bank: amount_in_bank, amount_in_cash: amount_in_cash});
    });
});

app.post('/bankDeposit', function(req, res) {
    const amount = req.body.amount_to_bank;
    db.query(`UPDATE amount_in_bank SET balance = balance + ${amount}`);
    db.query(`UPDATE amount_in_cash SET balance = balance - ${amount}`);
    res.redirect('/cashBook');
});

app.post('/withdraw', function(req, res) {
    const reason = req.body.reason;
    const amount = req.body.withdraw_amount;

    if (reason === 'From Bank to Business Cash (Amount will be added to Cash in hand)') {
        db.query(`UPDATE amount_in_cash SET balance = balance + ${amount}`);
        db.query(`UPDATE amount_in_bank SET balance = balance - ${amount}`);
    } else if (reason === 'Withdraw for Self from Bank (Amount will be gone from Business Account)') {
        const sql1 = `UPDATE available_balance SET available_balance = available_balance - ${amount}`;
        const sql2 = `INSERT INTO cash_book (date, remark, amount, balance) VALUES ('${formattedDate}', 'Withdrawn for expenses from Bank', ${amount}, (SELECT available_balance from available_balance))`;
        db.query(sql1);
        db.query(sql2);
        db.query(`UPDATE amount_in_bank SET balance = balance - ${amount}`);
    } else {
        const sql1 = `UPDATE available_balance SET available_balance = available_balance - ${amount}`;
        const sql2 = `INSERT INTO cash_book (date, remark, amount, balance) VALUES ('${formattedDate}', 'Withdrawn for expenses from Cash', ${amount}, (SELECT available_balance from available_balance))`;
        db.query(sql1);
        db.query(sql2);
        db.query(`UPDATE amount_in_cash SET balance = balance - ${amount}`);
    }
    res.redirect('/cashBook');
});

//==========================================================People-Info==========================================================
app.get ("/customerInfo", function(req, res) {
    const sql = "SELECT * FROM customer_info";
    db.query(sql, function(err, results) {
        res.render('customer_info', {table: results});
    });
});

app.post('/updateCustomerTable', function(req, res) {
    let sql5 = "UPDATE customer_info SET shop_name="+"'"+req.body.shop_name+"'"+",phone="+"'"+req.body.phone+"'"+",email="+"'"+req.body.email+"'"+",gstin="+"'"+req.body.gstin+"'"+",city="+"'"+req.body.city+"'"+",state="+"'"+req.body.state+"'"+",address="+"'"+req.body.address+"'"+"WHERE customer_name="+"'"+req.body.customer_name+"'";
    db.query(sql5);
    
    res.redirect("/customerInfo");
});

app.get ("/vendorInfo", function(req, res) {
    const sql = "SELECT * FROM vendor_info";
    db.query(sql, function(err, results) {
        res.render('vendor_info', {table: results});
    });
});

app.post('/updateVendorTable', function(req, res) {
    let sql5 = "UPDATE vendor_info SET company_name="+"'"+req.body.company_name+"'"+",phone="+"'"+req.body.phone+"'"+",email="+"'"+req.body.email+"'"+",gstin="+"'"+req.body.gstin+"'"+",city="+"'"+req.body.city+"'"+",state="+"'"+req.body.state+"'"+",address="+"'"+req.body.address+"'"+"WHERE vendor_name="+"'"+req.body.vendor_name+"'";
    db.query(sql5);
    
    res.redirect("/vendorInfo");
});

app.get ("/employeeInfo", function(req, res) {
    const sql = "SELECT * FROM employee_info";
    db.query(sql, function(err, results) {
        res.render('employee_info', {table: results});
    });
});

//============================================================PRODUCTION============================================================
app.get("/production", function(req, res) {
    res.render('production');
});


app.listen(3000 || process.env.PORT, function(req, res) {
    console.log("Server has started on http://localhost:3000");
});

