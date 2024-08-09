# Casper Account Compromisation Checker

The Casper Account Compromisation Checker is a React app that can be used to check if an account was compromised during Casper's security breach.

To use the app, [open it]() in a browser and paste your public key or sign in with CSPR.click. Complete the captcha and submit. The app will tell you whether your account has been compromised or not.

## Build Locally

### Install

```bash
git clone https://github.com/casper-ecosystem/account-compromisation-checker.git
cd account-compromisation-checker/
```

Populate *server/.env*:

```bash
nano server/.env
```

```
RECAPTCHA_SECRET_KEY=<RECAPTCHA_KEY>
MYSQL_HOST=<MYSQL_HOST>
MYSQL_PORT=<MYSQL_PORT>
MYSQL_USER=<MYSQL_USER>
MYSQL_PASSWORD=<MYSQL_PASSWORD>
MYSQL_DATABASE=<MYSQL_DATABASE_NAME>
MYSQL_TABLE=<MYSQL_TABLE_NAME>
PUBLIC_KEYS=020387a4b7472805b2efe2510ebfb95e5dbaeef4b883d11ed7d22b090fb4455bad91,0172ca9275d3592ac7402b861879c94aea699db409940945de9d619a734c90d79d,01f24c679f4e3b2201a359c4233d6902e1e565a4a09a6ca36f9a8749f5e88fbbcf
```

**Note: Replace each `<VALUE>` above with the appropriate data. `MYSQL_DATABASE` and `MYSQL_TABLE` can be any value. `PUBLIC_KEYS` should contain each public key to be populated into the database, separated by commas.**

Build and run Docker images:

```bash
docker-compose up --build
```


