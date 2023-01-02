<%@ Control Language="C#" AutoEventWireup="true" CodeFile="day_control.ascx.cs" Inherits="common_inc_control_date_control" %>

<p style="border: 1px solid #bec0c4; background: #f2f6fa; border-radius: 3px !important; padding-right: 7px;" class="in_block">
  <input type="text" class="input_text1" style="width: 105px;" readonly="readonly" id="s_date" name="s_date" value="<%=B.Get("s_date").ConString( DateTime.Now.ConDate() ) %>" onclick="calendar(event, 's_date', 'yyyy-mm-dd')" />
  <a href="#">
    <img src="../../images/admin/ico_cal.gif" alt="" onclick="calendar(event, 's_date', 'yyyy-mm-dd')" />
  </a>
</p>
<p style="padding-left: 10px;" class="in_block">
  <a class="blue_btns" href="javascript:day_change( '-1_d', '<%=B.Get("s_date").ConString( DateTime.Now.ConDate() ) %>' );">이전 일</a>
  <a class="blue_btns" href="javascript:day_change( '0_d', '<%=B.Get("s_date").ConString( DateTime.Now.ConDate() ) %>' );">당일</a>                      
  <a class="blue_btns" href="javascript:day_change( '1_d', '<%=B.Get("s_date").ConString( DateTime.Now.ConDate() ) %>' );">다음 일</a>
</p>