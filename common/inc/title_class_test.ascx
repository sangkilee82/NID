<%@ Control Language="C#" AutoEventWireup="true" CodeFile="title_class_test.ascx.cs" Inherits="common_inc_title_class_test" %>

<!-- 레이아웃 시작 -->

<!-- title -->
<div class="myEduWrap">

	<!-- 헤더 시작 -->
	<div class="myEduTop">
		<h1 class="eduTit">
			<a href="edu_classroom.aspx?code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>">
				<%= B.StrDic["YEAR_DD"] %> <%= B.StrDic["CODE_NAME"] %>
			</a>
			<span>
				<% if (B.StrDic["EDUCATION_SDATE"].ConDate( "yyyyMMdd" ).ConInt() > DateTime.Now.ToString( "yyyyMMdd" ).ConInt()) { %>
				<img src="../images/mypage/ico_sch.gif" alt="수강예정" />
				<%} else if (B.StrDic["EDUCATION_SDATE"].ConDate( "yyyyMMdd" ).ConInt() <= DateTime.Now.ToString( "yyyyMMdd" ).ConInt() && B.StrDic["EDUCATION_EDATE"].ConDate( "yyyyMMdd" ).ConInt() >= DateTime.Now.ToString( "yyyyMMdd" ).ConInt()) { %>
				<img src="../images/mypage/ico_ing.gif" alt="수강중" />
				<%} else if (B.StrDic["EDUCATION_EDATE"].ConDate( "yyyyMMdd" ).ConInt() < DateTime.Now.ToString( "yyyyMMdd" ).ConInt()) { %>
				<img src="../images/mypage/ico_end.gif" alt="수강완료" />
				<%} %>
			</span>
			<a href="javascript:self.close();" class="btnCloseEdu">
				<img src="../images/study/btn_close.png" alt="창 닫기" /></a>
		</h1>

		<div class="myEduInfo">
			<ul class="fix">
				<li>
					<dl class="fix">
						<!--
						<dt>교육명 :</dt>
						-->
						<dd><%= B.StrDic["TITLE"] %></dd>
					</dl>
				</li>
				<li>
					<dl class="fix">
						<dt>교육기관 :</dt>
						<dd><%= B.StrDic["EDUCATION_AGENCY"] %></dd>
					</dl>
				</li>
				<li>
					<dl class="fix">
						<dt>교육시수 :</dt>
						<dd><%= B.StrDic["EDUCATION_TIME"] %> 시간</dd>
					</dl>
				</li>
				<li>
					<dl class="fix">
						<dt>담당자 :</dt>
						<dd>
							<%= B.StrDic["FIRST_TEACHER"].ConString("등록된 담당자가 없습니다.") %>
							<% if (B.StrDic["FIRST_PHONE"].IsEmpty() == false) { %> 
								 ( ☎ <%= B.StrDic["FIRST_PHONE"] %> )
								<%} %>
						</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
	<!-- //title -->
	<!-- 헤더 끝 -->