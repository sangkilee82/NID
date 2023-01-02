<%@ Control Language="C#" AutoEventWireup="true" CodeFile="title.ascx.cs" Inherits="janid_test_common_inc_title" %>


<!--rit_contents_section-->
<div class="rit_contents_section">

	<!--location_section-->
	<div class="location_section" style="position: relative;">
		<div class="top_location_section">
			<h4><%=B.StrDic[ "CODE_NAME" ].ConString() == "" ? "" : B.StrDic["CODE_NAME"].Replace("<br/>","") %></h4>
		</div>

		<ul class="add_util_ul fix" style="display: none; position: absolute; top: -15px; right: 1px;">			
			<li></li>
		</ul>

		<p class="bottom_location_section">
			<em>
				<img src="../images/common/ico_home.gif" alt="HOME" /></em>
			<span class="sec_span"><%=B.StrDic[ "DEP_CODE_NAME" ].ConString() == "" ? "" : B.StrDic["DEP_CODE_NAME"].Replace("<br/>","") %></span>
			<span><%=B.StrDic[ "CODE_NAME" ].ConString() == "" ? "" : B.StrDic["CODE_NAME"].Replace("<br/>","") %></span>
			<a href="javascript:page_print();" style="display: inline-block; margin-left: 5px; *zoom: 1; *display: inline; border-radius: 3px; border: 1px solid #ddd; padding: 6px 5px; vertical-align: 1px;">
				<img src="../images/common/ico_print.png" alt="프린트하기" /></a>
		</p>
	</div>
	<!--/location_section-->
