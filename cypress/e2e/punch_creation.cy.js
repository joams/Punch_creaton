describe('Punch Creation Test', () => {
    it('should create a new punch successfully', () => {
        // Access to the web-app URL
        cy.visit('https://spektrumais-payroll-improve.azurewebsites.net/')

        // LogIn Form
        cy.get('form').within(() => {
                 cy.get('input').eq(0).type('ais', { force: true }) // The first input field in the form
                 cy.get('input').eq(1).type('john doe', { force: true }) // The second input field in the form
                 cy.get('input').eq(2).type('YcY!xx5Esp', { force: true }) // The third input field in the form
             })
        // LogIn 
        cy.get('#Logon_PopupActions_Menu_DXI0_T', { timeout: 10000 }).should('be.visible').click()

        // Go to the 'Punch' page
        cy.visit('https://spektrumais-payroll-improve.azurewebsites.net/Punch_ListView')

        // Creation of a new Punch
        cy.get('button#NewButton').click()

        // Fill in the values in the form
        // Select the first item from the EMPLOYEE dropdown
        cy.get('select#EmployeeId').select(0)

        // Select the first item from the WORK CODE dropdown
        cy.get('select#WorkCodeId').select(0)

        // Set the current date and time in the PUNCH TIME field
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
        cy.get('input#PunchTime').type(currentTime, { force: true })

        // Fill in the REMARKS field
        cy.get('textarea#Remarks').type('Test punch', { force: true })

        // Save the data
        cy.get('button#SaveButton').click()

        // Verify that the punch was successfully created (adjust according to the success message that appears)
        cy.contains('successfully').should('be.visible')

        // Take a screenshot
        cy.screenshot('punch_creation_success')

    })
})