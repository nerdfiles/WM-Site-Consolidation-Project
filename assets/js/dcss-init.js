if (document.getElementById) {
    //createStyleRule(".tabs-header", "display:none;");
    createStyleRule(".tabs-body", "display:none;");
    window.onload = myUnobtrusiveBehavior;
}

function myUnobtrusiveBehavior() {
    //setElementStyleById("tabs-header", "display", "none");
    setElementStyleById("tabs-body", "display", "none");
}