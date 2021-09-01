
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
/*------------------------------------------------------------------------------- */

/*------------------------------------Top Navigation------------------------------------------- */


function responsiveTopnav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*------------------------------------------------------------------------------- */
/*--------------------------------------Q&A accordion----------------------------------------- */
var acc = document.getElementsByClassName("accordion");

function accordion() {
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }


    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}


/*------------------------------------------------------------------------------- */
/*--------------------------------------Pop Ups----------------------------------------- */
var show = function (id) {
    $(id).style.display = 'block';
    if (id == 'regForm') {
        showTab(currentTab, "tab", id, 'prevBtn', 'nextBtn');
    }
    if (id == 'purchesForm') {
        showTab(currentTab, "tab purchesForm", id, 'prevBtn2', 'nextBtn2');
    }

}
var hide = function (id) {
    $(id).style.display = 'none';
}


/*---------------------------------------multi pages popup---------------------------------------- */
var currentTab = 0; // Current tab is set to be the first tab (0)

$ = function (id) {
    return document.getElementById(id);
}



function showTab(n, c, id, prevBtn, nextBtn) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName(c);
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById(prevBtn).style.display = "none";
    } else {
        document.getElementById(prevBtn).style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById(nextBtn).innerHTML = "Submit";
    } else {
        document.getElementById(nextBtn).innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n, c, id, prevBtn, nextBtn) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName(c);
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm(c)) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById(id).submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab, c, id, prevBtn, nextBtn);
}

function validateForm(c) {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName(c);
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

/*------------------------------------------------------------------------------- */

















/*
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

*/

