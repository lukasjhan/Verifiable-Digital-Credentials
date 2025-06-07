import { describe, expect, test } from 'vitest';
import { p256 } from '@noble/curves/nist';
import { bytesToHex } from '@noble/curves/abstract/utils';
import { P256 } from '../key/p256';

describe('P-256 Key Conversion', () => {
  test('should convert private key between Uint8Array and JWK format', () => {
    // Generate random private key
    const originalPrivateKey = p256.utils.randomPrivateKey();

    // Uint8Array -> Private JWK
    const privateJwk = P256.privateKeyUint8ArrayToJwk(originalPrivateKey);

    // Verify JWK structure
    expect(privateJwk.kty).toBe('EC');
    expect(privateJwk.crv).toBe('P-256');
    expect(typeof privateJwk.d).toBe('string');
    expect(typeof privateJwk.x).toBe('string');
    expect(typeof privateJwk.y).toBe('string');

    // Private JWK -> Uint8Array
    const restoredPrivateKey = P256.privateKeyJwkToUint8Array(privateJwk);

    // Verify keys match after conversion
    expect(bytesToHex(restoredPrivateKey)).toBe(bytesToHex(originalPrivateKey));
  });

  test('should convert uncompressed public key between Uint8Array and JWK format', () => {
    // Generate random private key and derive uncompressed public key
    const privateKey = p256.utils.randomPrivateKey();
    const originalUncompressedPublicKey = p256.getPublicKey(privateKey, false);

    // Uint8Array -> Public JWK
    const publicJwk = P256.publicKeyUint8ArrayToJwk(
      originalUncompressedPublicKey,
    );

    // Verify JWK structure
    expect(publicJwk.kty).toBe('EC');
    expect(publicJwk.crv).toBe('P-256');
    expect(typeof publicJwk.x).toBe('string');
    expect(typeof publicJwk.y).toBe('string');

    // Public JWK -> Uint8Array (uncompressed)
    const restoredUncompressedPublicKey = P256.publicKeyJwkToUint8Array(
      publicJwk,
      false,
    );

    // Verify keys match after conversion
    expect(bytesToHex(restoredUncompressedPublicKey)).toBe(
      bytesToHex(originalUncompressedPublicKey),
    );
  });

  test('should convert compressed public key between Uint8Array and JWK format', () => {
    // Generate random private key and derive compressed public key
    const privateKey = p256.utils.randomPrivateKey();
    const originalCompressedPublicKey = p256.getPublicKey(privateKey, true);

    // Get JWK from uncompressed form (since our function expects uncompressed input)
    const uncompressedPublicKey = p256.getPublicKey(privateKey, false);
    const publicJwk = P256.publicKeyUint8ArrayToJwk(uncompressedPublicKey);

    // Convert JWK back to compressed format
    const restoredCompressedPublicKey = P256.publicKeyJwkToUint8Array(
      publicJwk,
      true,
    );

    // Verify keys match after conversion
    expect(bytesToHex(restoredCompressedPublicKey)).toBe(
      bytesToHex(originalCompressedPublicKey),
    );
  });
});
