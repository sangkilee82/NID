<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/PopupMasterPage.master" AutoEventWireup="true" CodeFile="BS_01_01_080.aspx.cs" Inherits="BS_01_01_080" %>

<asp:Content ID="PageTitle" ContentPlaceHolderID="TitleContentPlaceHolder" runat="Server">
    <asp:Label ID="Label1" runat="server" Text="첨부파일 다운로드" />
</asp:Content>
<asp:Content ID="Body" ContentPlaceHolderID="BodyContentPlaceHolder" runat="Server">
	<h2>첨부파일 다운로드</h2>
	<script type="text/javascript" src="../../BS_JS/Custom.js"></script>
	<script type="text/javascript">

	</script>
<style>
.board_write_ver01 thead th{border:1px solid #e4e5e7; border-top:2px solid #1d6bc4; padding:5px;}
.board_write_ver01 tbody th{border:1px solid #e4e5e7; padding:5px;}
.board_write_ver01 tbody td{border:1px solid #e4e5e7; border-left:0px; padding:5px 5px 5px 10px;}
</style>
	<div class="board_write_ver01" style="clear:both; margint-top:35px;">
		<table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
			<colgroup>
				<col width="10%" />
				<col width="90%" />
			</colgroup>
			<thead>
				<tr>
					<th>번호</th>
					<th>파일명</th>
				</tr>
			</thead>
			<tbody>
			<asp:Repeater runat="server" ID="file_list">
			<ItemTemplate>
			<tr>
				<th class="">
					<span class="cor_red"><%# i++ %></span>
				</th>
				<td class="">
					<a href="./download.aspx?path=<%# Eval( "SERVR_FILE_NM" ) %>&filename=<%# Eval( "FILE_NM" ).AsText().Replace("+", " ") %>" > <%#Eval( "FILE_NM" ) %> </a>
				</td>
			</tr>

			</ItemTemplate>
			</asp:Repeater>                

			</tbody>
		</table>
	</div>

</asp:Content>

