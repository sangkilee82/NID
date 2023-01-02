<%@ Control Language="C#" AutoEventWireup="true" CodeFile="jajo_left.ascx.cs" Inherits="common_inc_jajo_left" %>

</head>

<body style="min-width:auto;">

	<p class="skip">
		<a href="#content">본문으로 바로가기</a>
		<a href="#tab">주메뉴로 바로가기</a>
	</p>

	<div class="jajo_wrap">
		<div>

			<!-- jajo_header -->
			<div class="jajo_header fix">
				<div class="jajo_tit">
					<h1>
						<strong>
							<%= B.StrDic["JAJO_TITLE"] %>
							<img src="../images/jajo/bg_bee.png" alt="단비 사진" class="pop_bee" />
						</strong>
						<div>
							<%= B.StrDic["JAJO_INTRO"] %>
							
						</div>
					</h1>
				</div>
			</div>
			<!-- //jajo_header -->

			<!-- jajo_container -->
			<div class="jajo_container fix">
				<!-- nave_menu -->
				<div class="nave_menu">
					<!-- jajo_tab -->
					<div class="jajo_tab" id="tab">
						<ul class="fix">
							<li <%= curUrl.IndexOf("/jajo_pop_main") != -1 ? "class='on'" : "" %> ><a href="../support/jajo_pop_main.aspx?seq=<% =B.Get("seq") %>">소개</a></li>
															
              <asp:literal id="menu_li1" runat="server"></asp:literal>
              <asp:literal id="menu_li2" runat="server"></asp:literal>
              <asp:literal id="menu_li3" runat="server"></asp:literal>
              <asp:literal id="menu_li4" runat="server"></asp:literal>
              <asp:literal id="menu_li5" runat="server"></asp:literal>
              <asp:literal id="menu_li6" runat="server"></asp:literal>
							<% if( B.StrDic["REG_NEW_YN"].ConString("").Contains("Y") ){ %>
							<li <%= curUrl.IndexOf("/jajo_pop_apl") != -1 ? "class='on'" : "" %> ><a style="line-height:20px !important; letter-spacing:-1px; font-size:14px;" href="../support/jajo_pop_apl.aspx?seq=<%= B.Get("seq") %>">온라인 자조모임<br />가입신청</a></li>
							<% } %>
						</ul>
					</div>
					<!-- //jajo_tab -->

					<div class="call_box">
						<dl>
							<dt>치매상담콜센터</dt>
							<dd>1899-9988</dd>
						</dl>
					</div>
				</div>
				<!-- //nave_menu -->
