$(document).ready(function() {
    var i=1;
    $("#add_row").click(function(){
        b=i-1;                                                                     // i = current no. of rows of the table
      	$('#addr'+i).html($('#addr'+b).html()).find('td:first-child').html(i+1);   // Makes a row
      	$('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');                    // Adds that row to the table
      	i++; 
  	});
    $("#delete_row").click(function(){
    	if(i>1){
		$("#addr"+(i-1)).html('');
		i--;
		}
		calc();
	});

	$('#tab_logic tbody').on('keyup change',function(){
		calc();
	});
	$('#cash_discount').on('keyup change',function(){
		calc_total();
	});
});

function calc() {
	$('#tab_logic tbody tr').each(function(){
		var html = $(this).html();
		if(html != '') {
			let qty = $(this).find('.qty').val();
			let price = $(this).find('.price').val();
			let discount = $(this).find('.discount').val();
			let gst = $(this).find('.gst').val();
			let taxable_value = [qty*price*[100-discount]]/100;
			let gst_value = [[[qty*price*[100-discount]]/100]*gst]/100;
			var total = taxable_value + gst_value;
			$(this).find('.taxable_value').val(taxable_value.toFixed(2));
			$(this).find('.gst_value').val(gst_value.toFixed(2));
			$(this).find('.total').val(total.toFixed(2));

			calc_total();
		}
	});
}

function calc_total() {
	let another_total = 0;
	$('.total').each(function() {
		another_total += parseFloat($(this).val());
	});
	$('#sub_total').val(another_total.toFixed(2));
	let cash_discount = $('#cash_discount').val();
	let grand_total = Math.round(another_total - cash_discount);
	$('#grand_total').val(grand_total.toFixed(2));
}