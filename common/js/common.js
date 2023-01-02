String.prototype.replaceAll = function (regex, replacement) {
	return this.split(regex).join(replacement);
}

String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

Array.prototype.indexOf = function (item, from) {
	var len = this.length;
	for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
		if (this[i] === item) return i;
	}
	return -1;
}

function $id(id) {

	return document.getElementById(id);

}

function submit_msg( id ) {

	if (!id) id = regi_area;
	
	if ($("#" + id).length > 0) {

		$("#" + id).children().css("visibility", "hidden");
		$("#" + id).append("<span>등록중입니다. 잠시만 기다려주세요...</span>");

	}

}
	

function list_check(seq, option_name) {

	var option = this[option_name];
	var seq_name = option.seq_name;		//시퀀스 명
	var page = option.page;						//페이지 번호

	//검색 항목 설정
	var search_arr = [];
	for (var key in option.search) {

		search_arr.push(key + "=" + option.search[key]);

	}
	var search_str = search_arr.join("&");
	if (search_str.trim()) {

		search_str = "&" + search_str;

	}

	var browser = navigator.userAgent.toLowerCase();
	
	if (-1 != browser.indexOf('msie')) {
		seq = seq.replace("&reg", "&amp;reg");
	} else if (-1 != browser.indexOf('rv')) {
		seq = seq.replace("&reg", "&amp;reg");
	}
	location.href = option.read_url + "?" + seq_name + "=" + seq + "&page=" + page + search_str;

}

//날짜 변경시
function date_term_chage(oThis, str) {

  var arr = str.split('_');
  var term = arr[0];
  var unit = arr[1];

  //종료일자
  var date = moment();
  var e_date = date.format("YYYY-MM-DD");

  //시작일자
  date.add(Number(-term), unit);
  var s_date = date.format("YYYY-MM-DD");

  $(oThis).parents("td").find("#s_date").val(s_date);
  $(oThis).parents("td").find("#e_date").val(e_date);

  if ($("#date_term").length > 0) $("#date_term").val(str);
  if ($("#searchform").length > 0) $("#searchform").submit();

}

//일 변경시
function day_change(str, now) {

  var arr = str.split('_');
  var term = arr[0];
  var unit = arr[1];

  //일자
  var date = null;

  //오늘이 아닐경우
  if (str != "0_d") {

    date = moment(now);

  } else {

    date = moment();

  }

  date.add(Number(term), unit);
  var s_date = date.format("YYYY-MM-DD");
  $("#s_date").val(s_date);
  $("#searchform").submit();

}

function check_restr(restr, id) { //제한타입, id

    var num = /[0123456789]/;   //숫자
    var han = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;  //한글
    var re = /[~!@\#$%<>^&*\-=+_\',.`";:<>/?\[\]\-\+_=|\\]/gi;   //특수문자
    var eng = /[abcdefghijklmnopqrstuvwxyz]/;   //영어

    var check_num = "num";
    var check_han = "han";
    var check_re = "re";
    var check_eng = "eng";

    if (restr == check_num) {    //숫자제한

        var obj = $("#" + id).val();

        if (num.test(obj)) {

        return true;

        }



    }

    if (restr == check_han) {    //한글제한

        var obj = $("#" + id).val();

        if (han.test(obj)) {

        return true;

        }


    }

    if (restr == "re") {     //특수문자제한

        var obj = $("#" + id).val();

        if (re.test(obj)) {

        return true;

        }


    }

    if (restr == check_eng) {    //영어제한

        var obj = $("#" + id).val();

        if (eng.test(obj)) {

        return true;

        }

    }

}

function send_check(page_name, del_chk) {

	var del_str = "";
	if (del_chk == true) {

	  del_str = "page_gubun=DELETE&";
		if (!confirm("정말 삭제하시겠습니까?")) return;

	}

	var now_url = location.href;
	var sp_url = "";
	var qstr = "";
	if (now_url.indexOf("?") != -1) {

		sp_url = now_url.split("?")[0];
		qstr = "?" + del_str + now_url.split("?")[1];

	} else {

		sp_url = now_url + "?" + del_str;

	}

	var sp_url_arr = sp_url.split("/");
	sp_url_arr[sp_url_arr.length - 1] = page_name;

	location.href = sp_url_arr.join("/") + qstr;

}

function send_check_change(page_name, del_chk) {

  var del_str = "";
  if (del_chk == true) {

    del_str = "page_gubun=CHANGE&";
    if (!confirm("정말 변경하시겠습니까?")) return;

  }

  var now_url = location.href;
  var sp_url = "";
  var qstr = "";
  if (now_url.indexOf("?") != -1) {

    sp_url = now_url.split("?")[0];
    qstr = "?" + del_str + now_url.split("?")[1];

  } else {

    sp_url = now_url + "?" + del_str;

  }

  var sp_url_arr = sp_url.split("/");
  sp_url_arr[sp_url_arr.length - 1] = page_name;

  location.href = sp_url_arr.join("/") + qstr;

}

//$(document).ready(function () {
//	$(".notHangul").keyup(function (event) {
//		if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
//			var inputVal = $(this).val();
//			$(this).val(inputVal.replace(/[^a-z0-9]/gi, ''));
//		}
//	});

//});

function onlyNumber( event ) {
	if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode == 110) || (event.keyCode == 190))) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
}

//$(document).ready(function () {
//	$(".onlyNumber").live("keyup", function (event) {
//		if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
//			var inputVal = $(this).val();
//			$(this).val(inputVal.replace(/[^0-9.]/gi, ''));
//		}
//	});
//});

//체크 박스 체크
function comm_all_check(oThis, chk_name) {

  $(":checkbox[name='" + chk_name + "']").prop("checked", oThis.checked);

}
/**/
$(function(){
	$('.patient_list_ul a').click(function(){
		$('.patient_list_ul a').parent().removeClass('on')
		$(this).parent().addClass('on')
	})
})

//G-PIN 공통 함수
function open_gpin(gubun) {

    var wWidth = 360;
    var wHight = 120;
    var wX = (window.screen.width - wWidth) / 2;
    var wY = (window.screen.height - wHight) / 2;

    var host = "http://janid_test.ctit.co.kr/";
    //var host = "";
    window.open(host + "g-pin/Sample-AuthRequest.aspx?gubun=" + gubun, "gPinLoginWin", "directories=no,toolbar=no,left=" + wX + ",top=" + wY + ",width=" + wWidth + ",height=" + wHight);

}

//보안 다운로드
var _filepath = "";
var _filename = "";
function open_doc_approve(uid, filepath, realfilename, filename, menu, gubun, title, article_no) {

	//if (!uid) {

	//	alert('로그인 후 자료 사용 신청서를 작성하시면 다운로드 하실 수 있습니다.');
	//	location.href = "/member/login.aspx";
	//	return;

	//}

	_filename = filename;
	_filepath = filepath + "/" + _filename;

	// 프로토콜
	var protocol = location.protocol;

  if (article_no == 216) {
    console.log("in1");
    window.open("https://www.nid.or.kr/info/nid_pds_reg_ktest.aspx?uid=" + uid + "&gubun=" + gubun + "&realfilename=" + encodeURIComponent(realfilename) + "&filename=" + encodeURIComponent(filename) + "&menu=" + encodeURIComponent(menu) + "&title=" + encodeURIComponent(title) + "&protocol=" + protocol, "open_doc_approve", "width=946, height=800, scrollBars=yes");

  } else {
    console.log("in2");
    console.log("https://www.nid.or.kr/info/nid_pds_reg.aspx?uid=" + uid + "&gubun=" + gubun + "&realfilename=" + encodeURIComponent(realfilename) + "&filename=" + encodeURIComponent(filename) + "&menu=" + encodeURIComponent(menu) + "&title=" + encodeURIComponent(title) + "&protocol=" + protocol);
    window.open("https://www.nid.or.kr/info/nid_pds_reg.aspx?uid=" + uid + "&gubun=" + gubun + "&realfilename=" + encodeURIComponent(realfilename) + "&filename=" + encodeURIComponent(filename) + "&menu=" + encodeURIComponent(menu) + "&title=" + encodeURIComponent(title) + "&protocol=" + protocol, "open_doc_approve", "width=946, height=800, scrollBars=yes");

  }

}

function file_down_approve(filepath, filename) {
  
	if (filepath && filename) {

		_filename = filename;
		_filepath = filepath;

	}

	if (!_filepath || !_filename) {

		alert("다운로드 하실 첨부파일이 존재하지 않습니다.");
		return;

	}

	if (_filename.indexOf( ".zip" ) != -1) {
	
		location.href = "/_upload/" + _filepath.replaceAll("\\", "/");

	} else {
	
		location.href = "/download/download.aspx?path=" + _filepath + "&filename=" + _filename;
	
	}

	_filename = "";
	_filepath = "";

}

//보안 다운로드
var _filepath = "";
var _filename = "";
function open_doc_approve_se(uid, filepath, filename, menu, gubun, title) {

	//if (!uid) {

	//	alert('로그인 후 자료 사용 신청서를 작성하시면 다운로드 하실 수 있습니다.');
	//	location.href = "/member/login.aspx";
	//	return;

	//}

	_filename = filename;
	_filepath = filepath + "/" + _filename;

	// 프로토콜
	var protocol = location.protocol;

	window.open("https://www.nid.or.kr/info/nid_pds_reg.aspx?uid=" + uid + "&gubun=" + gubun + "&filename=" + encodeURIComponent(filename) + "&menu=" + encodeURIComponent(menu) + "&title=" + encodeURIComponent(title) + "&protocol=" + protocol, "open_doc_approve", "width=946, height=800, scrollBars=yes");

}

function file_down_approve_se(filepath, filename) {
	
	if (filepath && filename) {

		_filename = filename;
		_filepath = filepath;

	}

	if (!_filepath || !_filename) {

		alert("다운로드 하실 첨부파일이 존재하지 않습니다.");
		return;

	}

	if (_filename.indexOf( ".zip" ) != -1) {
	
		location.href = "/_upload/" + _filepath.replaceAll("\\", "/");

	} else {
	
		location.href = "/download/download.aspx?path=" + _filepath + "&filename=" + _filename;
	
	}

	_filename = "";
	_filepath = "";

}

function make_new_url(new_page_name, q_json) {

	var url = location.href;
	var page_url_arr = url.split(".aspx");
	var url_arr = page_url_arr[0].split("/");
	var page_name = url_arr[url_arr.length - 1]

	param.get();
	for (var key in q_json) {

		param.add(key, q_json[key]);

	}

	return param.join().replace(page_name + ".aspx", new_page_name + ".aspx");

}

//페이지 이동
function page_move(new_page_name, q_json, blank_chk) {

	var url = make_new_url(new_page_name, q_json);
	if (!blank_chk) {

		location.href = url;

	} else {

		window.open(url, "page_move", "");

	}

}

function page_print() {

	alert("인쇄 설정에서 '배경색 및 이미지 인쇄' 를 체크 하시면 배경색상 및 이미지를 인쇄할 수 있습니다.");
	//param.get();
	//param.add("print_mode", "Y");
	//var url = param.join();

	window.open("/main/print.aspx", "page_print", "width=500, height=700, scrollbars=yes");

}