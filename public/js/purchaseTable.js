$(document).ready( function () {
    $('#purchaseTable').DataTable({
      "ordering": false
    });
});

function onEdit(td) {
  selectedRow = td.parentElement.parentElement.parentElement;
  document.getElementById('invoice_no').value = selectedRow.cells[0].innerHTML;
  document.getElementById('vendor').value = selectedRow.cells[1].innerHTML;
  document.getElementById('physically_received_status').value = selectedRow.cells[4].innerHTML;
  document.getElementById('transport_charge').value = selectedRow.cells[5].innerHTML;
  document.getElementById('trolly_charge').value = selectedRow.cells[6].innerHTML;
  document.getElementById('transport_charge_status').value = selectedRow.cells[7].innerHTML;
  document.getElementById('trolly_charge_status').value = selectedRow.cells[8].innerHTML;
  document.getElementById('payment_status').value = selectedRow.cells[9].innerHTML;
}


