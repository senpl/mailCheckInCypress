To make it work do:

yarn install

in file cypress\support\mails\CheckMail.ts replace dummy values with your mail credentials.

yarn test

run file repro.js

Based on great article https://www.codemancers.com/blog/2023-06-26-how-to-test-received-emails-with-cypress-ethereal-and-imapflow/ by Ashwani Kumar Jha https://github.com/ashwani3011 .
