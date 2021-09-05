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