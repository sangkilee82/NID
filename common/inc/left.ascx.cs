using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class zadmin_common_inc_left : UserControlBase {

	protected void Page_Load(object sender, EventArgs e) {

		if (!Page.IsPostBack) {

			LeftTop();

			LeftList();

		} else {

			LeftTop();

			LeftList();

		}

	}

	private void LeftTop() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

			conn.Open(ref P.cmd);

			try {

				if(Session["matchCode"].ConString().IsEmpty() == false) {

					//1단계 코드명을 불러온다.
					P.query = " select CODE_NAME " +
										" from TB_USER_CODE with( nolock ) " +
										" where DEPTH = 1 and substring( CODE, 1, 3 ) = @CODE and REAL_YN = 'Y' ";
					P.Cmd_Query();
					P.Cmd_Parameters_AddWithValue( "@CODE", Session["matchCode"].ConString().Substring( 0, 3 ) );
					B.StrDic["CODE_NAME_DEP1"] = P.Cmd_ExecuteScalar().ConString();

				}

			} catch(Exception ex) {

			}			

			conn.Close(ref P.cmd);

		}

	}

	private void LeftList() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		string no_code = string.Empty;
		if (B.User.ID.ConString().IsEmpty() == false) {
			no_code = " and CODE not in ( '009001000', '009002000', '009005000', '009006000' )";
		}

    //if (Request.UserHostAddress == "1.214.45.90") {
    //  Response.Write( Session["matchCode"].ConString().Substring( 0, 3 ) );
    //  Response.End();
    //}

    using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

        conn.Open( ref P.cmd );

        //매치코드를 이용하여, 2단계 코드를 불러온다.
        P.query = " select CODE, CODE_NAME, URL, OPEN_YN, " +
                  "        ( select top(1) URL " +
                  "          from TB_USER_CODE with( nolock ) " +
                  "          where DEPTH = 3 and URL is not null " +
                  "                and substring(CODE, 1, 6) = substring(A.CODE, 1, 6) " +
                  "                and REAL_YN = 'Y' " +
                  "          order by NUM asc ) as DEPTH3_URL " +
                  "	from TB_USER_CODE A with( nolock ) " +
                  " where DEPTH = 2 " + no_code +
                  "       and substring(CODE, 1, 3) = @CODE and REAL_YN = 'Y' " +
                  " order by NUM asc ";
        P.Cmd_Query();
        P.Cmd_Parameters_AddWithValue( "@CODE", Session["matchCode"].ConString().Substring( 0, 3 ) );
        P.dr = P.Cmd_ExecuteReader();
        if (P.dr.HasRows) {

          left_depth2_RT.DataSource = P.dr;
          left_depth2_RT.DataBind();

        }

        P.dr.CloseDispose();
        conn.Close( ref P.cmd );


    }

	}

	protected string ParseUrl(string url, string depth3_url, string open_yn) {

		if (open_yn == "P") {
			return "javascript:user_popup('" + url + "')";
		}

		if (url.IsEmpty() == true || url == "#") {
			url = depth3_url;
		}

		if (open_yn == "Y") {

			return GetSSO_URL(url); //left관련 링크 변경

		} else {

			return GetSSO_URL("/" + url);

		}


	}

	protected static string GetSSO_URL(string url) {

		string uid = HttpContext.Current.Session["MEM_ID"].ConString();

		// 치매파트너일때 SSO 연동
		if (url.IndexOf("partner.nid.or.kr") != -1) {

			if (uid.IsEmpty() == false) {

				AESCipher aes_cipher = new AESCipher();
				byte[] arr = System.Text.Encoding.Default.GetBytes(aes_cipher.Encrypt(uid));
				string enc_id = Convert.ToBase64String(arr);

				url = "http://partner.nid.or.kr/member/sso_login.aspx?sso_id=" + enc_id + "&url=" + url;

			}

		}

		return url;

	}

	protected void LeftDepth2Bound(object sender, RepeaterItemEventArgs e) {

		if (e.Item.ItemType == ListItemType.AlternatingItem || e.Item.ItemType == ListItemType.Item) {

			PJHCmdWrapper P = new PJHCmdWrapper();

			//## UserControl Init
			Repeater c_rt = (Repeater)e.Item.FindControl("left_depth3_RT");

			//## RepeatBind
			string code = B.RepeatBind(e, "CODE").ConString();  //2단계 코드
			string url = B.RepeatBind(e, "URL").ConString();    //URL
			string open_yn = B.RepeatBind(e, "OPEN_YN").ConString();    //URL
			string no_code = string.Empty;

			//URL이 존재한다면,
			if (url.IsEmpty() == false || url == "#") {

				//매치코드와 2단계 코드가 일치하다면,
				if (code.Substring(0, 6) == Session["matchCode"].ConString().Substring(0, 6)) {

					//css class 'on'처리를 한다.
					((HtmlGenericControl)e.Item.FindControl("depth2_item")).Attributes["class"] = "on";

					using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

						conn.Open(ref P.cmd);

						//2단계코드와 일치하는 3단계 리스트를 불러온다.
						P.query = " select CODE, CODE_NAME, URL, OPEN_YN " +
										  " from TB_USER_CODE with( nolock ) " +
										  " where DEPTH = 3 and URL is not null and REAL_YN = 'Y'" +
										  "       and substring( CODE, 1, 6 ) = @CODE " +
										  "       and CODE not in ('" + P.Cmd_Parameters_Get_In_Query(B.AdminUser.NO_CODE_ARR) + "') " +
										  " order by NUM asc ";
						P.Cmd_Query();
						P.Cmd_Parameters_AddWithValue("@CODE", code.Substring(0, 6));
						P.dr = P.Cmd_ExecuteReader();
						if (P.dr.HasRows) {

							c_rt.DataSource = P.dr;
							c_rt.DataBind();

						}

						P.dr.CloseDispose();
						conn.Close(ref P.cmd);

					}

				}

			} else {

				e.Item.Visible = false;

			}

		}

	}

	protected void LeftDepth3Bound(object sender, RepeaterItemEventArgs e) {

		if (e.Item.ItemType == ListItemType.AlternatingItem || e.Item.ItemType == ListItemType.Item) {

			//## RepeatBind
			string code = B.RepeatBind(e, "CODE").ConString();  //3단계 코드

			if (B.Get("seq").ConString().IsEmpty() == false && B.Get("seq").ConString() == code) {

				//css class 'on'처리를 한다.
				((HtmlGenericControl)e.Item.FindControl("depth3_item")).Attributes["class"] = "on";

			} else if (code == Session["matchCode"].ConString() && B.Get("seq").ConString().IsEmpty() == true) {

				((HtmlGenericControl)e.Item.FindControl("depth3_item")).Attributes["class"] = "on";


			}

		}

	}

}