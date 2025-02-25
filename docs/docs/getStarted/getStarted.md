---
sidebar_position: 2
---

# Getting Started with VDCS

Welcome to the Verifiable Digital Credential System (VDCS) project. This guide will help you get up and running with our libraries and tools for implementing VDC solutions across different platforms.

## System Requirements

Before you begin, ensure your development environment meets the following requirements:

- **Node.js**: Version 18 or higher
- **TypeScript**: Version 5.7 or higher
- **Package Manager**: npm, yarn, or pnpm

## Library Organization

All VDCS libraries are published under the `@vdcs/` organization namespace on npm. Our libraries follow a unified versioning strategy to ensure compatibility when using multiple packages together.

### Core Concepts

- **Unified Versioning**: All libraries share the same version number within a release
- **Cross-Platform Support**: Libraries support various JavaScript environments (Node.js, browsers, React Native)
- **Platform-Specific Implementations**: Some functionality may have dedicated packages for different platforms

## Installation

To install any VDCS library, use your preferred package manager:

```bash
# Using npm
npm install @vdcs/core @vdcs/wallet

# Using yarn
yarn add @vdcs/core @vdcs/wallet

# Using pnpm
pnpm add @vdcs/core @vdcs/wallet
```

### Version Compatibility

When using multiple VDCS libraries together, always use the same version to ensure compatibility:

```json
{
  "dependencies": {
    "@vdcs/core": "1.2.0",
    "@vdcs/wallet": "1.2.0",
    "@vdcs/verifier": "1.2.0"
  }
}
```

## Platform Support

> Note: This is currently as an example

Our libraries support various JavaScript environments, but not all libraries support all platforms. The table below provides a general overview of platform support:

| Library             | Node.js | Browser | React Native |
| ------------------- | ------- | ------- | ------------ |
| @vdcs/core          | ✅      | ✅      | ✅           |
| @vdcs/wallet        | ✅      | ✅      | ✅           |
| @vdcs/issuer        | ✅      | ❌      | ❌           |
| @vdcs/verifier      | ✅      | ✅      | ✅           |
| @vdcs/trust-service | ✅      | ❌      | ❌           |
| @vdcs/wallet-mobile | ❌      | ❌      | ✅           |
| @vdcs/wallet-web    | ❌      | ✅      | ❌           |

Always check the README or documentation for each library to confirm its platform compatibility before integration.

## Best Practices

1. **Version Management**: Always use matching versions across all @vdcs/ packages
2. **Platform Verification**: Verify platform compatibility before integrating any library
3. **TypeScript Configuration**: Ensure your `tsconfig.json` is compatible with TypeScript 5.7+
4. **Security Considerations**: Follow the security guidelines in our documentation
5. **Updates**: Subscribe to our release notifications for important updates and security patches

## Next Steps

Now that you've set up the basic components, explore these resources to continue your journey with VDCS:

- **API Documentation**: Comprehensive documentation for all libraries
- **Examples**: Complete examples for common VDC workflows
- **Tutorials**: Step-by-step guides for implementing specific features
- **Community**: Join our community forums for support and discussions

Happy building with VDCS!
