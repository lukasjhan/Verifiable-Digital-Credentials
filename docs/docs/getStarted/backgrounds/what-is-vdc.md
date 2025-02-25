---
sidebar_position: 1
---

# What is VDC?

## What is a Verifiable Digital Credential (VDC)?

A Verifiable Digital Credential (VDC) is a cryptographically secure digital representation of a physical credential or attribute that can be stored, managed, and presented electronically. Unlike conventional digital copies of documents, VDCs incorporate mechanisms that allow recipients to verify their authenticity and integrity without needing to contact the original issuer directly.

## Core Characteristics of VDCs

### Digital Format

VDCs exist purely in digital form, typically stored within specialized applications called digital wallets on smartphones or other personal devices. This digital nature eliminates the need to carry physical cards or documents while maintaining the same functionality.

### Cryptographic Security

The foundation of VDCs is public key cryptography. When an issuer creates a VDC, they digitally sign it using their private key. This signature can later be verified using the issuer's public key, confirming that the credential was indeed issued by the claimed authority and hasn't been tampered with.

### Selective Disclosure

Unlike physical credentials which must be presented in their entirety, VDCs often support selective disclosure capabilities. This means users can choose to share only specific pieces of information from their credential. For example, a person might use their driver's license VDC to prove they are over 21 without revealing their exact birthdate or home address.

### Offline Verification

Many VDC implementations support offline verification, meaning credentials can be presented and verified without an internet connection. This is particularly valuable in scenarios where connectivity might be limited.

## Types of Verifiable Digital Credentials

VDCs encompass a wide range of credential types, including:

- **Government-issued IDs**: Driver's licenses, passports, national ID cards
- **Educational credentials**: Diplomas, degrees, certificates, transcripts
- **Professional qualifications**: Occupational licenses, certifications
- **Healthcare documentation**: Insurance cards, vaccination records, prescriptions
- **Membership credentials**: Loyalty programs, gym memberships, library cards
- **Access credentials**: Building access cards, event tickets

## Technical Standards

VDCs are built upon several emerging technical standards, including:

- **W3C Verifiable Credentials Data Model**: Provides a standard way to express credentials on the web
- **ISO/IEC 18013-5**: Standard for mobile driver's license (mDL) implementation
- **OpenID Connect**: Authentication protocol that can be used for presenting VDCs online
- **Decentralized Identifiers (DIDs)**: A W3C specification for globally unique identifiers
- **SD-JWT VC**: Standard for verifiable credentials using JWT that provides selective disclosure capabilities

Together, these standards help ensure interoperability across different VDC implementations, allowing credentials issued by one organization to be verified by systems operated by other entities.

## Differentiation from Other Digital Documents

It's important to distinguish VDCs from simple digital documents or images of credentials:

| Characteristic        | Standard Digital Document | Verifiable Digital Credential |
| --------------------- | ------------------------- | ----------------------------- |
| Tampering Prevention  | Limited or none           | Cryptographically secured     |
| Verification Method   | Visual inspection         | Cryptographic verification    |
| Revocation Capability | Difficult to implement    | Built into the system         |
| Privacy Controls      | All-or-nothing sharing    | Selective disclosure possible |
| Offline Usage         | Usually possible          | Often supported               |

VDCs represent a significant advancement in how we manage and present identity information, offering enhanced security, privacy, and convenience compared to both physical credentials and conventional digital documents.
