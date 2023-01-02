<%@ Control Language="C#" AutoEventWireup="true" CodeFile="left.ascx.cs" Inherits="zadmin_common_inc_left" %>

<div class="contents_wrapper">

	<!--contents_section-->
	<div class="contents_section fix">

		<!--lft_navi_section-->
		<div class="lft_navi_section">
			<h3 class="ico_h3_1"><%=B.StrDic[ "CODE_NAME_DEP1" ] %></h3>
			<ul class="lft_navi_ul">
				<asp:Repeater ID="left_depth2_RT" OnItemDataBound="LeftDepth2Bound" runat="server">
					<ItemTemplate>

						<li class="" id="depth2_item" runat="server">
							<a href="<%# ParseUrl( Eval( "URL" ).ConString(), Eval( "DEPTH3_URL" ).ConString(), Eval("OPEN_YN").ConString() ) %>" <%# Eval("OPEN_YN").ConString() == "Y" ? "target='_blank'" : "" %>>
								<%# Eval("CODE_NAME") %>
							</a>
							<ul>

								<asp:Repeater ID="left_depth3_RT" OnItemDataBound="LeftDepth3Bound" runat="server">
									<ItemTemplate>

										<li class="" id="depth3_item" runat="server">
											<a href="<%# "../" +Eval("URL") %>"><%# Eval("CODE_NAME").ConString() %></a>
										</li>

									</ItemTemplate>
								</asp:Repeater>

							</ul>
						</li>
					</ItemTemplate>
				</asp:Repeater>

			</ul>
		</div>
