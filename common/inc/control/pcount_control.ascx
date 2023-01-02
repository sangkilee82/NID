<%@ Control Language="C#" AutoEventWireup="true" CodeFile="pcount_control.ascx.cs" Inherits="common_inc_control_date_control" %>


<select title="보기 옵션 선택" class="input_select" style="width:85px; text-align:left;" name="line_count">
	<option value="10" <%= B.Get("line_count") == "10" ? "selected='selected'" : "" %> >10줄</option>
	<option value="20" <%= B.Get("line_count").OrSearch( "", "20" ) ? "selected='selected'" : "" %> >20줄</option>
	<option value="30" <%= B.Get("line_count") == "30" ? "selected='selected'" : "" %> >30줄</option>
  <option value="100" <%= B.Get("line_count") == "100" ? "selected='selected'" : "" %> >100줄</option>
</select>