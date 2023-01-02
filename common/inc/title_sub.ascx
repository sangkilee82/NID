<%@ Control Language="C#" AutoEventWireup="true" CodeFile="title_sub.ascx.cs" Inherits="common_inc_title_sub" %>

<!--rit_contents_section-->
        <div class="rit_contents_section">

            <!--location_section-->
            <div class="location_section">
                <div class="top_location_section">
                    <h4><%=B.StrDic[ "NAME" ] %></h4>

                    <ul class="add_util_ul fix">
                        <li><a href="#">
                            <img src="../images/common/ico_star_off.gif" alt="즐겨찾기" /></a></li>
                        <li><a href="#">
                            <img src="../images/common/ico_shar.gif" alt="공유하기" /></a></li>
                        <li><a href="#">
                            <img src="../images/common/ico_print.gif" alt="프린트하기" /></a></li>
                    </ul>
                </div>

                <p class="bottom_location_section">
                    <em>
                        <img src="../images/common/ico_home.gif" alt="HOME" /></em>
                    <span class="sec_span"><%=B.StrDic[ "DPETH1_NAME" ] %></span>
                    <span><%=B.StrDic[ "NAME" ] %></span>
                </p>
            </div>
            <!--/location_section-->