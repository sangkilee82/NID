<%@ Control Language="C#" AutoEventWireup="true" CodeFile="footer.ascx.cs" Inherits="common_inc_footer" %>
<hr />

<!--footer_wrapper-->
<div class="footer_wrapper">

	<div class="footer_section fix">
		<p class="lft_footer">
			<img src="../images/common/ico_footer.gif" alt="중앙치매센터" /></p>

		<div class="ctn_footer">
			<ul class="fix">
				<li><a target="_blank" href="https://www.nmc.or.kr/nmc/main/contents.do?menuNo=200414" style="font-weight:bold; font-size:13px;color:red;text-decoration:underline;" >개인정보처리방침</a></li>
				<li><a target="_parent" href="../other/agreement.aspx">이용약관</a></li>
				<li><a target="_parent" href="../other/sitemap.aspx">사이트맵</a></li>
			</ul>
			<address>
				04564 서울시 중구 을지로 245 (을지로 6가 18-79)  국립중앙의료원 중앙치매센터
				<br />
				Tel.1666-0921  Fax.02-6260-3106 (업무시간 08:30~17:30)<br />
				Copyright (c) 중앙치매센터 all rights reserved
			</address>
		</div>

		<div class="sl_box" style="height: 22px;">
			<strong>광역치매센터 바로가기</strong>
			<ul style="display: none;">
				<li><a class="option" target="_blank" href="http://seoul.nid.or.kr/home/main/main.aspx">서울특별시</a></li>
				<li><a class="option" target="_blank" href="http://busan.nid.or.kr/home/main/main.aspx">부산광역시</a></li>
				<li><a class="option" target="_blank" href="http://daegu.nid.or.kr/home/main/main.aspx">대구광역시</a></li>
				<li><a class="option" target="_blank" href="http://incheon.nid.or.kr/home/main/main.aspx">인천광역시</a></li>
				<li><a class="option" target="_blank" href="https://gwangju.nid.or.kr/home/main/main.aspx">광주광역시</a></li>
				<li><a class="option" target="_blank" href="http://daejeon.nid.or.kr/home/main/main.aspx">대전광역시</a></li>
				<li><a class="option" target="_blank" href="http://ulsan.nid.or.kr/home/main/main.aspx">울산광역시</a></li>
				<li><a class="option" target="_blank" href="http://sejong.nid.or.kr/home/main/main.aspx">세종특별자치시</a></li>
				<li><a class="option" target="_blank" href="http://gyeonggi.nid.or.kr/home/main/main.aspx">경기도</a></li>
				<li><a class="option" target="_blank" href="http://gangwon.nid.or.kr/home/main/main.aspx">강원도</a></li>
				<li><a class="option" target="_blank" href="http://chungbuk.nid.or.kr/home/main/main.aspx">충청북도</a></li>
				<li><a class="option" target="_blank" href="http://chungnam.nid.or.kr/home/main/main.aspx">충청남도</a></li>
				<li><a class="option" target="_blank" href="http://jeonbuk.nid.or.kr/home/main/main.aspx">전라북도</a></li>
				<li><a class="option" target="_blank" href="http://jeonnam.nid.or.kr/home/main/main.aspx">전라남도</a></li>
				<li><a class="option" target="_blank" href="http://gyeongbuk.nid.or.kr/home/main/main.aspx">경상북도</a></li>
				<li><a class="option" target="_blank" href="https://gyeongnam.nid.or.kr/home/main/main.aspx">경상남도</a></li>
				<li><a class="option" target="_blank" href="http://jeju.nid.or.kr/home/main/main.aspx">제주특별자치도</a></li>
			</ul>
		</div>

	</div>
</div>
<!--/footer_wrapper-->

</div>
						<!--/rit_contents_section-->

</div>
					<!--/contents_section-->
</div>
				<!--/contents_wrapper-->

</div>
			<!--/common_wrapper-->

</div>
		<!--/body_wrapper-->
<div class="opaBlack"></div>

<!-- 전체 메뉴 -->
<div class="fullMenu">
	<div class="fMClose">
		<a href="#">CLOSE</a>
	</div>
	<div>
		<div class="fMWrap_top"></div>
		<div class="fMWrap">
			<ul class="oDep fix">

				<asp:Repeater runat="server" ID="total_RT" OnItemDataBound="TopBounds">
					<ItemTemplate>

						<li <%# Container.ItemIndex % 3 == 0 ? "class='bdl_x' style='clear:both;' " : "" %>><strong class="yellowBg"><%# Eval("CODE_NAME") %></strong>
							<ul class="tDep">
								<asp:Literal runat="server" ID="depth2" />
							</ul>
						</li>

					</ItemTemplate>
				</asp:Repeater>

			</ul>
		</div>
		<div class="fMWrap_btm"></div>
	</div>
</div>
<!-- //전체 메뉴 -->

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-162009294-1"></script>
<script type="text/javascript">
	function menu_H() {
		var h = $('.fullMenu').height();
		var sum = 0;
		sum = h / 2;
		$('.fullMenu').css('marginTop', -sum);
	}
	menu_H();

	var iframe_mode = "<%=B.Get( "iframe_mode" ).ConString( "N" ) %>";
	var print_mode = "<%=B.Get( "print_mode" ).ConString( "N" ) %>";
	if (iframe_mode == "Y") {

		var html = $(".cntWrap").html();
		$("body").addClass("type2");
		$("body").empty();
		$("body").append(html);

	} else if (print_mode == "Y") {



	}
	
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-162009294-1');

</script>
<!--
<script type="text/javascript" src="../common/js/stat.js"></script>
-->
</body>
</html>