using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class common_inc_title_class_test :UserControlBase {

	protected void Page_Load( object sender, EventArgs e ) {

		if( !Page.IsPostBack ) {

			Read();

		}

	}

	protected void Read() {

		string query = string.Empty;
		SqlCommand cmd = null;

		using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

			conn.Open( ref cmd );

			//교육명, 교육시수, 운영자, 조교 데이터를 불러온다.
			query = " select A.CODE_NAME, B.YEAR_DD, B.TITLE, B.EDUCATION_TIME, B.REGI_ID, B.FIRST_PHONE, " +
							"        B.FIRST_TEACHER, B.SECOND_PHONE, B.SECOND_TEACHER, B.EDUCATION_EDATE, B.EDUCATION_SDATE, " +
							"				 B.EDUCATION_SDATE, B.EDUCATION_SDATE, B.EDUCATION_AGENCY " +
							" from TB_EDUCATION_CODE_BAK A with( nolock ) " +
							" inner join TB_EDUCATION_SUBJECT_BAK B with( nolock ) " +
							"   on A.NO = B.PT_NO " +
							" where B.NO = @NO and A.REAL_YN = 'Y' and B.REAL_YN = 'Y' ";
			cmd.Query( query );
			cmd.Parameters.AddWithValue( "@NO", B.Get( "subject_no" ) );
			cmd.ExecuteReader().CloneStringDic( B.StrDic ).CloseDispose();

			conn.Close( ref cmd );

		}

	}

}