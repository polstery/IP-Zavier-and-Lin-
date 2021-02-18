$(document).ready(function () {

    var uncheckedBoxes = $('input[name="quizEduTopicForm"]:not(:checked)');
    inputError = false



    //select all topics button
    $("#checkAll").on("click", function () {
        $(uncheckedBoxes).prop("checked", true)
    });


    //retrieve Year / Stream input
    //display topics in the Topics form

    //retrieve topic input

    //validate submit (all other forms filled with at least 1 val)
    //daily prac btn
    $("#quiz-daily-start-btn").on("click", function () {


        var checkedYear = $('input[name="quizEduYrForm"]:checked');
        var checkedStrm = $('input[name="quizEduStrmForm"]:checked');
        var checkedDiff = $('input[name="quizEduDiffForm"]:checked');
        var checkedTopics = $('input[name="quizEduTopicForm"]:checked');

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

        $.ajax(settings).done(function (response) {

            let quizQn = ""
            if (inputError == false) {
                for (let i = 0; i < response.length; i++) {
                }
            }
        });
    });

    //upload qns from relevant topics (yr and stream) into modal template

    //function-object for modal template
    function QuizQns() {
        console.log("Hello YOU")
    };

    //open modal
    //$("#modalBtn").click()

}); //End of doc