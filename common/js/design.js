
//1뎁스 오버
$(function () {
  $('.oneDepth > a').hover(function () {
    $(this).css({
      color: '#ff7335',
	  position: 'relative'
    })
  }, function () {
    $(this).css({
		color: '',
		backgroundColor: '',
		position: ''
    })
  })
})

//2뎁스 열기, 닫기
$(function () {
  var dep2 = $('.twoDep li a');

  dep2.click(function () {
    if ($(this).next().css('display') == 'none') {
      dep2.next().hide();
      dep2.find('img').attr('src', '../images/common/bg_twoDep_on.gif');
	  dep2.attr('title','메뉴 펼침');

      $(this).next().show();
      $(this).find('img').attr("src", $(this).find("img").attr("src").replace("_on.gif", ".gif"));
	  $(this).attr('title','메뉴 닫침');
    } else {
      $(this).next().hide();
      $(this).find('img').attr("src", $(this).find("img").attr("src").replace(".gif", "_on.gif"));
	  $(this).attr('title','');
    }
    return false;
  })


})

// family link script
$(function () {
	$('.sl_box .link_tit').click(function(){
		$(".sl_box ul").show();
		$('.sl_box .link_tit').attr('title', '메뉴 펼치기');
	})

	$('.sl_box').mouseleave(function(){
		$(".sl_box ul").hide();
		$('.sl_box .link_tit').attr('title', '메뉴 접기');
	})

	$(".sl_box ul li a").click(function(){
		var txt = $(this).text();
		$('.sl_box .link_tit').text(txt);
		$(".sl_box ul").hide();
		$('.sl_box .link_tit').attr('title', '메뉴 펼치기');
	})
})

// gnb script
$(function(){
	$('.lnbMenu > li').on('click focusin', function(){
		$('.lnbBg').hide();
		$(this).children('.lnbBg').show();
		$('.nav_bg').show();

	})

	$('.lnbMenu').on('mouseleave', function(){
		$('.lnbBg').hide();
		$('.nav_bg').hide();
	})

	$('.oneDepth > a').click(function(){
		$('.lnbBg').hide();
		// $('.oneDepth > a').attr('title','메뉴 펼침');
		// $(this).attr('title','메뉴 닫침');
		$('.nav_bg').hide();
	})




})

// 탭 메뉴
$(function(){
	$('.tabSection li a').click(function(){
		var i = $(this).parent().index();
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');

		$('.tabWrap > div').hide()
		$('.tabWrap > div:eq(' + i + ')').show();
		return false;
	})
})

// 메인 페이드 인 & 아웃
$(function(){
	var sum = 0;
	var rBox = $('.rightBox > div');
	var boxLeng = $('.rightBox > div').length;
	$('.btnPrev').css('display','none');


	$('.slideBtn ul li a').click(function(){
		var i = $(this).parent().index(); // 현재 선택값

		$('.slideBtn ul li').removeClass('on');
		$(this).parent().addClass('on');
		sum = i;
		actionView();

		// 접근성
		$('.slideBtn ul li a').attr('title','선택하기');
		$(this).attr('title','선택됨');
		return false;
	})

	$('.btnPrev').click(function(){
		sum--;
		actionView();
		$('.slideBtn ul li').removeClass('on');
		$('.slideBtn ul li:eq(' + sum + ')').addClass('on');
		return false;
	})

	$('.btnNext').click(function(){
		sum++;
		actionView();
		$('.slideBtn ul li').removeClass('on');
		$('.slideBtn ul li:eq(' + sum + ')').addClass('on');
		return false;
	})

	function actionView(){
		if(sum == "0"){
			$('.btnPrev').css('display', 'none');
			$('.btnNext').css('display', '');
			$('.mainSlogun .color_type').css("color","#f15a21");
		}else if(sum >= "1" && sum < "4"){
			$('.btnPrev').css('display', '');
			$('.btnNext').css('display', '');
			if(sum == "1"){
				$(".mainSlogun .color_type").css("color","#0052a3");
			}else if(sum == "2"){
				$(".mainSlogun .color_type").css("color","#10a020");
			}else if(sum == "3"){
				$(".mainSlogun .color_type").css("color","#cf444e");
			}
		}else{
			$('.btnPrev').css('display', '');
			$('.btnNext').css('display', 'none');
			$(".mainSlogun .color_type").css("color","#594896");
		}
		rBox.stop().fadeOut(500);
		rBox.eq(sum).stop().fadeIn(800);
	}
})

// 치매 News - 센터소식
$(function(){
	var list = $('.newsList li');
	var newsH = list.height();
	var i = 1;
	var lt = list.length;

	$('.btnUp').click(function(){
		if(i<lt){
			list.animate({"bottom":(newsH*i)},300);
			i++;
		}else{
			i=0;
			list.animate({"bottom":(newsH*i)},300);
			i++;
		}
		return false;
	})

	$('.btnDown').click(function(){
		i--;
		if(i==0){
			i=lt-1;
			list.animate({"bottom":(newsH*i)},300);
		}else{
			list.animate({"bottom":(newsH*i)},300);
		}
		return false;
	})

})



// 컨텐츠 공통 탭 메뉴
$(function(){
	$('.tabMenu ul li').click(function(){
		var i = $(this).index();

		$(this).siblings().removeClass('on');
		$(this).addClass('on');

		$('.tabList > .cntList').hide();
		$('.tabList > .cntList:eq('+ i +')').show();

		return false;
	})
})



// 조직도
$(function(){
	$('#group .btnGroup').click(function(){
		var i = $(this).index();
		i = i+1;

		$('.groupMap > div').hide();
		$('.groupMap .group' + i).show();
		return false;
	});

	$('.btnGroup').on('click',function(){

		$('html,body').stop().animate({scrollTop:$(window).height()},500);

	});

})


///////공지사항 게시판 열리기
$(function(){

		//첫번째꺼 진한회색선 $('.table_ul>li').eq(0).addClass('on');

		$('.table_ul>li>a').on('click', function(){

			var thisParent = $(this).parent('li');

			if (thisParent.hasClass('on')) {
				thisParent.removeClass('on');
				$(this).css({"background":"url(../images/info/ico_list_view.png)", 'background-repeat' : 'no-repeat', 'background-position':'97% 50%'});
				thisParent.find('ul').slideUp(200);
				$(this).attr('title', '메뉴 접기');
			}
			else {
				thisParent.addClass('on');
				$(this).css({"background":"url(../images/info/ico_list_view_on.png)", 'background-repeat' : 'no-repeat', 'background-position':'97% 50%'});
				thisParent.siblings().children('a').css({"background":"..//images/info/ico_list_view.png)", 'background-repeat' : 'no-repeat', 'background-position':'97% 50%'});
				thisParent.children('ul').slideDown(200);
				thisParent.siblings('li').children('ul').slideUp(200);
				thisParent.siblings('li').removeClass('on');
				$(this).attr('title', '메뉴 펼치기');
			}
			return false;
		});
});//end_function

///////게시판 리스트 색깔 교차
$(function(){

	$('.view_hope_message>ul>li:nth-child(even)').css('background-color','#f9f9f9');
	$('.view_hope_message>ul>li:nth-child(odd)').css('background-color','#fff');

});


/* 전문가에게 듣는다 - 도서 목록 */
$(function(){
	$('.reviewBtn').click(function(){
			$('.sp_boardCnt').siblings('.sp_boardCnt:visible').slideUp();
			$(this).parent().parent().next(':hidden').slideDown();
			return false;
	})
})

/* 전체 메뉴 */
$(function(){
	$('.btn_total_menu').click(function(){
		$('.opaBlack').show();
		$('.fullMenu').show();
		$('.fMClose a').focus();


	})
	$('.fMClose a').click(function(){
		$('.opaBlack').hide();
		$('.fullMenu').hide();
		$('.btn_total_menu').focus();
	})
	$('.opaBlack').click(function(){
		$('.opaBlack').hide();
		$('.fullMenu').hide();

	})


	$(".oDep li:last a").keydown(function(e){

		if( event.keyCode == 9 ){
			$(".fMClose a").focus();
			e.preventDefault();
		}
	});



})


/* 메인 꿀벌 */
$( document ).ready(function() {
	/*$(function () {
		baloonUp();
		function baloonUp() {
			$('#bee').animate({
				'top': -75
			}, 1000, null, baloonDown);
		}

		function baloonDown() {
			$('#bee').animate({
				'top': -50
			}, 700, null, baloonUp);
		}
	});*/

	var i = 0;
	var img_size = 157;

	$(window).load(function(){
		loadImg();

		function baloonUp() {
			$('#bee').animate({
				'top': -75
			}, 1000, null, baloonDown);

			//sizeUp();
		}

		function baloonDown() {
			$('#bee').animate({
				'top': -20
			}, 800, null, baloonUp);

			//sizeUp();
		}

		function loadImg(){
			$('#bee').animate({
				'top': 30
			}, 500, null, baloonUp);

			sizeUp();
		}

		function sizeUp(){
			/*if(i<=157){
				i=157;
			}*/
			$('#bee img').animate({'width':157},3500);
		}
	})

	$("#bee, #sk_video_layer").click(function () {
	  //$("#youtubediv").lightbox_me();
	  //$("body").addClass("overflow");
	  //$(".body_wrapper").addClass("overflow");
	});

	$(".btn_youtube").click(function () {
	  location.reload();
		//$("#youtubediv").trigger("close");

	});



});

jQuery(function() {
	jQuery("#srolling").srolling({
		data : $("#aaa > p"),  // 노출될 아이템
		auto : false,                    //자동 롤링 true , false
		width : 400,                 // 노출될 아이템 크기
		height : 25,                    // 노출될 아이템 크기
		item_count : 1,         // 이동 될 아이템 수
		cache_count : 1,            // 임시로 불러올 아이템 수
		delay : 700,               // 이동 아이템 딜레이
		delay_frame : 700,      // 아이템 흐르는 속도
		move : 'down',               // 이동 방향 left , right , top , down
		prev : '#p_click'          // < 이동 버튼
	});
});

$(function(){
	/*$('.tabMenu_5dep li').click(function(){
		var idx = $(this).index();
		$('.tabMenu_5dep li').removeClass('on');
		$(this).addClass('on');

		$('.fiveDepCnt').hide();
		$('.fiveDepCnt:eq('+idx+')').show();
	})*/

	$('.demenCntList li a').click(function(){
		$('html, body').animate({scrollTop:$(this.hash).offset().top},500)
		return false;
	})
	$('.demenCntList1 li a').click(function(){
		$('html, body').animate({scrollTop:$(this.hash).offset().top},500)
		return false;
	})
})

/* 모든 갤러리 margin 값 빼기*/
$(function(){
	$('.gallery_ul li:nth-child(4)').css('marginLeft','0px');
	$('.gallery_ul li:nth-child(7)').css('marginLeft','0px');

})