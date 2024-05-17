describe('Login example', () => {
    it('Check last mail and get link from it', () => {
        let tenMinutesInMiliseconds = 600000
        let dateBeforeSend = new Date().getTime() - tenMinutesInMiliseconds;
        //sendCloudflareRequest();
        for (let index = 0; index < 10; index++) {
          cy.task('lastEmail', new Date(dateBeforeSend).toISOString()).then((email) => {
            if (email === 'not mail yet') {
              cy.wait(2000);
            } else {
              cy.visit(email.toString(), { failOnStatusCode: false });
            }
            cy.log('Received Email: ', email);
          });
        }
    })
})
