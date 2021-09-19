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

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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

function phoneNumberValidate(str) {
    if (/^[0-9()+-]*$/.test(str)) {
        return true
    }
    return false
}

function submitWanted() {
    let valid = true;
    x = document.getElementById("FillInformation");
    y = x.getElementsByTagName("input");
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
        if (y[i].name === "email") {
            if (!validateEmail(y[i].value)) {
                y[i].className += " invalid";
                valid = false;
            }
        }

        if(y[i].name === "phone") {
            if (!phoneNumberValidate(y[i].value)) {
                y[i].className += " invalid";
                valid = false;
            }
        }

        if (valid) {
            y[i].className = "";
        }

    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementById("FillInformation").submit();
 
    }
    return false;
}
