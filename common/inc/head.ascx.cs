using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class common_inc_head :UserControlBase {

	protected void Page_Load( object sender, EventArgs e ) {

		Response.Cache.SetCacheability( HttpCacheability.NoCache );
		Response.Cache.AppendCacheExtension( "no-store, must-revalidate" );
		Response.AppendHeader( "Pragma" , "no-cache" );
		Response.AppendHeader( "Cache-Control" , "no-store" );
		Response.AppendHeader( "Expires" , "0" );

	}

  //private void TopList() {

  //  //## Explicit
  //  string query = string.Empty;                            //쿼리문 초기화
  //  string where = string.Empty;
  //  SqlCommand cmd = null;
  //  SqlDataReader dr = null;

  //  using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

  //    conn.Open( ref cmd );
			
  //    query = " select CODE, CODE_NAME " +
		//					" from TB_SITE_CODE with( nolock ) " +
		//					" where DEPTH = 1 and REAL_YN = 'Y' " +
		//			    " order by NUM asc ";

  //    cmd.Query( query );
  //    dr = cmd.ExecuteReader();

    
  //    dr.CloseDispose();

  //    conn.Close( ref cmd );

  //  }

  //}

  //protected void TopBound( object sender, RepeaterItemEventArgs e ) {

  //  if( e.Item.ItemType == ListItemType.AlternatingItem || e.Item.ItemType == ListItemType.Item ) {

  //    //## RepeatBind
  //    string code = B.RepeatBind( e, "CODE" ).ConString();    //2단계 코드
  //    string top_link = string.Empty;

  //    //## Explicit
  //    string query = string.Empty;                            //쿼리문 초기화		
  //    SqlCommand cmd = null;

  //    using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

  //      conn.Open( ref cmd );

  //      // 하위 메뉴 1번째를 가져온다.
  //      query = " select top(1) * from ( " +
		//						"		select URL, CODE_NAME, NUM, " +
		//						"					 ( select NUM from TB_SITE_CODE with( nolock ) where CODE = A.PT_CODE ) as PT_NUM " +
		//						"		from TB_SITE_CODE A with( nolock ) " +
		//						"   where URL is not null and REAL_YN = 'Y' " +
		//		        "         and substring( CODE, 1, 3 ) = @CODE " +
		//						"		      and CODE not in ('" + B.AdminUser.NO_CODE_ARR.Join( "','" ) + "') " +
		//						"	) B order by PT_NUM asc, NUM asc ";
  //      cmd.Query( query );
  //      cmd.Parameters.AddWithValue( "@CODE", code.Substring( 0, 3 ) );

  //      top_link = cmd.ExecuteScalar().ConString();

  //      //링크 적용
  //      if( top_link.IsEmpty() == false ) {

  //        top_link = "/" + top_link;
  //        ( ( HtmlAnchor )e.Item.FindControl( "top_link" ) ).HRef = "/zadmin" + top_link;

  //      }

  //    }

  //    if( top_link.IsEmpty() == false ) {

  //      //매치코드와 1단계 코드가 일치하다면,
  //      if( code.Substring( 0, 3 ) == Session["matchCode"].ConString( "000" ).Substring( 0, 3 ) ) {

  //        //현재경로가 메인화면이 아닐경우에만
  //        if( Request.Path.IndexOf( "main/main_list.aspx" ) == -1 ) {

  //          //css class 'on'처리를 한다.
  //          ( ( HtmlGenericControl )e.Item.FindControl( "top_item" ) ).Attributes["class"] = "on";

  //        }

  //      }

  //    } else {

  //      //하위 메뉴가 존재하지 않다면 메뉴를 보여주지 않는다.
  //      e.Item.Visible = false;

  //    }

  //  }

  //}

  //private void SetMatchCode() {

  //  //## Explicit
  //  string query = string.Empty;                            //쿼리문 초기화		
  //  SqlCommand cmd = null;
  //  SqlDataReader dr = null;

  //  using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

  //    conn.Open( ref cmd );

  //    string rawUrl = Request.RawUrl;                                                                   //원시 URL
  //    string[] rawUrlArr = rawUrl.Split( '/' );                                                         //원시 URL 배열
  //    string matchUrl = rawUrlArr[rawUrlArr.Length - 2] + "/" + rawUrlArr[rawUrlArr.Length - 1];        //쿼리문이랑 매치할 URL

  //    // 매치 URL로 해당 메뉴의 정보를 불러와, 세션정보에 적용시킨다.
  //    query = " select A.CODE, A.PT_CODE, A.CODE_NAME, " +
		//					"        ( select CODE_NAME from TB_SITE_CODE with( nolock ) where substring(CODE, 1, 3) = substring(A.PT_CODE, 1, 3) and DEPTH = 1 ) as DEP1_CODE_NAME " +
		//					" from TB_SITE_CODE A with( nolock ) " +
		//					" where URL = @URL ";
  //    cmd.Query( query );
  //    cmd.Parameters.AddWithValue( "URL", matchUrl );
  //    dr = cmd.ExecuteReader();

  //    string matchCode = string.Empty;
  //    string code_name = string.Empty;
  //    string dep1_code_name = string.Empty;
  //    if( dr.Read() ) {

  //      matchCode = dr["CODE"].ConString();

  //      code_name = dr["CODE_NAME"].ConString();                       // 2dept 메뉴명
  //      dep1_code_name = dr["DEP1_CODE_NAME"].ConString();             // 1dept 메뉴명

  //      // 메뉴명
  //      Session["CodeName"] = code_name;

  //      // 타이틀 경로
  //      Session["matchCodeName"] = dep1_code_name + " > " + code_name;

  //    } else {

  //      matchCode = Session["matchCode"].ConString();

  //    }
  //    dr.CloseDispose();

  //    //세션에서 불러오는 매치코드도 없다면 페이지 종료
  //    if( matchCode.IsEmpty() ) {

  //      conn.Close( ref cmd );

  //      if( Request.Path.IndexOf( "main/main.aspx" ) != -1 && B.Get( "matchCode" ).IsEmpty() ) {

  //        Javascript.AlertUrl( "잘못된 경로로 접근하셨거나, 세션정보가 종료 되었습니다.", "/zadmin/" ).End();

  //      }

  //    } else {

  //      //매치코드를 세션에 저장한다
  //      Session["matchCode"] = matchCode;

  //    }

  //    conn.Close( ref cmd );

  //  }

  //}

}