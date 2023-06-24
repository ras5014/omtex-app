$(document).ready( function () {
    $('#payments_to_vendors').DataTable({
        "ordering": false
    });

    $('#payments_from_customers').DataTable({
        "ordering": false
    });

    $('#payments_to_employees').DataTable({
        "ordering": false
    });

    $("#payment_to_receive").hide();
    $("#pmnt_from_customers").hide();
    $("#payment_to_employee").hide();
    $("#pmnt_to_employees").hide();

    $("#payment_to_give_btn").click(function() {
        $("#payment_to_receive").hide();
        $("#pmnt_from_customers").hide();
        $("#payment_to_employee").hide();
        $("#pmnt_to_employees").hide();
        $("#payment_to_give").slideDown();
        $("#pmnt_to_vendors").slideDown();
        });
    
    $("#payment_to_receive_btn").click(function() {
        $("#payment_to_give").hide();
        $("#pmnt_to_vendors").hide();
        $("#payment_to_employee").hide();
        $("#pmnt_to_employees").hide();
        $("#payment_to_receive").slideDown();
        $("#pmnt_from_customers").slideDown();
        });
    
    $("#payment_to_employee_btn").click(function() {
        $("#payment_to_receive").hide();
        $("#pmnt_from_customers").hide();
        $("#payment_to_give").hide();
        $("#pmnt_to_vendors").hide();
        $("#payment_to_employee").slideDown();
        $("#pmnt_to_employees").slideDown();
        });
});
