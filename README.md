# Playwright Automation Framework

An automation framework built using [Playwright](https://playwright.dev/). This framrwork is for testing an ecommerce website to ensure features are functioning correctly and user journeys are working as intended.

It currently targets [Amazon](https://amazon.co.uk), but can be translated to other domains.

## Quick Start Guide:

- Ensure the following:
  - You have the following installed - typically using [Brew](https://brew.sh/)
    1. NodeJS - Recommended to use [NVM](https://github.com/nvm-sh/nvm)
    2. [Git](https://git-scm.com/)
  - IDE of your choice - Highly advised to use [VSCode](https://code.visualstudio.com/)
  - Setup SSH with GitLab - [Guide](https://docs.gitlab.com/ee/user/ssh.html)
- Copy & Paste the following into your terminal

```
git clone git@gitlab.com:HnBI/qa-test/bx-online/content_e2e.git
sh content_e2e/scripts/install.sh
code content_e2e
```

The above command will:

- Clone the repo
- Add the 'code' command to your $PATH
- Ensure Git ignores the Pages branch
- Install Node Modules
- Install VSCode Extensions
- Ensure you have a local config for playwright
- Then open the repo in VSCode

**More Information**
More Info can be found on my [portfolio](benweston.dev)
