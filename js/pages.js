//JS for all pages - Nav side bar, functionailty, buttons..etc
$(document).ready(function () {

    //toggle side bar
    $("#menu-toggle").on("click", function (e) {
        e.preventDefault();
        $("#sidebar-nav").toggleClass("menuDisplayed");
    })

    //quizpage, toggle tab func.
    $(".quizTabs").on("click", function (e) {
        e.preventDefault();
        $(".quizTabs").removeClass("active");
    })

    //quizpage, trigger forms for daily, norm and hard -> unneccessary (had the wrong bootstrap file downloaded)
    $("#quiz-edu-btn").on("click", function (e) {
        e.preventDefault();
        $("#quiz-edu").toggleClass("formDisplayed");
    })

    $("#quiz-topic-btn").on("click", function (e) {
        e.preventDefault();
        $("#quiz-topic").toggleClass("formDisplayed");
    })


}); //End of doc