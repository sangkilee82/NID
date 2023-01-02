function validCheck() {

	var IsValidation = true;
	//필수요소
	$('.mustNeed').each(function () {
		if ($(this).attr('type') == "radio" || $(this).attr('type') == "checkbox") {
			if ($('[name=' + $(this).attr('name') + ']:checked').length == 0) {
				alert($(this).attr('title') + ' 선택해 주세요.');
				$(this).focus();
				IsValidation = false;
				return false;
			}
		}
		else {
			if ($(this).val() == "") {
				alerm_str = ""
				if ($(this).is('input') || $(this).is('textarea')) alerm_str = " 입력";
				if ($(this).is('select')) alerm_str = " 선택";
				alert($(this).attr('title') + alerm_str + '해 주세요.');
				$(this).focus();
				IsValidation = false;
				return false;
			}
		}

	});


	return IsValidation;
}