const { templateCastEID, apiBaseURL } = require('../config')
const { getTodayISO } = require('./helpers')

const redirectURL = `${apiBaseURL}/api/packet/finish`

module.exports = {
  redirectURL,
  createEtchPacketVars: {
    // Indicate the packet is all ready to send to the signers. An email will
    // be sent to the first signer if the user is type 'email'.
    isDraft: false,

    // Test packets will use development signatures and not count toward your billed packets
    isTest: false,

    // Subject of the emails if signer is type email
    signatureEmailSubject: 'Sample Form',

    // Files will be shown to the user in the order they are specified in this array
    files: [
      {
        // This is a file we will upload and specify the fields ourselves
        id: 'fileUploadNDA',
        title: 'Anvil Demo NDA',
        file: undefined, // File is defined in the '/api/packet/create' route (server/routes/index.js)
        fields: getUploadedFileFields(),
      },
      {
        // You can also use ready made templates built out in the Anvil UI
        id: 'templatePdfIrsW4',
        castEid: templateCastEID,
      },
    ],
    signers: [
      // Signers will be signing in the order they are specified in this array
      // signer2 will be signing after signer1 has finished signing, and so on
      {
        id: 'signer1',
        name: 'Sally Signer',
        email: 'Sally@example.com',
        // These fields will be present when this signer signs
        fields: [
          {
            // This particular 'employee signature' field will be placed on the IRS-W4 file
            fileId: 'templatePdfIrsW4',
            fieldId: 'employeeSignature',
          },
          {
            fileId: 'templatePdfIrsW4',
            fieldId: 'employeeSignatureDate',
          },
          {
            fileId: 'fileUploadNDA',
            fieldId: 'initials1',
          },
          {
            fileId: 'fileUploadNDA',
            fieldId: 'signature1',
          },
          {
            fileId: 'fileUploadNDA',
            fieldId: 'signatureDate1',
          },
        ],
        // (Optional) This signer will be drawing their signature, options are 'draw' (default) and 'text'
        signatureMode: 'draw',
        // (Optional) The sign UI will walk through the signer through each signature & initial field when true (default)
        acceptEachField: true,
        // (Optional) Options are 'email' and 'embedded', defaults to 'email'
        signerType: 'embedded',
        // (Optional) The signer will be redirected to the redirectURL when finished signing, the url should begin with 'http://' or 'https://'
        redirectURL,
        // (Optional) The signer will receive email notifications throughout the signature process, default is true
        enableEmails: false,
      },
    ],
    data: {
      // Fill the PDFs with your data before they are sent for signatures
      payloads: {
        // 'templatePdfIrsW4' is the fileId of the 2nd file
        templatePdfIrsW4: {
          textColor: '#0000CC',
          data: {
            // You can set up PDF templates for filling in the Anvil UI.
            // Anyone on your team can build them!
            name: 'Sally Signer',
            address: {
              street1: '123 Main St #234',
              city: 'San Francisco',
              state: 'CA',
              zip: '94106',
              country: 'US',
            },
            ssn: '456454567',
            filingStatus: 'Joint',
            under17Cost: 2000,
            otherDependentsCost: 0,
            totalDependentsCost: 2000,
            otherIncome: 0,
            otherDeductions: 0,
            extraWithholding: 0,
            employerName: 'Awesome Co Inc',
            firstDateEmployment: getTodayISO(),
            employerEin: '897654321',
            headOfHousehold: true,
            employerAddress: {
              street1: '555 Market St',
              city: 'San Francisco',
              state: 'CA',
              zip: '94103',
              country: 'US',
            },
          },
        },
        // 'fileUploadNDA' is the fileId of the 1st file
        fileUploadNDA: {
          fontSize: 8,
          textColor: '#0000CC',
          data: {
            effectiveDate: getTodayISO(),
            disclosingPartyName: 'Sally Signer',
            disclosingPartyEmail: 'Sally@example.com',
            purposeOfBusiness: 'DEMO!!',
            placeOfGovernance: 'The Land',
            name1: 'Sally Signer',
          },
        },
      },
    },
  },
}

// Below are all the fields used to fill the NDA PDF (file 1)
function getUploadedFileFields () {
  return [
    {
      id: 'effectiveDate',
      type: 'date',
      rect: { x: 326, y: 91, height: 14, width: 112 },
      format: 'MM/DD/YYYY',
      pageNum: 0,
    },
    {
      id: 'disclosingPartyName',
      type: 'fullName',
      rect: { x: 215, y: 106, height: 13, width: 140 },
      pageNum: 0,
    },
    {
      id: 'disclosingPartyEmail',
      type: 'email',
      rect: { x: 360, y: 107, height: 12, width: 166 },
      pageNum: 0,
    },
    {
      id: 'recipientName',
      type: 'fullName',
      rect: { x: 223, y: 120, height: 11, width: 138 },
      pageNum: 0,
    },
    {
      id: 'recipientEmail',
      type: 'email',
      rect: { x: 367, y: 120, height: 13, width: 157 },
      pageNum: 0,
    },
    {
      id: 'purposeOfBusiness',
      type: 'shortText',
      rect: { x: 314, y: 155, height: 12, width: 229 },
      pageNum: 0,
    },
    {
      id: 'initials1',
      type: 'initial',
      rect: { x: 106, y: 729, height: 25, width: 60 },
      pageNum: 0,
    },
    {
      id: 'initials2',
      type: 'initial',
      rect: { x: 171, y: 729, height: 24, width: 67 },
      pageNum: 0,
    },
    {
      id: 'placeOfGovernance',
      type: 'shortText',
      rect: { x: 237, y: 236, height: 14, width: 112 },
      pageNum: 1,
    },
    {
      id: 'name1',
      type: 'fullName',
      rect: { x: 107, y: 374, height: 22, width: 157 },
      pageNum: 1,
    },
    {
      id: 'signature1',
      type: 'signature',
      rect: { x: 270, y: 374, height: 22, width: 142 },
      pageNum: 1,
    },
    {
      id: 'signatureDate1',
      type: 'signatureDate',
      rect: { x: 419, y: 374, height: 23, width: 80 },
      pageNum: 1,
    },
    {
      id: 'name2',
      type: 'fullName',
      rect: { x: 107, y: 416, height: 22, width: 159 },
      pageNum: 1,
    },
    {
      id: 'signature2',
      type: 'signature',
      rect: { x: 272, y: 415, height: 23, width: 138 },
      pageNum: 1,
    },
    {
      id: 'signatureDate2',
      type: 'signatureDate',
      rect: { x: 418, y: 414, height: 23, width: 82 },
      pageNum: 1,
    },
  ]
}
