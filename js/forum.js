$(document).ready(function () {
    getForum()

    $("#makeDisc").on("click", function () {
        $("#discParaForm").toggleClass("hiddenForm")

        $("#postDisc").on("click", function () {
            $("#discParaForm").addClass("hiddenForm")
            //retrieve form vals
            let discName = $("#discName").val();
            let discDesc = $("#discDesc").val();

            let jsonData = {
                "forumTitle": discName,
                "forumDesc": discDesc
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://collectionone-0bc0.restdb.io/rest/everything",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "602e11d35ad3610fb5bb620f",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsonData),
                "beforeSend": function () {
                    $("#postDisc").prop("disabled", true);
                    //clear our form using the form id and triggering it's reset feature
                    $("#discParaForm").trigger("reset");
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $("#postDisc").prop("disabled", false);
            });
        })

    }); //end of create forum btn


    function getForum(limit = 10, all = true) {

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://collectionone-0bc0.restdb.io/rest/everything",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "602e11d35ad3610fb5bb620f",
                "cache-control": "no-cache"
            },
        }

        $.ajax(settings).done(function (response) {
            console.log(response)
            //error occuring due to only 1 API key, which messes up the loop, push i think
            forumList = [];

            for (let i = 0; i < response.length; i++) {
                console.log(response[i].forumTitle)
                if (response[i].forumTitle !== undefined) {
                    forumList.push(response[i])
                } else {
                    continue
                }
            }

            console.log(forumList)

            let content = "";

            for (var i = 0; i < forumList.length; i++) {
                content = `${content}
                <div class="container-fluid" id='${forumList[i].forumTitle}' style="border: 1px solid black; background-color:honeydew; margin: 30px; padding: 50px">
                    <h4>${forumList[i].forumTitle}</h4>
                    <div class="row">
                        <div class="col">
                            <p>${forumList[i].forumDesc}</p>
                        </div>
                    </div>
                </div>`;
            }

            $("#postedForums").html(content);
        });
    };
});
//end of doc