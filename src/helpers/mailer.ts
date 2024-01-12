
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashtoken
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })

    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5553eb7400f7dd",
        pass: "6059c422cf5d32"
        //TODO: add these credentials to .env file
      }
    });

    const mailOptions = {
      from: 'ayush@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`

    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

  } catch (error: any) {
    console.error('Error sending email:', error.message);
    console.error('Error details:', error);
    throw new Error(error.message);
  }
}

