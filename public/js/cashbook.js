$(document).ready( function () {
    $('#cashBook_Table').DataTable({
        "ordering": false
    });
    
    colorize();

    // To Colorize After Page Change due to Pagination

    $('.paginate_button').click(function () {
        colorize();
    });
    
});

function colorize() {
    var table = document.getElementById('cashBook_Table');
    table.rows[1].cells[3].style.color = "white";
    table.rows[1].cells[3].style.background = "green";
    table.rows[1].cells[3].style.fontWeight = "bold";
    
    for(let i = 0; i < table.rows.length; i++) {
        let str = table.rows[i].cells[1].innerHTML;

        if(str.includes('Payment Received From')) {
            table.rows[i].cells[2].style.color = "green";
        } else if(str.includes('Payment Given To')) {
            table.rows[i].cells[2].style.color = "red";
        } else {
            if(i !== 0)
                table.rows[i].cells[2].style.color = "orange";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("myInput");
    var dropdown = document.getElementById("myDropdown");
  
    input.addEventListener("click", function() {
      dropdown.style.display = "block";
    });
  
    dropdown.addEventListener("click", function(event) {
      if (event.target.tagName === "LI") {
        input.value = event.target.textContent;
        dropdown.style.display = "none";
      }
    });
  
    document.addEventListener("click", function(event) {
      if (!input.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
      }
    });
  });

