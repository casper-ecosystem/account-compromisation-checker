# Casper Account Compromisation Checker

The Casper Account Compromisation Checker is a React app that can be used to check if an account was compromised during Casper's security breach.

To use the app, [open it]() in a browser and paste your public key or sign in with CSPR.click. Complete the captcha and submit. The app will tell you whether your account has been compromised or not.

## Build Locally

### Install

```bash
git clone https://github.com/casper-ecosystem/account-compromisation-checker.git
cd account-compromisation-checker/
cd client/
npm install
npm run build
cd ../server
```

Insert reCAPTCHA secret key in *.env*:

```bash
nano .env
```

```
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

Install packages:

```bash
npm install
```

Populate compromised accounts:

```bash
nano accounts.json
```

```json
[
  "0203ddea9e63f0c56f76ab87c76a5070e7703dc40ecbfe7b9d9a04d55e36a38a84c7",
  "019cf922e91f564896175b9bf6850788ebaa0c8a809d940570f8dd6f0bd5ed822d",
  "0202a7c5e09e4c39438420ab667ea2faf3d2b48e45988cba1fd50fa0bc39b3a27b0b",
  ...
]
```

Initialize database:

```bash
node initDB.js
```

**Note: The SHA-256 hash of each account is stored in the database rather than the public key itself**

Run server:

```bash
node server.js
```



