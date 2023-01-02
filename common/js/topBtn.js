$(document).ready( function(){
			 var quick_menu = $('.topUpBtn');
			 var quick_top = 350;
			 quick_menu.css('top', $(window).height());
			 quick_menu.animate({"top" : $(document).scrollTop() + quick_top + "px"}, 500);
			 $(window).scroll(function(){
							quick_menu.stop();
							quick_menu.animate({"top" : $(document).scrollTop() + quick_top + "px"}, 1000);
			 })

			 $(".topUpBtn a").click(function(){
					$("html,body").animate({scrollTop:0}, 500);
					return false;
				});
});