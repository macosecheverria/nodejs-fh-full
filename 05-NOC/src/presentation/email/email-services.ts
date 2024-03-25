import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
//import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICES,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sentInformation);

      //const log = new LogEntity({
        //level: LogSeverityLevel.low,
        //message: "Email sent",
        //origin: "email.services.ts",
      //});

      return true;
    } catch (error) {
      //onst log = new LogEntity({
       // level: LogSeverityLevel.high,
        //message: "Email not sent",
        //origin: "email.services.ts",
      //});

      return false;
    }
  }

  async sendEmailwithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h3>Logs del sistemas</h3>
    <p>lorem ipsut</p>
    <p>Logs adjuntos</p>
    `;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
