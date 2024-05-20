import { ImapEmails } from "imap-emails";

let imapEmails = new ImapEmails({
  username: 'yourMail@yourDomain.com',
  password: 'yourPassword',
  imapConfig: {
    host: 'yourMailServerAdress',
    port: 993,
    tls: true
  }
})

export async function getLinkFromMail(currentDate) {
  await imapEmails.connect()

  let emails = await imapEmails.getEmails({ since: currentDate })
  emails = emails.filter(email => new Date(email.date) > new Date(currentDate))

  if (emails.length == 0) {
    await imapEmails.disconnect()
    return 'not mail yet'
  } else {
    console.log(emails[emails.length - 1].date.toISOString())
  }
  let max = emails[0].date;
  let emailWithMaxDate = emails[0]
  for (let email of emails) {
    if (email.date > max) {
      max = email.date;
      emailWithMaxDate = email
    }
  }

  let emailText = emailWithMaxDate.textAsHtml
  let linkText = emailText?.substring(emailText.indexOf('<br/><a href=\"') + '<br/><a href=\"'.length)
  linkText = linkText?.substring(0, linkText.indexOf('">'))
  await imapEmails.disconnect()
  return linkText
}

// async function fun() {
//   let tenMinutesInMiliseconds = 600000
//   let time = new Date().getTime() - 3 * tenMinutesInMiliseconds
//   await getLinkFromMail(new Date(time).toISOString())
// }
// fun();
