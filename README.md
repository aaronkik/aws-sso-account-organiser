# AWS SSO Account Filter

![GitHub](https://img.shields.io/github/license/aaronkik/aws-sso-account-filter?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/aaronkik/aws-sso-account-filter/main.yml?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/aaronkik/aws-sso-account-filter?style=flat-square)

AWS SSO Account Filter is a browser extension that filters out AWS accounts you don't care about.

Enter valid JS flavoured regex in the input field to view the accounts you're interested in. Your regex can be as simple as `dev` or something more complex.

Download the extension on the Chrome Web Store [here](https://chrome.google.com/webstore/detail/aws-sso-account-filter/pdcibaphodkbbpoeienpnebpchibohbf).

Firefox Add-on coming soon<sup>TM</sup>.

Or download the latest .zip [here](https://github.com/aaronkik/aws-sso-account-filter/releases/latest) or head over to the [release page](https://github.com/aaronkik/aws-sso-account-filter/releases).

## Running Locally

This project uses [volta](https://volta.sh/) to manage node and npm and is recommended if you decided to develop or run this project.

**Clone the project**

```bash
  git clone git@github.com:aaronkik/aws-sso-account-filter.git
```

**Go to the project directory**

```bash
  cd aws-sso-account-filter
```

**Install dependencies**

```bash
  npm install
```

**Creating a build**

Run the following script:

```bash
  npm run build
```

Which will create an output to the root of the project under the `dist` folder which you can use to import the extension to your browser of choice.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Vitest

## Acknowledgements

- Background script inspired by - <https://github.com/axeleroy/aws-sso-auto-expand-accounts>
