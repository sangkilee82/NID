$(document).ready(function () {

	var quick_menu = $('.topUpBtn_n');
	var quick_top = 250;

	quick_menu.css('top', $(window).height());
	quick_menu.animate({ "top": $(document).scrollTop() + quick_top + "px" }, 500);

	$(window).scroll(function () {

		quick_menu.stop();
		quick_menu.animate({ "top": $(document).scrollTop() + quick_top + "px" }, 1000);

	})

	//탑버튼 클릭시
	$(".topUpBtn a").click(function () {

		$("html,body").animate({ scrollTop: 0 }, 500);
		return false;

	});

	//줌 버튼 클릭시
	$(".btn_zoomInOut").on("click", function (e) {

		var ob_clicked = $(this);

		e.preventDefault();
		ob_clicked.focus();

		var arrOb = $(".ob_zoomInOut");
		var arrFontSize = $.makeArray(arrOb.map(function () {

			var fontSize = $(this).css("font-size");
			return fontSize;

		}));

		for (var i = 0; i < arrFontSize.length; i++) {

			var num = parseFloat(arrFontSize[i], 10);     //글씨크기

			if (ob_clicked.attr("id") == "btnMinus" && parseInt(num) < 11) {

				alert("글씨가 더 작아질 수 없습니다.");
				return false;

			} else if (ob_clicked.attr("id") == "btnPlus" && parseInt(num) > 40) {

				alert("글씨가 더 커질 수 없습니다.");
				return false;

			}

		}

		for (var i = 0; i < arrOb.length; i++) {

			var num = parseFloat(arrFontSize[i], 10);     //글씨크기
			var unit = arrFontSize[i].slice(-2);          //단위

			if (ob_clicked.attr("id") == "btnPlus") {

				//확대버튼을 누르면
				num *= 1.4;

			} else {

				//축소버튼을 누르면
				num /= 1.4;

			}

			//글씨크기 변경 적용
			arrOb[i].style.fontSize = num + unit;

		}

	});
	
});