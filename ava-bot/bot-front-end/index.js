$(function() {
    "use strict";
    /*
    q&a maker connection sameple:
     POST /knowledgebases/de7047e0-2e03-4d9a-9dcc-757106fadcbb/generateAnswer
     Host: https://westus.api.cognitive.microsoft.com/qnamaker/v1.0
     Ocp-Apim-Subscription-Key: b1f0b2684e2946879f409b65f8590da6
     Content-Type: application/json
     {"question":"hi"}
     */
    $("#s-button").on("click", function (e) {
        e.preventDefault(); //stop submit button reload the page
        //console.log($("#first_input").val());
        var input = {"question": $("#first_input").val()};
        console.log(input); //log input object value
        $.ajax({
            url : "https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/" +
            "knowledgebases/de7047e0-2e03-4d9a-9dcc-757106fadcbb/generateAnswer",
            type: "POST",
            data : JSON.stringify(input),
            headers:{
                "Ocp-Apim-Subscription-Key": "b1f0b2684e2946879f409b65f8590da6"
            },
            contentType : "application/json",
            success: function (d) {
                console.log(d);
                $("#message").text("Answer: " + d.answer + " , Score: " + d.score);
            },
            error: function (e) {
                console.log(e);
                $("#message").text("Error.   status code: " + e.status + ", status text: " + e.statusText + ", messsage: " +
                e.responseText);
            }
        });

    });

});
