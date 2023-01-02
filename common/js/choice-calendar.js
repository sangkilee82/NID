$(document).ready(function () {
	function setDate1(range) {
		if (range == -1) {
			$('#start_dd').val('');
			$('#end_dd').val('');
		} else {
			var dt = new Date();
			dt.setDate(dt.getDate() - parseInt(range));
			$('#end_dd').val(formatDate(new Date()));
			$('#start_dd').val(formatDate(dt));
		}
	}

	$('#date_str1').click(function () {
		setDate1(0);
		$("#date_str").val("date_str1");
		//$('#searchform').submit();
	});
	$('#date_str2').click(function () {
		setDate1(7);
		$("#date_str").val("date_str2");
		//$('#searchform').submit();
	});
	$('#date_str3').click(function () {
		setDate1(14);
		$("#date_str").val("date_str3");
		//$('#searchform').submit();
	});
	$('#date_str4').click(function () {
		setDate1(30);
		$("#date_str").val("date_str4");
		//$('#searchform').submit();
	});
	$('#date_str5').click(function () {
		setDate1(90);
		$("#date_str").val("date_str5");
		//$('#searchform').submit();
	});
	$('#date_str6').click(function () {
		setDate1(-1);
		$("#date_str").val("date_str6");
		//$('#searchform').submit();
	});

});

function formatDate(date) {
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
	return (date.getFullYear() + "-" + ((mymonth < 10) ? "0" : "") + mymonth + "-" + ((myweekday < 10) ? "0" : "") + myweekday);
}