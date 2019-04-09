function addQuestions() {
   var questionsString = $('#data').val();
   $.ajax({
       type: "POST",
       url: "rest/admin/addQuestions",
       data: questionsString,
       contentType: 'text/plain'
   })
}

function addPlayers() {
   var playersData = $('#playersData').val();
   $.ajax({
       type: "POST",
       url: "rest/admin/addPlayers",
       data: playersData,
       contentType: 'text/plain'
   })
}

function addRules() {
   var rulesData = $('#rulesData').val();
   $.ajax({
       type: "POST",
       url: "rest/admin/addRules",
       data: rulesData,
       contentType: 'text/plain'
   })
}
function setQuizTimeout() {

    var timeoutValue = $('#timeoutValue').val();
    $.ajax({
        type: "POST",
        url: "rest/admin/setQuizTimeout",
        data: timeoutValue,
        contentType: 'text/plain'
    })
    console.log(timeoutValue);

}