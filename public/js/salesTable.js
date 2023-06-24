$(document).ready( function () {
  $('#salesTable').DataTable({
    "ordering": false
  });
});

function onEdit(td) {
  selectedRow = td.parentElement.parentElement.parentElement;
  document.getElementById('invoice_no').value = selectedRow.cells[0].innerHTML;
  document.getElementById('customer').value = selectedRow.cells[1].innerHTML;
  document.getElementById('type').value = selectedRow.cells[3].innerHTML;
}