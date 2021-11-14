let mailtemplate=`<!-- START HEAD -->

<head>

    <!-- CHARSET -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- MOBILE FIRST -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

    <!-- RESPONSIVE CSS -->
    <style type="text/css">
        @media only screen and (max-width: 550px) {
            .responsive_at_550 {
                width: 90% !important;
                max-width: 90% !important;
            }
        }
    </style>

</head>
<!-- END HEAD -->

<!-- START BODY -->

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

    <!-- START EMAIL CONTENT -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
        <tbody>

            <tr>

                <td align="center">

                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                        <tbody>
                            <tr>
                                <td width="100%" align="center">

                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->



                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->

                                    <!-- START CONTENT -->
                                    <table width="500" border="0" cellpadding="0" cellspacing="0" align="center"
                                        style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                        <tbody>
                                            <tr>
                                                <td align="center" bgcolor="#ffffff">

                                                    <!-- START BORDER COLOR -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" height="7" align="center" border="0"
                                                                    bgcolor="#0000"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BORDER COLOR -->

                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->

                                                    <!-- START HEADING -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <img width="200"
                                                                        src="https://nodeista.com/public/images/media/1635251660nodeista-removebg-preview.png"
                                                                        alt="Nodeista Logo" border="0"
                                                                        style="text-align: center;" />
                                                                    <h1
                                                                        style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">
                                                                        Hi {{name}}, Welcome to Nodeista!</h1>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END HEADING -->

                                                    <!-- START PARAGRAPH -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <p
                                                                        style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">
                                                                        We are so proud to Welcome you to our communtiy. We can do great things in future with unity. Once again, Welcome to the innovative community.</p>
                                                                    <p
                                                                        style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">
                                                                       <span><b style="color: red;">Your activation code is :</b> <strong style="color: green;">9sD9lRibmvTRtnw</strong></p></span> 
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END PARAGRAPH -->

                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                        align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style="font-family:'Ubuntu Mono', monospace;  font-size:12px;">
                                        Nodeista &copy; 2021, All Rights Reserved</p>
                                    <!-- END CONTENT -->

                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->




                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>

            </tr>

        </tbody>
    </table>
    <!-- END EMAIL CONTENT -->

</body>
<!-- END BODY -->`
// export mail template
module.exports = {
    mailtemplate
}