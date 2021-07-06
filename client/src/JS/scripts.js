// Materialize CSS Burger Menu
document.addEventListener("DOMContentLoaded", function() {
  var elem = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elem, {
    inDuration: 350,
    outDuration: 350,
    edge: "right"
  });
});

// Materailze CSS Dropdown ("Select")
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {
    inDuration: 350,
    outDuration: 350
  });
});
