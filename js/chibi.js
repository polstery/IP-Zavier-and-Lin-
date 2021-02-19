//JS for chibi page - Nav side bar, functionailty, buttons..etc
$(document).ready(function () {

    $("#switchEye").on("click", function (e) {
        e.preventDefault()
        $("#eyeMon.creatureHidden").removeClass("creatureHidden")
        $("#snakeMon").addClass("creatureHidden")

    })

    $("#switchSnake").on("click", function (e) {
        e.preventDefault()
        $("#snakeMon.creatureHidden").removeClass("creatureHidden")
        $("#eyeMon").addClass("creatureHidden")
    })

}); //End of doc