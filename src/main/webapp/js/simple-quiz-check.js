function getAnswers(){
	var Answers = $.ajax({
                type: "GET",
                url: "rest/admin/check/answers",
                async: false,
            }).responseText;
	return Answers.split(';');
}

function checkAnswer(id, correctCode, correctText) {
   $.ajax({
      type: "POST",
      url: "rest/admin/check/answer",
      data: id + "|" + correctCode,
      contentType: 'text/plain',
      success: function (){
        var iscorrect = document.getElementById(id);
        iscorrect.innerHTML = correctText;
        $('#' + id).attr('correctCode',correctCode);
      }
  }).responseText;
}