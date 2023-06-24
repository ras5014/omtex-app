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
});

function calc() {
	$('#tab_logic tbody tr').each(function(){
		var html = $(this).html();
		if(html != '') {
			let qty = $(this).find('.qty').val();
			let price = $(this).find('.price').val();
			var total = qty * price;
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
	$('#total_return_price').val(another_total.toFixed(2));
}