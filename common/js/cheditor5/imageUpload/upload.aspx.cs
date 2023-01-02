using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class gadmin_common_js_cheditor5_imageUpload_upload:System.Web.UI.Page {
	
	protected void Page_Load( object sender, EventArgs e ) {

		if( !Page.IsPostBack ) {

			Upload();

		}

	}

	private string RandomFileName() {

		return Path.GetRandomFileName().Replace( ".", "" );


	}

	private void Upload() {

		string dir = SitePath.UploadPath + @"\___editor_image\";
		
		//에디터 이미지 물리경로에 폴더 경로 추가
		string folder = Request.QueryString[ "parent_folder" ].ConString( "temp" );
		dir += folder + @"\";

		//에디터 이미지 물리경로에 년.월 추가
		string yyyyMM = DateTime.Now.ToString( "yyyyMM" );
		dir += yyyyMM + @"\";

		//에디터 이미지 논리 경로
    string root_src = SitePath.UploadRootSrc + "/___editor_image/" + folder + "/" + yyyyMM + "/";

		string filename = string.Empty;							//파일명
		string random_filename = string.Empty;			//랜덤 파일명
		int size = 0;																//파일 사이즈
		
		//업로드할 파일이 존재한다면
		if( Request.Files.Count > 0 ){
					
			//파일명 재 생산
			filename = Request.Files[ 0 ].FileName;
			string hat = FileManager.GetExt( filename );
			random_filename = RandomFileName() + "." + hat;
			size = Request.Files[ 0 ].ContentLength;

			//파일 업로드
			FileManager.Upload( dir, Request.Files[ 0 ], random_filename );

		}
		
		Response.Write( "{ \"fileUrl\": \"" + root_src + random_filename + "\", \"filePath\": \"" + root_src + random_filename + "\", \"origName\": \"" + filename + "\", \"fileName\": \"" + random_filename + "\", \"fileSize\": \"" + size + "\" }" );

	}

}