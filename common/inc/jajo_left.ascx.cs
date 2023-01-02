using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class common_inc_jajo_left :UserControlBase {

	internal string curUrl = string.Empty;

	protected void Page_Load( object sender, EventArgs e ) {

		//타이틀 정보 조회
		ReadTitleInfo();

	}

	/// <summary>
	/// 타이틀 정보 조회
	/// </summary>
	private void ReadTitleInfo() {

		//현재주소
		curUrl = HttpContext.Current.Request.Url.AbsoluteUri;

		string seq = B.Get( "seq" ).Trim();

		string query = string.Empty;
		SqlCommand cmd = null;

		using(SqlConnection conn = new SqlConnection(Base.commDBString)) {

			conn.Open( ref cmd );

			query = " select JAJO_TITLE, REG_NEW_YN ,JAJO_INTRO " +
				      " from TB_JAJO_GROUP_TEST where NO = @NO ";
			cmd.Query( query );
			cmd.Parameters.AddWithValue( "@NO", seq );
			cmd.ExecuteReader().CloneStringDic(B.StrDic).CloseDispose();

			conn.Close( ref cmd );

      string html1 = string.Empty;
      string html2 = string.Empty;
      string html3 = string.Empty;
      string html4 = string.Empty;
      string html5 = string.Empty;
      string html6 = string.Empty;
      string msg = string.Empty;

      int return_join = Join_Member( B.User.ID.Trim() );

      if (return_join == 0) {
        msg =  "자조모임 맴버가 아닙니다. 운영기관에 연락해주세요.";
      }

      if (B.User.ID.IsEmpty() == true) {

        msg = "회원으로 로그인 후, 사용하실 수 있습니다.";

      }


      if (return_join == 0 || B.User.ID.IsEmpty() == true ) {

        html1 = "<li " + ( curUrl.IndexOf( "/jajo_pop_noti" ) != -1 ? "class='on'" : "" ) + " ><a href='javascript:void(0)' onclick=\"alert('" + msg + "')\">공지사항</a></li>";
        html2 = "<li " + ( curUrl.IndexOf( "/jajo_pop_file" ) != -1 ? "class='on'" : "" ) + " ><a href='javascript:void(0)' onclick=\"alert('" + msg + "')\">자료실</a></li>";
        html3 = "<li " + ( curUrl.IndexOf( "/jajo_pop_gall" ) != -1 ? "class='on'" : "" ) + " ><a href='javascript:void(0)' onclick=\"alert('" + msg + "')\">갤러리</a></li>";
        html4 = "<li " + ( curUrl.IndexOf( "/jajo_pop_chat" ) != -1 ? "class='on'" : "" ) + " ><a href='javascript:void(0)' onclick=\"alert('" + msg + "')\">맴버채팅</a></li>";
        html5 = "<li " + ( curUrl.IndexOf( "/jajo_pop_volu" ) != -1 ? "class='on'" : "" ) + " ><a href='javascript:void(0)' onclick=\"alert('" + msg + "')\">봉사활동</a></li>";
        html6 = "<li " + ( curUrl.IndexOf( "/jajo_pop_cons" ) != -1 ? "class='on'" : "" ) + " ><a href='javascript:void(0)' onclick=\"alert('" + msg + "')\">상담</a></li>";

      } else {

        html1 = "<li " + ( curUrl.IndexOf( "/jajo_pop_noti" ) != -1 ? "class='on'" : "" ) + " ><a href='../support/jajo_pop_noticeList.aspx?seq=" + seq + "'>공지사항</a></li>";
        html2 = "<li " + ( curUrl.IndexOf( "/jajo_pop_file" ) != -1 ? "class='on'" : "" ) + " ><a href='../support/jajo_pop_fileList.aspx?seq=" + seq + "'>자료실</a></li>";
        html3 = "<li " + ( curUrl.IndexOf( "/jajo_pop_gall" ) != -1 ? "class='on'" : "" ) + " ><a href='../support/jajo_pop_galleryList.aspx?seq=" + seq + "'>갤러리</a></li>";
        html4 = "<li " + ( curUrl.IndexOf( "/jajo_pop_chat" ) != -1 ? "class='on'" : "" ) + " ><a href='../support/jajo_pop_chat.aspx?seq=" + seq + "'>맴버채팅</a></li>";
        html5 = "<li " + ( curUrl.IndexOf( "/jajo_pop_volu" ) != -1 ? "class='on'" : "" ) + " ><a href='../support/jajo_pop_volunteer.aspx?seq=" + seq + "'>봉사활동</a></li>";
        html6 = "<li " + ( curUrl.IndexOf( "/jajo_pop_cons" ) != -1 ? "class='on'" : "" ) + " ><a href='../support/jajo_pop_consultList.aspx?seq=" + seq + "'>상담</a></li>";

      }

      menu_li1.Text = html1;
      menu_li2.Text = html2;
      menu_li3.Text = html3;
      menu_li4.Text = html4;
      menu_li5.Text = html5;
      menu_li6.Text = html6;

		}
		
	}

  private static int Join_Member(string user_id) {

    string query = string.Empty;
    string where = string.Empty;
    int rows = 0;
    Base B = BaseManager.GetBase();

    SqlCommand cmd = null;

    using (SqlConnection conn = new SqlConnection( Base.commDBString )) {

      conn.Open( ref cmd );

      query = " select count(USER_ID) from TB_JAJO_MEMBER_TEST where JAJO_NO = @JAJO_NO and USER_ID = @USER_ID and REAL_YN = 'Y' ";
      cmd.Query( query );
      cmd.Parameters.AddWithValue( "@JAJO_NO", B.Get( "seq" ) );
      cmd.Parameters.AddWithValue( "@USER_ID", user_id );
      rows = cmd.ExecuteScalar().ConInt();

      conn.Close( ref cmd );

    }

    return rows;

  }

}