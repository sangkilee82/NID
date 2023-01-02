<%@ Control Language="C#" AutoEventWireup="true" CodeFile="date_control.ascx.cs" Inherits="common_inc_control_date_control" %>

<input type="hidden" id="date_term" name="date_term" value="<%=B.Get( "date_term" ) %>" />

<p style="border: 1px solid #bec0c4; background:#f2f6fa; border-radius: 3px !important; padding-right:7px;" class="in_block">
  <input type="text" class="input_text1 s_date" style="width:130px;" name="s_date" id="s_date" value="<%=B.Get( "s_date" ) %>" onclick="calendar(event, 's_date', 'yyyy-mm-dd')" />
  <a href="#none" onclick="calendar(event, 's_date', 'yyyy-mm-dd')"><img src="../../images/admin/ico_cal.gif" alt="" /></a>
</p>
~
<p style="border: 1px solid #bec0c4; background:#f2f6fa; border-radius: 3px !important; padding-right:7px;" class="in_block">
  <input type="text" class="input_text1 e_date" style="width:130px;" name="e_date" id="e_date" value="<%=B.Get( "e_date" ) %>" onclick="calendar(event, 'e_date', 'yyyy-mm-dd')" />
  <a href="#none" onclick="calendar(event, 'e_date', 'yyyy-mm-dd')"><img src="../../images/admin/ico_cal.gif" alt="" /></a>
</p>
																		
<p style="padding-left:10px;" class="in_block">
	<a class="0_d blue_btns <%=B.Get( "date_term" ) == "0_d" ? "on_blue_btns" : "" %>" href="#none" onclick="date_term_chage(this, '0_d')">당일</a>
	<a class="1_w blue_btns <%=B.Get( "date_term" ) == "1_w" ? "on_blue_btns" : "" %>" href="#none" onclick="date_term_chage(this, '1_w')">1주</a>
	<a class="2_w blue_btns <%=B.Get( "date_term" ) == "2_w" ? "on_blue_btns" : "" %>" href="#none" onclick="date_term_chage(this, '2_w')">2주</a>
	<a class="1_M blue_btns <%=B.Get( "date_term" ) == "1_M" ? "on_blue_btns" : "" %>" href="#none" onclick="date_term_chage(this, '1_M')">1개월</a>
	<a class="3_M blue_btns <%=B.Get( "date_term" ) == "3_M" ? "on_blue_btns" : "" %>" href="#none" onclick="date_term_chage(this, '3_M')">3개월</a>
</p>