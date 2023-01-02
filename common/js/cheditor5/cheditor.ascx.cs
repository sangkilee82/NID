using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.IO;
using System.Text.RegularExpressions;

public partial class CHEditor : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    private string _editContent;

    public string Text
    {
        get 
        { 
        	return editorContentValue.Value; 
        }
        set 
        {
            editorContentValue.Value = value;
            _editContent = value;
            editorContentValue.Value = _editContent;
        }
    }
}
