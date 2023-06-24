$(document).ready( function () {
    $('#stocksTable').DataTable();
} );

function onEdit(td) {
    selectedRow = td.parentElement.parentElement.parentElement;
    document.getElementById('item_no').value = selectedRow.cells[0].innerHTML;
    document.getElementById('item_name').value = selectedRow.cells[1].innerHTML;
    document.getElementById('qty_available').value = selectedRow.cells[2].innerHTML;
    document.getElementById('uom').value = selectedRow.cells[3].innerHTML;
    document.getElementById('size').value = selectedRow.cells[4].innerHTML;
    document.getElementById('category').value = selectedRow.cells[5].innerHTML;
    document.getElementById('brand').value = selectedRow.cells[6].innerHTML;
    document.getElementById('type').value = selectedRow.cells[7].innerHTML;
    document.getElementById('cp').value = selectedRow.cells[8].innerHTML;
    document.getElementById('sp').value = selectedRow.cells[9].innerHTML;
    document.getElementById('hsn').value = selectedRow.cells[10].innerHTML;
  }