/**
 * Mock mailing
 */
class Mailer {
  async send(emails: string[], message: {title: string, message: string}): Promise<void> {
    emails.forEach(email => console.log(email, message));
  }
}

export {Mailer};
