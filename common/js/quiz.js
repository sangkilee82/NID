$(document).ready(function () {
		
	checkfun(); // 체크박스
	checkfun2(); // 마이페이지 체크박스
	advfun(); // 도움말 팝업
	yesfun(); // 항목 추가 옵션 팝업
	popup1(); // 팝업1 
	popup2(); // 팝업2
	positionfun(); // 퀴즈 위치로 이동


});

function checkfun(){
	$('.n_quiz_wrapper input').on("click", function(){
	    $( 'input:checked' ).parent().addClass( 'selected' );
	    $( 'input:not(:checked)' ).parent().removeClass( 'selected' );
	});
}

function checkfun2(){
	$('.quiz_request_wrapper input').on("click", function(){
	    $( 'input:checked' ).parent().addClass( 'selected' );
	    $( 'input:not(:checked)' ).parent().removeClass( 'selected' );
	});
}

function advfun(){
	$('.btn_question_area a').on('click', function(){
		$('.adv_box_wrapper').fadeIn();

	});
	$('.btn_question_area2 a').on('click', function(){
		$('.adv_box_wrapper2').fadeIn();

	});

	$('.btn_close').on('click', function(){
		$('.adv_box_wrapper').fadeOut();

	});
}

function popup1(){
	$('.btn_popup1').click(function(e){
		$('.adv_box_wrapper1').fadeIn();
	});
	$('.btn_close1').click(function(e){
		$('.adv_box_wrapper1').fadeOut();
	});
}

function popup2(){
	$('.btn_popup2').click(function(e){
		$('.adv_box_wrapper2').fadeIn();
	});
	$('.btn_close2').click(function(e){
		$('.adv_box_wrapper2').fadeOut();
	});
}

function yesfun(){

    $('.q1').on('click', function(){
		  $('.quiz_degree_wrapper').css('display','');
           $('.adv_box_wrapper').fadeIn();

	});

	$('.q2').on('click', function(){
		   $('.quiz_degree_wrapper').css('display','none');
           $('.adv_box_wrapper').fadeOut();

	});
}

function scoreani(){

	 var sW = $('.score_bar_type2').width();
	 console.log(sW);
	 
	$('.score_bar_type2').animate({
		width: "0"
	},0)
	.animate({
		width: sW +"%"
	}, 500);
}


function positionfun(){
	if( $('.n_quiz_wrapper').length == 1){
		$("html,body").animate({scrollTop:200}, 0);
		return false;
	}
}


	var info_idx = 1;
	function move_tab( idx ){

		if (idx == 5 || idx == 8 || idx == 10) {
			
			if ($(".quiz_tab" + idx).length <= 0) {

				$(".quiz_tab").filter(".on").eq(0).next().eq(0).find("a").get(0).click();
				return;

			}

		}

		$(" .quiz_tab").removeClass("on");
		$(" .quiz_tab" + info_idx ).removeClass( "on" );
		$(" .quiz_tab" + idx ).addClass( "on" );
		$(" .tab_view" + info_idx ).css( "display", "none" );
		$(" .tab_view" + idx ).css( "display", "" );
		
		info_idx = idx;
		
	}

	function move_tab2( idx ){
		
		$(" .tab_view" + info_idx ).css( "display", "none" );
		$(" .tab_view" + idx ).css( "display", "" );
		
		info_idx = idx;
		
	}


