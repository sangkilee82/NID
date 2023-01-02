using System;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.UI.HtmlControls;
using System.Web.UI;

public partial class common_inc_top_test :UserControlBase {

    protected void Page_Load(object sender, EventArgs e) {

        if( !Page.IsPostBack ) {

            //1Depth의 TOP 리스트를 호출한다.
            SetMatchCode();

            TopList();

        }

    }



    private void SetMatchCode() {

        //## Explicit
        string query = string.Empty;                            //쿼리문 초기화		
        SqlCommand cmd = null;
        SqlDataReader dr = null;

        using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

            conn.Open( ref cmd );

            string rawUrl = Request.RawUrl;                                                                   //원시 URL
            string[] rawUrlArr = rawUrl.Split( '/' );                                                         //원시 URL 배열
            string matchUrl = rawUrlArr[rawUrlArr.Length - 2] + "/" + rawUrlArr[rawUrlArr.Length - 1];        //쿼리문이랑 매치할 URL

            // 매치 URL로 해당 메뉴의 정보를 불러와, 세션정보에 적용시킨다.
            query = " select A.CODE, A.PT_CODE, A.CODE_NAME, " +
                    " ( select CODE_NAME from NID_USER_CODE where substring(CODE, 1, 3) = substring(A.PT_CODE, 1, 3) and DEPTH = 1 ) as DEP1_CODE_NAME " +
                    " from NID_USER_CODE A where URL = @URL ";

            cmd.Query( query );
            cmd.Parameters.AddWithValue( "URL", matchUrl );
            dr = cmd.ExecuteReader();

            string matchCode = string.Empty;
            string code_name = string.Empty;
            string dep1_code_name = string.Empty;
            if( dr.Read() ) {

                matchCode = dr["CODE"].ConString();

                code_name = dr["CODE_NAME"].ConString();                       // 2dept 메뉴명
                dep1_code_name = dr["DEP1_CODE_NAME"].ConString();             // 1dept 메뉴명

                // 메뉴명
                Session["CodeName"] = code_name;

                // 타이틀 경로
                Session["matchCodeName"] = dep1_code_name + " > " + code_name;

            } else {

                matchCode = Session["matchCode"].ConString();

            }
            dr.CloseDispose();

            //세션에서 불러오는 매치코드도 없다면 페이지 종료
            if( matchCode.IsEmpty() ) {

                conn.Close( ref cmd );

                if( Request.Path.IndexOf( "main/main.aspx" ) != -1 && B.Get( "matchCode" ).IsEmpty() ) {

                    Javascript.AlertUrl( "잘못된 경로로 접근하셨거나, 세션정보가 종료 되었습니다.", "/main/" ).End();

                }

            } else {

                //매치코드를 세션에 저장한다
                Session["matchCode"] = matchCode;

            }

            conn.Close( ref cmd );

        }

    }

    private void TopList() {

        //## Explicit
        string query = string.Empty;                            //쿼리문 초기화
        string where = string.Empty;
        SqlCommand cmd = null;
        SqlDataReader dr = null;

        using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

            conn.Open( ref cmd );

            query = " select CODE, CODE_NAME from NID_USER_CODE where REAL_YN = 'Y' and DEPTH = 1 ";
            cmd.Query( query );
            dr = cmd.ExecuteReader();

            if( dr.HasRows ) {

                top_RT.DataSource = dr;
                top_RT.DataBind();

            }

            dr.CloseDispose();

            conn.Close( ref cmd );


        }

    }

    protected void TopBounds(object sender, RepeaterItemEventArgs e) {

        if( e.Item.ItemType == ListItemType.AlternatingItem || e.Item.ItemType == ListItemType.Item ) {

            string code = DataBinder.Eval( e.Item.DataItem, "CODE" ).ToString();                  //바인딩되는 코드

            SqlCommand cmd = null;
            SqlCommand cmd2 = null;
            SqlDataReader dr = null;
            SqlDataReader dr2 = null;
            string query = string.Empty;
            string html = string.Empty;

            string depth2_code = string.Empty;
            string depth2_code_name = string.Empty;
            string depth2_url = string.Empty;

            Literal c_lt = new Literal();

            using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

                conn.Open( ref cmd );

                //2뎁스를 불러온다
                query = " select CODE, CODE_NAME, URL from NID_USER_CODE where REAL_YN = 'Y' and DEPTH = 2 and PT_CODE = @PT_CODE  ";
                cmd = new SqlCommand( query, conn );
                cmd.Parameters.AddWithValue( "@PT_CODE", code );
                dr = cmd.ExecuteReader();

                while( dr.Read() ) {

                    depth2_code = dr["CODE"].ConString();            //2뎁스의 코드
                    depth2_code_name = dr["CODE_NAME"].ConString();  //2뎁스의 코드네임
                    depth2_url = dr["URL"].ConString();              //2뎁스의 URL

                    if( depth2_url.ConString().IsEmpty() == true || depth2_url == "#" ) {

                        html += return_html( depth2_code, depth2_url, depth2_code_name );

                    } else {

                        html += "<li><a href='../" + depth2_url + "'>" + depth2_code_name + "</a></li>";

                    }

                }

                dr.CloseDispose();


                c_lt = ( Literal )e.Item.FindControl( "depth2" );
                c_lt.Text = html;

                conn.Close( ref cmd );

            }

        }

    }


    protected static string return_html( string depth2_code, string depth2_url, string depth2_code_name ) {

        //## Explicit
        string query = string.Empty;                            //쿼리문 초기화
        string html = string.Empty;
        SqlCommand cmd = null;
        SqlDataReader dr = null;

        using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

            conn.Open( ref cmd );

            html += "<li><a href='#' class='fix'>" + depth2_code_name + "<img src='../images/common/bg_twoDep_on.gif' alt='더 보기' /></a>";
            html +=     "<ul class='threeDep'>";

            query = " select CODE, CODE_NAME, URL from NID_USER_CODE where REAL_YN = 'Y' and DEPTH = 3 and PT_CODE = @PT_CODE  ";
            cmd = new SqlCommand( query, conn );
            cmd.Parameters.AddWithValue( "@PT_CODE", depth2_code );
            dr = cmd.ExecuteReader();

            while( dr.Read() ) {


                html +=                             "<li><a href = '../" + dr["URL"].ConString() + "'>" + dr["CODE_NAME"].ConString() + "</a></li>";


            }

            dr.CloseDispose();

            html += "</ul>";
            html+= "</li>";
            conn.Close( ref cmd );

            return html;


        }

    }


}



