<%@ Control Language="C#" AutoEventWireup="true" CodeFile="left_class.ascx.cs" Inherits="common_inc_left_class" %>

<!-- 컨텐츠 시작 -->

<!-- left -->
<div class="myEduContainer">
	<h2 class="skip">컨텐츠</h2>

	<div class="myEduMain fix">

		<!-- 좌측 메뉴 시작 -->
		<div class="eduNav" style="">
			<div>
				<ul>
					<li <%= B.Get("tab") == "9" ? "class='on'" : "" %>><a style="background-color:#97be31; color:#fff; " href="edu_mov_new.aspx?tab=9&code_no=<%= B.Get("code_no") %>&subject_no=<%= B.Get("subject_no")%>&online_yn=<%= B.Get("online_yn") %>">학습하기</a></li>
					<li <%= B.Get( "tab" ) == "1" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=1&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">교육공지</a></li>
					<li <%= B.Get( "tab" ) == "2" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=2&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">강의계획서</a></li>					
					<li <%= B.Get( "tab" ) == "3" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=3&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">학습자료실</a></li>
					<li <%= B.Get( "tab" ) == "4" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=4&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">자유게시판</a></li>
					<li <%= B.Get( "tab" ) == "5" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=5&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">온라인설문</a></li>
          <li <%= B.Get( "tab" ) == "12" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=12&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">최종테스트</a></li>
					<li <%= B.Get( "tab" ) == "8" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=8&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" )%>&online_yn=<%= B.Get("online_yn")%>">학습현황</a></li>									
					<%-- 210811 제거
          <li <%= B.Get( "tab" ) == "6" ? "class='on'" : "" %>><a href="edu_class_list.aspx?tab=6&code_no=<%= B.Get( "code_no" ) %>&subject_no=<%= B.Get( "subject_no" ) %>&online_yn=<%= B.Get("online_yn")%>">만족도조사</a></li>
            --%>
				</ul>
			</div>
		</div>
		<!-- 좌측 메뉴 끝 -->
		<!-- //left -->
