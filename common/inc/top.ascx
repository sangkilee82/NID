<%@ Control Language="C#" AutoEventWireup="true" CodeFile="top.ascx.cs" Inherits="zadmin_common_inc_top" %>

<!--body_wrapper-->
<div class="body_wrapper">

  

  

	<!--배경-->
	<div class="bg_top" style="position: fixed; top: 0; left: 50%; width: 1170px; border-right: 1px solid #ddd; margin-left: -1505px; background: #f8efea url(../images/common/bg1.png) no-repeat 920px 600px; height: 100%; z-index: 2;"></div>
	<div class="bg_top1" style="position: fixed; top: 0; right: 0; width: 100%; margin-right: 0; background: #fff; height: 100%;"></div>
	<p class="nav_bg" style="display: none; width: 100%; position: absolute; top: 199px; left: 0; background: #fff3ef; border-bottom: 1px solid #c2cad1; height: 160px;"></p>
	<!--/배경-->

	<!--common_wrapper-->
	<div class="common_wrapper sub_bg">

		<!--header_wrapper-->
		<div class="header_wrapper">

			<!--header_section-->
			<div class="header_section">

				<!--util_section-->
				<div class="util_section fix">

					<ul class="lft_spon_ul fix">
						<li><a href="http://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer" title="새창으로 열기">
							<img src="../images/common/img_bb.gif" alt="보건복지부" /></a></li>
								<li style="width:135px;"><a href="https://www.nmc.or.kr/nmc/main/main.do" target="_blank" rel="noopener noreferrer" title="새창으로 열기" >
							<img src="../images/img_nmc.png" alt="국립중앙의료원" /></a></li>
					</ul>

					<ul class="rit_sns_ul fix">
						<li><a href="https://www.facebook.com/nidinfo" target="_blank" rel="noopener noreferrer" title="새창으로 열기">
							<img src="../images/common/ico_sns4.gif" alt="페이스북" /></a></li>
						<li><a href="http://www.youtube.com/user/NIDPARTNER" target="_blank" rel="noopener noreferrer" title="새창으로 열기">
							<img src="../images/common/ico_sns2.gif" alt="유튜브" /></a></li>
						<li><a href="https://twitter.com/nid_info" target="_blank" rel="noopener noreferrer" title="새창으로 열기">
							<img src="../images/common/ico_sns3.gif" alt="트위터" /></a></li>
						<li><a href="https://www.instagram.com/nid_kr/" target="_blank" rel="noopener noreferrer" title="새창으로 열기">
							<img src="../images/common/ico_sns5.gif" alt="인스타그램" /></a></li>						
					</ul>

					<ul class="ctn_login_ul fix">
						<%if (B.User.ID.ConString().IsEmpty() == true || Session["MEM_ID"].ConString().IsEmpty() == true) { %>

							<li><a target="_parent" href="../member/login.aspx">로그인</a></li>
							<li><a target="_parent" href="../member/join_step.aspx">회원가입</a></li>

						<%} else { %>

							<li><a target="_parent" href="../member/logout.aspx">로그아웃</a></li>
							<li><a target="_parent" href="../mypage/mypage.aspx">마이페이지</a></li>

						<%} %>
						<li><a href="javascript:alert('준비중입니다.');">English</a></li>
					</ul>

				</div>
				<!--/util_section-->

				<!--header_tit_section-->
				<div class="header_tit_section">
					<h1><a target="_parent" href="../main/main.aspx">
						<img src="../images/common/tit_logo.gif" alt="중앙치매센터" /></a></h1>

					<!-- 통합검색 -->
					<div class="total_search_form">
						<form action="../../search/search.aspx" onsubmit="return check_form( this );" target="_parent">
							<fieldset>
								<legend>통합검색</legend>
								<div class="">
									<input type="text" style="width: 200px;" name="search" placeholder="통합검색" class="input_search_text" title="통합검색" />
									<input type="image" src="../images/common/btn_search.png" alt="검색버튼" />
								</div>
							</fieldset>
						</form>
					</div>
					<!-- /통합검색 -->
				</div>
				<!--/header_tit_section-->

				<!--navi_section-->
				<div class="navi_section fix">
					<ul class="first_navi_ul fix lnbMenu">

						<asp:Repeater runat="server" ID="top_RT" OnItemDataBound="TopBounds">
							<ItemTemplate>
								<li class="oneDepth" id="depth1_item" runat="server">
									<a href="javascript:void(0)" <asp:Literal runat="server" ID="edu_html"/> > <%# Eval( "CODE_NAME" ).ConString().Replace("<br/>","") %></a>
									<div class="sec_depth_div lnbBg">
										<div class="sec_depth1_div fix">
											<dl class="titleType3">
												<dt><%# Eval( "CODE_NAME" ).ConString().Replace("<br/>","") %></dt>
												<dd>중앙치매센터를<br />
													소개합니다.</dd>
											</dl>

											<ul class="twoDep">
												<asp:Literal runat="server" ID="depth2" />
											</ul>

										</div>
									</div>
								</li>
							</ItemTemplate>
						</asp:Repeater>

					</ul>

					<span><a class="btn_total_menu" href="javascript:void(0)">
						<img src="../images/common/btn_total.gif" alt="전체메뉴" /></a></span>
				</div>
				<!--/navi_section-->
        <script type="text/javascript">
   
  </script>
			</div>
			<!--/header_section-->

		</div>
		<!--/header_wrapper-->

		<div id="light" class="white_content">사이트맵 <a href="javascript:void(0)" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">닫기</a></div>
		<div id="fade" class="black_overlay"></div>
