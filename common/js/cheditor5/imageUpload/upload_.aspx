<%@ Page Language="C#" %>
<%@ import Namespace="System" %>
<%@ import Namespace="System.IO" %>
<%@ import Namespace="System.Configuration" %>

<script runat="server">
void Page_Load(Object sender, EventArgs e)
{
    if (Request.ContentType.IndexOf("multipart/form-data") < 0) {
        return;
	}

    foreach (String f in Request.Files.AllKeys) {
        HttpPostedFile file = Request.Files[f];

        String fileName = Path.GetFileName(file.FileName);
        String filePath = ConfigurationSettings.AppSettings["SAVE_PATH"] + fileName;
		String fileUrl = ConfigurationSettings.AppSettings["SAVE_URL"] + fileName;

		String outputJson = String.Format("\"fileUrl\":\"{0}\",\"filePath\":\"{1}\",\"fileName\":\"{2}\",\"fileSize\":\"{3}\"",
			fileUrl, filePath, fileName, file.ContentLength);

        try {
        	file.SaveAs(filePath);
       	 	Response.Write("{"+outputJson+"}");
		} catch (IOException ignore) {}
    }
}
</script>