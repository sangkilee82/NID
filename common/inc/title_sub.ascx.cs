using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class common_inc_title_sub :UserControlBase {

    protected void Page_Load(object sender, EventArgs e) {

        if( !Page.IsPostBack ) {

            //seq값 없으면 메인페이지로 이동
            if( B.Get( "seq" ).ConString().IsEmpty() == true ) {

                Javascript.AlertUrl( "접근할 수 없습니다.", "../main/main.aspx" );

            }

            List();

        }

    }
    private void List() {
        //## Explicit
        string query = string.Empty;                            //쿼리문 초기화		
        SqlCommand cmd = null;

        using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

            conn.Open( ref cmd );

            string code_depth1 = B.Get( "seq" ).ConString().SubStr( 0, 3 ) + "000000";  //1뎁스의 코드값을 불러온다

            query = " select ADMIN_ID, NO, " +
										"        (select CODE_NAME from TB_USER_CODE with( nolock ) where REAL_YN = 'Y' and CODE = GUBUN ) as NAME, " +
										"        (select CODE_NAME from TB_USER_CODE with( nolock ) where REAL_YN = 'Y' and CODE = @CODE   ) as DPETH1_NAME, " +
                    "        CONTENT_HTML, CONTENT_TEXT, GUBUN, TITLE, REGI_DD, AREA_CODE " +
										" from TB_TOT_ETC with( nolock ) " +
										" where GUBUN = @SEQ and REAL_YN = 'Y' ";
            cmd.Query( query );
            cmd.Parameters.AddWithValue( "@CODE", code_depth1 );
            cmd.Parameters.AddWithValue( "@SEQ", B.Get( "seq" ) );
            cmd.ExecuteReader().CloneStringDic( B.StrDic ).CloseDispose();

            conn.Close( ref cmd );

        }

    }

}