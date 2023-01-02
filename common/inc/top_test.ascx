<%@ Control Language="C#" AutoEventWireup="true" CodeFile="top_test.ascx.cs" Inherits="common_inc_top_test" %>

<!--body_wrapper-->
		<div class="body_wrapper">
			
			<!--배경-->
			<div class="bg_top" style="position:fixed; top:0; left:50%; width:1170px; margin-left:-1504px; background:#eadcd3 url(../images/common/bg1.png) no-repeat right 220px; height:100%;"></div>
			<p class="nav_bg" style="display:none ;width:100%; position:absolute; top:199px;left:0; background:#fff3ef; border-bottom:1px solid #c2cad1; height:160px;"></p>
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
								<li><a href="http://www.mohw.go.kr/" target="_blank" title="새창으로 열기">
									<img src="../images/common/img_bb.gif" alt="보건복지부" /></a></li>
							</ul>


							<ul class="rit_sns_ul fix">
								<li><a href="http://opencast.naver.com/DE986" target="_blank" title="새창으로 열기">
									<img src="../images/common/ico_sns1.gif" alt="네이버 오픈캐스트" /></a></li>
								<li><a href="http://www.youtube.com/user/NIDPARTNER" target="_blank" title="새창으로 열기">
									<img src="../images/common/ico_sns2.gif" alt="유튜브" /></a></li>
								<li><a href="https://twitter.com/nid_info" target="_blank" title="새창으로 열기">
									<img src="../images/common/ico_sns3.gif" alt="트위터" /></a></li>
								<li><a href="https://www.facebook.com/nidinfo" target="_blank" title="새창으로 열기">
									<img src="../images/common/ico_sns4.gif" alt="페이스북" /></a></li>
								<li><a href="https://instagram.com/national_institute_of_dementia/" target="_blank" title="새창으로 열기">
									<img src="../images/common/ico_sns5.gif" alt="인스타그램" /></a></li>
							</ul>

							<ul class="ctn_login_ul fix">
								<li><a href="#">로그인</a></li>
								<!--
										<li><a href="#">로그아웃</a></li>
										<li><a href="#">마이페이지</a></li>
										-->
								<li><a href="#">회원가입</a></li>
								<li><a href="#">English</a></li>
							</ul>

						</div>
						<!--/util_section-->

						<!--header_tit_section-->
						<div class="header_tit_section">
							<h1><a href="main/main.aspx">
								<img src="../images/common/tit_logo.gif" alt="중앙치매센터" /></a></h1>

							<div class="total_search_form">
								<form action="">
									<fieldset>
										<legend>통합검색</legend>
										<div class="">
										<input type="text" style="width: 200px;" placeholder="통합검색" class="input_search_text" title="통합검색" />
											<input type="image" src="../images/common/btn_search.png" alt="검색버튼" />
										</div>
									</fieldset>
								</form>
								
								<!--
								<p class="add_search_text" style="">
									<a href="#">치매에 좋은 운동</a>
									<a href="#">치매진단테스트</a>
								</p>
								-->

							</div>
						</div>
						<!--/header_tit_section-->

						<!--navi_section-->
					<div class="navi_section fix">
						<ul class="first_navi_ul fix lnbMenu">

                            <asp:Repeater runat="server" ID="top_RT" OnItemDataBound="TopBounds" >
                                <ItemTemplate>
							        <li class="oneDepth">
								        <a href="#"><%# Eval( "CODE_NAME" ) %></a>
								        <div class="sec_depth_div lnbBg">
									        <div class="sec_depth1_div fix">
										        <dl class="titleType3">
											        <dt>정보</dt>
											        <dd>중앙치매센터를<br />소개합니다.</dd>
										        </dl>
										        <ul class="twoDep">

                                                    <asp:Literal runat="server" ID="depth2"/>
                                                    <!--
											        <li><a href="#">치매오늘은</a></li>
											        <li><a href="#" class="fix">치매대백과<img src="../images/common/bg_twoDep_on.gif" alt="더 보기" /></a>
												        <ul class="threeDep">
													        <li><a href="#">치매사전</a></li>
													        <li><a href="#">돌봄지침</a></li>
													        <li><a href="#">지원정보</a></li>
													        <li><a href="#">자주하는질문</a></li>
													        <li><a href="#">자료실</a></li>
												        </ul>
											        </li>
											        <li><a href="#">치매시설정보</a></li>
											        <li><a href="#">국가치매관리워크숍</a></li>
											        <li><a href="#">전문가에게 듣는다</a></li>
                                                    -->
										        </ul>
									        </div>
								        </div>
							        </li>
                                </ItemTemplate>
                            </asp:Repeater>
                            						
						</ul>

						<span><a class="btn_total_menu" href="#"><img src="../images/common/btn_total.gif" alt="전체메뉴" /></a></span>
					</div>
					<!--/navi_section-->

					</div>
					<!--/header_section-->

				</div>
				<!--/header_wrapper-->
