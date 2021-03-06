$(document).ready(function () {

    $("modalBtn").hide()
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
        $(".errNotif").removeClass("errNotif")

        //retrieve Year / Stream / Diff / Topic input (checked)
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

            //open modal
            $("#modalBtn").click()

            $.ajax(settings).done(function (response) {

                //quiz parameters
                checkedYearList = []
                checkedStrmList = []
                checkedDiffList = []
                checkedTopicsList = []

                //get relevant qns based on checked vals
                for (let yr of checkedYear) {
                    checkedYearList.push(yr.value)
                }

                for (let strm of checkedStrm) {
                    checkedStrmList.push(strm.value)
                }

                for (let diff of checkedDiff) {
                    checkedDiffList.push(diff.value)
                }

                for (let topic of checkedTopics) {
                    checkedTopicsList.push(topic.value)
                }


                //list of relevant qns
                relevantQns = []

                //retrieve vals from restDB and push into relevantQns list
                for (let i = 0; i < response.length; i++) {

                    //check year input val with restDB year val
                    for (let yr = 0; yr < checkedYearList.length; yr++) {
                        if (response[i].year == checkedYearList[yr]) {


                            //check stream input val with restDB stream val
                            for (let st = 0; st < checkedStrmList.length; st++) {
                                if (response[i].stream == checkedStrmList[st]) {

                                    //check diff input val with restDB diff val
                                    for (let di = 0; di < checkedDiffList.length; di++) {
                                        if (response[i].difficulty == checkedDiffList[di]) {

                                            //check topic input val with restDB topic val
                                            for (let tp = 0; tp < checkedTopicsList.length; tp++) {
                                                if (response[i].topic == checkedTopicsList[tp]) {
                                                    relevantQns.push(response[i])
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                //list of selected (5qns for daily)
                let dailyQnLimit = 5
                selectedQns = []
                //loop items in relevantQns and randomize to place in selectedQns list
                for (let i = 0; i < dailyQnLimit; i++) {
                    let ranSelect = Math.floor(Math.random() * relevantQns.length)
                    let selected = relevantQns.splice(ranSelect, 1)
                    selectedQns.push(selected)
                }

                quizQnsList = []
                let dailyContent = ''

                qnNumTemp = 1
                //assigning qn compromise: instead of shuffling ans, we shuffle questions with diff ans arr.
                for (i = 0; i < selectedQns.length; i++) {
                    qnTemplateAssignNum = Math.floor(Math.random() * 4)

                    let diff = selectedQns[i][0].difficulty
                    let quizQn = selectedQns[i][0].question
                    let qnHint = selectedQns[i][0].hint
                    let ansCorrect = selectedQns[i][0].correct
                    let ansWrong1 = selectedQns[i][0].wrong1
                    let ansWrong2 = selectedQns[i][0].wrong2
                    let ansWrong3 = selectedQns[i][0].wrong3

                    //ans = opt 1
                    if (qnTemplateAssignNum == 0) {

                        quizQnsList.push({
                            type: 1,
                            qnNum: qnNumTemp,
                            qn: quizQn,
                            hint: qnHint,
                            difficulty: diff,

                            opt1: ansCorrect,

                            opt2: ansWrong1,
                            opt3: ansWrong2,
                            opt4: ansWrong3,
                            hint: qnHint
                        })
                        qnNumTemp += 1
                    }

                    //ans = opt 2
                    if (qnTemplateAssignNum == 1) {
                        quizQnsList.push({
                            type: 2,
                            qnNum: qnNumTemp,
                            qn: quizQn,
                            hint: qnHint,
                            difficulty: diff,
                            opt1: ansWrong1,

                            opt2: ansCorrect,

                            opt3: ansWrong2,
                            opt4: ansWrong3
                        })
                        qnNumTemp += 1
                    }

                    //ans = opt 3
                    if (qnTemplateAssignNum == 2) {
                        quizQnsList.push({
                            type: 3,
                            qnNum: qnNumTemp,
                            qn: quizQn,
                            hint: qnHint,
                            difficulty: diff,
                            opt1: ansWrong1,
                            opt2: ansWrong2,

                            opt3: ansCorrect,

                            opt4: ansWrong3
                        })
                        qnNumTemp += 1
                    }

                    //ans = opt 4
                    if (qnTemplateAssignNum == 3) {
                        quizQnsList.push({
                            type: 4,
                            qnNum: + qnNumTemp,
                            qn: quizQn,
                            hint: qnHint,
                            difficulty: diff,
                            opt1: ansWrong1,
                            opt2: ansWrong2,
                            opt3: ansWrong3,

                            opt4: ansCorrect
                        })
                        qnNumTemp += 1
                    }

                    //upload qns from relevant topics (yr and stream) into modal template
                    dailyContent = `${dailyContent}
                    <div class='tab-pane fade' id='q${quizQnsList[i].qnNum}'>
                        <div class='row'>
                            <div class="col align-start">
                                <h5>${quizQnsList[i].qn}</h5>
                            </div>
                        </div>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><div class="d-grid gap-2">
                                        <input type="radio" class="btn-check" name="qn${quizQnsList[i].qnNum}" id="qn${quizQnsList[i].qnNum}opt1"
                                            autocomplete="off">
                                        <label class="btn btn-outline-primary" for="qn${quizQnsList[i].qnNum}opt1">${quizQnsList[i].opt1}</label>
                                    </div></td>

                                    <td><div class="d-grid gap-2">
                                        <input type="radio" class="btn-check" name="qn${quizQnsList[i].qnNum}" id="qn${quizQnsList[i].qnNum}opt2"
                                                autocomplete="off">
                                        <label class="btn btn-outline-warning" for="qn${quizQnsList[i].qnNum}opt2">${quizQnsList[i].opt2}</label>
                                    </div></td>
                                </tr>
                            
                                <tr>
                                    <td><div class="d-grid gap-2">
                                        <input type="radio" class="btn-check" name="qn${quizQnsList[i].qnNum}" id="qn${quizQnsList[i].qnNum}opt3"
                                                autocomplete="off">
                                        <label class="btn btn-outline-danger" for="qn${quizQnsList[i].qnNum}opt3">${quizQnsList[i].opt3}</label>
                                    </div></td>

                                    <td><div class="d-grid gap-2">
                                        <input type="radio" class="btn-check" name="qn${quizQnsList[i].qnNum}" id="qn${quizQnsList[i].qnNum}opt4"
                                                autocomplete="off">
                                        <label class="btn btn-outline-success" for="qn${quizQnsList[i].qnNum}opt4">${quizQnsList[i].opt4}</label>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`
                }

                $("#modalContent").html(dailyContent);
                console.log(quizQnsList)

            }); //end of ajax call
        }
    }); //end of start quiz btn

    $("#hint1").on("click", function () {
        console.log("i too have been clicked")
    })

    $("#submitDailyQuiz").on("click", function (e) {
        e.preventDefault()
        let quizError = false
        console.log("button has been clicked")
        let q1Ans = $('input[name="qn1"]:checked');
        let q2Ans = $('input[name="qn2"]:checked');
        let q3Ans = $('input[name="qn3"]:checked');
        let q4Ans = $('input[name="qn4"]:checked');
        let q5Ans = $('input[name="qn5"]:checked');

        //validation - ensure all questions have vals
        if ((q1Ans.length == 0) || (q2Ans.length == 0) || (q3Ans.length == 0) || (q4Ans.length == 0) || (q5Ans.length == 0)) {
            let quizError = true
            console.log("errors found")

            //add red tag to relevant area to notify of error
            if (q1Ans.length == 0) {
                $(" #E1").addClass("errNotif")
            } else {
                $(" #E1 .errNotif").removeClass("errNotif")
            }

            if (q2Ans.length == 0) {
                $(" #E2").addClass("errNotif")
            } else {
                $(" #E2 .errNotif").removeClass("errNotif")
            }

            if (q3Ans.length == 0) {
                $(" #E3").addClass("errNotif")
            } else {
                $(" #E3 .errNotif").removeClass("errNotif")
            }

            if (q4Ans.length == 0) {
                $(" #E4").addClass("errNotif")
            } else {
                $(" #E4 .errNotif").removeClass("errNotif")
            }

            if (q5Ans.length == 0) {
                $(" #E5").addClass("errNotif")
            } else {
                $(" #E5 .errNotif").removeClass("errNotif")
            }
        } else {
            $(".errNotif").removeClass("errNotif")
        }

        let points = 0
        //check answers
        if (quizError == false) {
            //check ans 1
            if (q1Ans[0].getAttribute('id').charAt(6) == quizQnsList[0].type) {
                points += parseInt(quizQnsList[0].difficulty)
                $("#E1").addClass("correctAns")
            }
        }

        if (quizError == false) {
            //check ans 2
            if (q2Ans[0].getAttribute('id').charAt(6) == quizQnsList[1].type) {
                points += parseInt(quizQnsList[1].difficulty)
                $("#E2").addClass("correctAns")
            }
        }

        if (quizError == false) {
            //check ans 3
            if (q3Ans[0].getAttribute('id').charAt(6) == quizQnsList[2].type) {
                points += parseInt(quizQnsList[2].difficulty)
                $("#E3").addClass("correctAns")
            }
        }

        if (quizError == false) {
            //check ans 4
            if (q4Ans[0].getAttribute('id').charAt(6) == quizQnsList[3].type) {
                points += parseInt(quizQnsList[3].difficulty)
                $("#E4").addClass("correctAns")
            }
        }

        if (quizError == false) {
            //check ans 5
            if (q5Ans[0].getAttribute('id').charAt(6) == quizQnsList[4].type) {
                points += parseInt(quizQnsList[4].difficulty)
                $("#E5").addClass("correctAns")
            }
        }

        //update quiz box, with user results
        //clear html
        $("#modalContent").html('')
        let score = ''
        score = `${score}
        <div class='row'>
            <div class="col align-start">
                <h5>You scored ${points} point(s)</h5>
                <p>You may exit by clicking the cross on the top right corner of this pop-up</p>
            </div>
        </div>`

        if (points <= 2) {
            score = `${score}
            <p>Try harder next time! You got this!</p>`
        }

        $("#modalContent").html(score)
        //<button type="button" class="btn btn-secondary" id="closeQuiz" data-bs-dismiss="modal">Close</button>


    }); //end of submit quiz btn

    //quit quiz btn
    $("#quitQuiz").on("click", function () {

        //clear quiz
        $("#modalContent").html("");

        //clear correct ans css
        $(".correctAns").removeClass("correctAns");
    }); //end of quit quiz btn

}); //End of doc