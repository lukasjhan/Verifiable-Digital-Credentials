import { describe, expect, test } from 'vitest';
import {
  bigIntTo32Bytes,
  normalizePrivateKey,
  normalizePublicKey,
} from '../utils';

describe('Utils', () => {
  test('should convert a small bigint to 32 bytes with padding', () => {
    const num = BigInt(123);
    const result = bigIntTo32Bytes(num);

    // Should be 32 bytes long
    expect(result.length).toBe(32);
    // First bytes should be zeros (padding)
    expect(result.slice(0, 31).every((byte) => byte === 0)).toBe(true);
    // Last byte should be 123 (0x7B)
    expect(result[31]).toBe(123);
  });

  test('should normalize private key', () => {
    const privateKey = new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ]);
    const normalizedPrivateKey = normalizePrivateKey(privateKey);
    expect(normalizedPrivateKey).toEqual(privateKey);
  });

  test('should normalize private key with JWK', () => {
    const jwk = {
      kty: 'EC',
      d: 'hUQznqxINndxBHI8hMHvQmgSjYOCSqLUwMtzWCrh4ow',
      use: 'sig',
      crv: 'P-256',
      x: 'ifSgGMkEIEDPsxFxdOjeJxhYsz0STsTT5bni_MXNEJs',
      y: 'viFDEvB61K6zuj2iq23j0FCmVYYQ8tGJ_3f35XXUDZ0',
      alg: 'ES256',
    } as const;
    const normalizedPrivateKey = normalizePrivateKey(jwk);
    const pkey = new Uint8Array([
      133, 68, 51, 158, 172, 72, 54, 119, 113, 4, 114, 60, 132, 193, 239, 66,
      104, 18, 141, 131, 130, 74, 162, 212, 192, 203, 115, 88, 42, 225, 226,
      140,
    ]);
    expect(normalizedPrivateKey).toEqual(pkey);
  });

  test('should normalize public key', () => {
    const publicKey = new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ]);
    const normalizedPublicKey = normalizePublicKey(publicKey);
    expect(normalizedPublicKey).toEqual(publicKey);
  });

  test('should normalize public key with JWK', () => {
    const pubJwk = {
      kty: 'EC',
      crv: 'P-256',
      x: 'ifSgGMkEIEDPsxFxdOjeJxhYsz0STsTT5bni_MXNEJs',
      y: 'viFDEvB61K6zuj2iq23j0FCmVYYQ8tGJ_3f35XXUDZ0',
      alg: 'ES256',
    } as const;

    const normalizedPublicKey = normalizePublicKey(pubJwk);
    const pkey = new Uint8Array([
      4, 137, 244, 160, 24, 201, 4, 32, 64, 207, 179, 17, 113, 116, 232, 222,
      39, 24, 88, 179, 61, 18, 78, 196, 211, 229, 185, 226, 252, 197, 205, 16,
      155, 190, 33, 67, 18, 240, 122, 212, 174, 179, 186, 61, 162, 171, 109,
      227, 208, 80, 166, 85, 134, 16, 242, 209, 137, 255, 119, 247, 229, 117,
      212, 13, 157,
    ]);
    expect(normalizedPublicKey).toEqual(pkey);
  });
});
