<?php
/**
 * This example shows making an SMTP connection with authentication.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer.php';
require 'SMTP.php';

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');




//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
//Tell PHPMailer to use SMTP
//$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
//$mail->SMTPDebug = 2;
//Set the hostname of the mail server
//$mail->Host = 's51.webhost1.ru';
//Set the SMTP port number - likely to be 25, 465 or 587
//$mail->Port = 25;
//Whether to use SMTP authentication
//$mail->SMTPAuth = true;
//Username to use for SMTP authentication
//$mail->Username = 'noreply@deltadigital.ru';
//Password to use for SMTP authentication
//$mail->Password = '';
//Set who the message is to be sent from
$mail->setFrom('noreply@deltadigital.ru', 'noreply');
//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress('noreply@deltadigital.ru', 'noreply');

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contents.html'), __DIR__);

$mail->isHTML(true); // Set email format to HTML
//Set the subject line
$mail->Subject = 'Вопрос с сайта';

$project_name = trim($_POST["project_name"]);
$admin_email  = trim($_POST["admin_email"]);
$form_subject = trim($_POST["form_subject"]);

foreach ($_POST as $key => $value) {
    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
        $body .= "
        " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
    }
}

$body = "<table style='width: 100%;'>$body</table>";

$mail->Body = $body;

//Replace the plain text body with one created manually
//$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}
