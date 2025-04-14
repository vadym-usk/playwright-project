# 🎭 Playwright Test Automation

![CI](https://github.com/vadym-usk/playwright-project/actions/workflows/main.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
[![Made with Playwright](https://img.shields.io/badge/Tested%20with-Playwright-45ba63?logo=playwright&logoColor=white)](https://playwright.dev)
[![Dockerized](https://img.shields.io/badge/Docker-Supported-blue?logo=docker)](https://hub.docker.com/)
[![Allure Report](https://img.shields.io/badge/Allure-Report-purple?logo=allure&logoColor=white)](https://github.com/your-username/your-repo-name/actions)
![License: None](https://img.shields.io/badge/license-none-lightgrey)

Demostration of automated UI and API testing for the project using [https://playwright.dev/](https://playwright.dev/).  
Tests run in Docker containers and in CI via GitHub Actions with Allure reporting support.  
Supports cross-browser testing.

---

## 🚀 Features

- ✅ UI and API test automation with Playwright
- 🐳 Docker-based test execution
- 🚀 Parallel testing in browsers
- 📊 Allure Report integration
- 🔁 CI pipeline using GitHub Actions
- 🔐 Environment variable support via `.env`

---

## ⚙️ Installation

```bash
git clone https://github.com/vadym-usk/playwright-project.git
cd playwright-project
npm install
```

---

## 🛠 Environment Setup
#### Copy .env.example and create your own .env file:
```bash
cp .env.example .env
```

#### Set your environment values .env:
```bash
BASE_URL=https://example.com
HTTP_CREDENTIALS_USERNAME=username
HTTP_CREDENTIALS_PASSWORD=password
```
⚠️ .env is included in .gitignore, .dockerignore and should never be committed.

---

## 🚀 Running Tests Locally
#### Run all tests in Electron (default):
```bash
test:run:all
```

---

## 🐳 Running in Docker
#### Build the image:
```bash
docker build -t cypress-tests .
```

#### Run tests:
```bash
docker run --rm \
            -v ${{ github.workspace }}/allure-results:/app/allure-results \
            -e BASE_URL="${{ secrets.BASE_URL }}" \
            -e HTTP_CREDENTIALS_USERNAME="${{ secrets.HTTP_CREDENTIALS_USERNAME }}" \
            -e HTTP_CREDENTIALS_PASSWORD="${{ secrets.HTTP_CREDENTIALS_PASSWORD }}" \
            playwright-tests sh -c "
              npx playwright test --project=TEST:run:auth &&
              npx playwright test --project=TEST:setup &&
              npx playwright test --project=TEST:run:base
            "
```

---

## 📊 Allure Report
After running tests:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🔄 CI/CD with GitHub Actions
This project is configured to run tests on every push or pull request to the main branch.

#### Highlights:
- Test results are stored in separate Allure folders
- Reports are zipped and uploaded as build artifacts

---

## 🧬 Secrets in CI
You’ll need to define the following secrets in your GitHub repository:

```bash
BASE_URL

HTTP_CREDENTIALS_USERNAME
HTTP_CREDENTIALS_PASSWORD
```
These are injected into Docker containers during Cypress test runs.

---

## 🧱 Project Structure
```bash
.
├── .github/
    └── workflows/
        └── main.yml
├── src/
│       └── components/
│       └── pages/
│       └── utils/
├── tests/
│       └── garage/
│           └── negative.spec.ts
│           └── positive.spec.ts
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── playwright.config.ts
└── README.md
```

---

## 📁 Artifacts
After each CI run:
- Individual Allure reports are saved: allure-report
- All reports are archived as: allure-reports-zip for easy download

---

## 👤 Author
**Vadym** – [@vadym-usk](https://github.com/vadym-usk)

---

## 📝 License
No license. All rights reserved.
