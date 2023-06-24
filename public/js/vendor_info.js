$(document).ready( function () {
    $('#vendor_info_Table').DataTable({
      "ordering": false
    });
});

function onEdit(td) {
  selectedRow = td.parentElement.parentElement.parentElement;
  document.getElementById('vendor_name').value = selectedRow.cells[0].innerHTML;
  document.getElementById('balance').value = selectedRow.cells[1].innerHTML;
  document.getElementById('company_name').value = selectedRow.cells[2].innerHTML;
  document.getElementById('phone').value = selectedRow.cells[3].innerHTML;
  document.getElementById('email').value = selectedRow.cells[4].innerHTML;
  document.getElementById('gstin').value = selectedRow.cells[5].innerHTML;
  document.getElementById('city').value = selectedRow.cells[6].innerHTML;
  document.getElementById('state').value = selectedRow.cells[7].innerHTML;
  document.getElementById('address').value = selectedRow.cells[8].innerHTML;
}
