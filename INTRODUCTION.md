# Introduction

## Added Dependencies

- MUI/Emotion - For styles
- ky - Use instead of fetch because it throws errors for non 200 API responses.
- Formik/Yup - Form validation
- react-router - Routing
- Hijacker - Described below
- Prettier - Formatting
- Playwright - E2E testing

## Hijacker

Hijacker allows me to force certain api results/failures without having to edit/restart the mock server. I can also proxy directly to the mock server if I want.

To run everything with hijacker use the following command:
`npm run dev`

This will spin the existing mocks up on port 3002, the hijacker api on 3001, with the hijacker frontend on 3003. The port for the assignment frontend remains 3000. I set up two rules, one to throw a 400 for getting colors and the other to throw a 400 for submitting data. The rules are disbled by default and can be enabled in the frontend.

Project can be ran normally without hijacker with `npm start`.

## E2E Tests

I used Playwright for E2E tests, mostly because I wanted to try something new, I have previously used Cypress. They can be ran with the command `npm run test:e2e`.  Playwright will start up the applicaiton so there is no need to run it seperately.

I am using Playwright API mocks so the API is not needed to run tests either.