// using Twilio SendGrid's v3 Node.js Library
import resetToken from '../token/resetToken';
const sgMail = require('@sendgrid/mail');

export const sendgridEmail = async (email: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  let token: string = resetToken(email);

  let link: string =
    `${process.env.SENDGRID_LINK}/reset?token=${token}` ||
    `http://localhost:3000/reset?token=${token}`;

  const msg = {
    to: email,
    from: 'jeff_shop@support.com',
    subject: 'Your Jeff-Shop password reset',
    html: `
    <div>
      <h3>If you did not request to reset your password, ignore this email,</h3>
      <h4>Otherwise, click the link below and we can reset your password.</h4>
      <a href=${link} target="__blank" rel="no-opener noreferrer">Reset Password Now!</a>
      <p>This was an auto-generated email, please do not respond, thank you.</p>
    </div>
    `
  };
  sgMail.send(msg);

  return 'Please Check Your Email';
};
