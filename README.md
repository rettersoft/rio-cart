## Rio Cart Cloud Objects
 
 - This repository contains the source code for the Rio Cart Project
 - Maintained by Retter Rio Developers

### [Code of Conduct](#code-conduct)
 - Write code that is clean and well-commented
 - Add unit tests and test coverage for all possible cases
 - Be agile and work in small chunks
 - Be open and honest
 - Code Review, Code Review, Code Review
 - Pull requests are welcome (but with tests)
 - Follow best practices and share your knowledge

### [Points of a Pull Request](#pull-request)
 - Code quality (readable, clean, well-commented, testable)
 - Code coverage
 - Unit tests
 - Documentation
 - Code style
 - Rio Architecture practices
 - Validation Models (Input, Output, Error, QueryParams)
 - Security (no secrets, no passwords, no secrets, authorization, etc)

### [Points of a Code Review](#code-review)
 - Be friendly and open
 - Be respectful of the code of conduct
 - No more than 30 minutes, not in seconds
 - Check for code quality
 - Check for Rio Architecture practices
 - Be Responsive (no more than 2 days)

### [Fast Onboarding](#onboarding)
 This is a standard Cloud Objects project written in TypeScript. For this reason, a developer can use the following commands to get started:
    
- Setup NodeJS Environment (npm, yarn, npx, etc)
- Install TypeScript (tsc, tslint, ts-node, etc)
- Install Rio CLI and setup profile (@retter/rio-cli setup)
- Choose a professional editor (vscode, webstorm, sublime, atom, etc)
- User Github CoPilot as a developer pair
- Test tools (*ava*, *sinon*) (*jest, mocha will be removed*)
- Use [EditorConfig](https://editorconfig.org/) for VSCode with plugin [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### Code Structure

```
├── classes
│   ├── BackofficeManager (Singleton Manager Class)
│   ├── BackofficeUser
│   ├── Billing
│   ├── CDH
│   ├── CMS (Singleton Manager Class)
│   ├── Cart
│   ├── Homepage (Singleton Manager Class)
│   ├── Image
│   ├── MsisdnAuthenticator
│   ├── Order
│   ├── Places
│   ├── Product
│   ├── ProductManager (Singleton Manager Class)
│   ├── Store
│   ├── StoreManager (Singleton Manager Class)
│   └── User
├── cloud-dependencies
│   └── store-catalog
├── commonSchemas
│   ├── billingSchemas.ts
│   ├── cartSchemas.ts
│   ├── modelGenerator.ts
│   └── orderSchemas.ts
├── dependencies
│   ├── product-utils
│   └── utils
├── jest.config.js
├── models
│   └── ...
├── nyc.config.cjs
├── package.json
├── readme.md
├── scripts
│   └── caret-checker.ts
├── test
│   ├── models
│   └── user
├── tsconfig.json
└── types
    └── utils
```

 **All rights are reserved.**
