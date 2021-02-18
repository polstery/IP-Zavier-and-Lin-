$(document).ready(function () {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://collectionone-0bc0.restdb.io/rest/everything",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "602e11d35ad3610fb5bb620f",
            "cache-control": "no-cache"
        }
    };

    var uncheckedTopics = $('input[name="quizEduTopicForm"]:not(:checked)');

    //select all topics button
    $("#checkAll").on("click", function () {
        $(uncheckedTopics).prop("checked", true)
    });

    //daily prac btn
    $("#quiz-daily-start-btn").on("click", function () {

        inputError = false

        //retrieve Year / Stream / Diff / Topic input
        var checkedYear = $('input[name="quizEduYrForm"]:checked');
        var checkedStrm = $('input[name="quizEduStrmForm"]:checked');
        var checkedDiff = $('input[name="quizEduDiffForm"]:checked');
        var checkedTopics = $('input[name="quizEduTopicForm"]:checked');

        //validate submit (all other forms filled with at least 1 val)

        //validate all forms
        if ((checkedYear.length == 0) || (checkedStrm.length == 0) || (checkedDiff.length == 0) || (checkedTopics.length == 0)) {
            inputError = true
            console.log("errors found")

            //add red tag to relevant area to notify of error
            if (checkedYear.length == 0) {
                $("#quiz-edu-yr h5").addClass("errNotif")
            } else {
                $("#quiz-edu-yr h5.errNotif").removeClass("errNotif")
            }

            if (checkedStrm.length == 0) {
                $("#quiz-edu-strm h5").addClass("errNotif")
            } else {
                $("#quiz-edu-strm h5.errNotif").removeClass("errNotif")
            }

            if (checkedDiff.length == 0) {
                $("#quiz-edu-diff h5").addClass("errNotif")
            } else {
                $("#quiz-edu-diff h5.errNotif").removeClass("errNotif")
            }

            if (checkedTopics.length == 0) {
                $("#quiz-edu-topic h5").addClass("errNotif")
            } else {
                $("#quiz-edu-topic h5.errNotif").removeClass("errNotif")
            }
        } else {
            $(".errNotif").removeClass("errNotif")
        }

        //if no error -> retrieve question data //daily -> 5qns
        if (inputError == false) {

            $.ajax(settings).done(function (response) {
                console.log(response)
                for (i = 0; i < response.length; i++) {
                    let q1 = 3
                }
            });
        }
    });

    //upload qns from relevant topics (yr and stream) into modal template

    //function-object for modal template
    function QuizQns() {
        console.log("Hello YOU")
    };

    //open modal
    //$("#modalBtn").click()

}); //End of doc