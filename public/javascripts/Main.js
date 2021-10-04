
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
        showTab(currentTab, "tab register", id, 'prevBtn', 'nextBtn');
    }
    if (id == 'purchesForm') {
        showTab(currentTab, "tab purchesForm", id, 'prevBtn2', 'nextBtn2');
    }
}
var hide = function (id) {
    
        $(id).style.display = 'none';
    

}

function showTable(id,TableId) {
    $(`table-${TableId}`).style.display = 'block';
    if (TableId == 'Mars') {
        document.getElementById('Next flights to').innerHTML = "Next flights to " + TableId;
    }
    if (TableId == 'Moon') {
        document.getElementById('Next flights to').innerHTML = "Next flights to the " + TableId;
    }
    if (TableId == 'Jupiter Moons') {
        document.getElementById('Next flights to').innerHTML = "Next flights to " + TableId;
    }
    if (TableId == 'ISS') {
        document.getElementById('Next flights to').innerHTML = "Next flights to the " + TableId;
    }
    if (TableId == 'Venus') {
        document.getElementById('Next flights to').innerHTML = "Next flights to " + TableId;
    }
}

/*---------------------------------------multi pages popup---------------------------------------- */

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
        document.getElementById(nextBtn).setAttribute('type', 'submit');
        //document.getElementById(nextBtn).setAttribute('onclick', 'hide("regForm")');
    } else {
        document.getElementById(nextBtn).innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    //fixStepIndicator(n)
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
const n = 1;
var currentTab = 0; // Current tab is set to be the first tab (0)

function nextPrev(n, c, id, prevBtn, nextBtn) {
   
    // This function will figure out which tab to display
    var x = document.getElementsByClassName(c);
    // Exit the function if any field in the current tab is invalid:
    if (!validateForm(c)) {
        document.getElementById("error").innerHTML = "Check input on marked fields";
        return false;
    } else {
        document.getElementsByClassName("step")[currentTab].className += " finish";

    }
    
    document.getElementById("error").innerHTML = "";
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    console.log(x.length);
    console.log(currentTab);
   

    if (currentTab >= x.length) {
        //...the form gets submitted:      
        document.getElementById(id).submit();
        hide(id);
        return false;
    }
    
    // Otherwise, display the correct tab:
    showTab(currentTab, c, id, prevBtn, nextBtn);
}

function validateEmail(email) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return true
    }
    return false
}

function containsOnlyChars(str) {
    if (/^[A-Za-z]*$/.test(str)) {
        return true
    }
    return false
}

function validateDate(date) {
    if (Date.parse(date) > Date.now()) {
        return false;
    }
    return true;
}

function numberOnlyVisa(str) {
    if (/^[0-9 -]*$/.test(str)) {
        return true
    }
    return false
}

function numberOnly(str) {
    if (/^[0-9]*$/.test(str)) {
        return true
    }
    return false
}

function validateForm(c) {
    console.log('go into validforms');
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
        if (y[i].name === "fname" || y[i].name === "lname") {
            if (!containsOnlyChars(y[i].value)) {
                y[i].className += " invalid";
                valid = false;
            }
        }
        if (y[i].name === "email"){
            if (!validateEmail(y[i].value)){
                y[i].className += " invalid";
                valid = false;
            }
        }

        if (y[i].name === "Birthdate") {
            if (!validateDate(y[i].value)) {
                y[i].className += " invalid";
                valid = false;
            }
        }

        if (y[i].name === "numberOnlyVisa" || y[i].name === "ccnum") {
            if (!numberOnlyVisa(y[i].value)) {
                y[i].className += " invalid";
                valid = false;
            }
        }

        if (y[i].name === "numberOnly") {
            if (!numberOnly(y[i].value)) {
                y[i].className += " invalid";
                valid = false;
            }
        }
        if (valid) {
            y[i].className = "";
        }
    }
    // If the valid status is true, mark the step as finished and valid:
 
    return valid; // return the valid status
}

function submitContact() {
    document.getElementById("contact").submit();
    hide('contact');
}

function submitLogin() {
    document.getElementById("url_current_location").value = window.location.href;
    document.getElementById("LogInForm").submit();
    hide('LogInForm');
}

/*------------------------------------------------------------------------------- */