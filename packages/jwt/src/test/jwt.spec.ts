import { describe, expect, test } from 'vitest';
import * as jose from 'jose';
import { signJWT, verifyJWT, decodeJWT } from '../jwt';
import { base64urlDecode } from '@sd-jwt/utils';

describe('JWT Implementation', () => {
  const jwk = {
    kty: 'EC',
    d: 'hUQznqxINndxBHI8hMHvQmgSjYOCSqLUwMtzWCrh4ow',
    crv: 'P-256',
    x: 'ifSgGMkEIEDPsxFxdOjeJxhYsz0STsTT5bni_MXNEJs',
    y: 'viFDEvB61K6zuj2iq23j0FCmVYYQ8tGJ_3f35XXUDZ0',
  } as const;

  const pubJwk = {
    kty: 'EC',
    crv: 'P-256',
    x: 'ifSgGMkEIEDPsxFxdOjeJxhYsz0STsTT5bni_MXNEJs',
    y: 'viFDEvB61K6zuj2iq23j0FCmVYYQ8tGJ_3f35XXUDZ0',
    alg: 'ES256',
  } as const;

  // Standard test payload
  const testPayload = {
    iss: 'https://gemini.google.com',
    sub: 'user-12345',
    name: 'Gemini AI',
  };

  // Standard test header
  const testHeader = {
    alg: 'ES256',
    typ: 'JWT',
  };

  test('should sign JWT that can be verified with jose', async () => {
    // Sign JWT with our implementation
    const jwtString = signJWT(
      { header: testHeader, payload: testPayload },
      jwk,
    );

    // Verify the structure of the JWT
    const parts = jwtString.split('.');
    expect(parts).toHaveLength(3);

    // Parse the header and verify it's correct
    const headerJson = JSON.parse(base64urlDecode(parts[0]));
    expect(headerJson).toEqual(testHeader);

    // Parse the payload and verify it's correct
    const payloadJson = JSON.parse(base64urlDecode(parts[1]));
    expect(payloadJson).toEqual(testPayload);

    // Verify with jose
    const result = await jose.jwtVerify(jwtString, pubJwk, {
      algorithms: ['ES256'],
    });

    // Verify the payload matches
    expect(result.payload).toEqual(expect.objectContaining(testPayload));
  });

  (process.env.npm_lifecycle_event === 'test:browser' ? test.skip : test)(
    'should verify JWT created with jose',
    async () => {
      // Sign JWT with jose
      const key = await jose.importJWK(jwk, 'ES256');
      const jwtString = await new jose.SignJWT(testPayload)
        .setProtectedHeader(testHeader)
        .sign(key);

      // Verify using our implementation
      const result = verifyJWT(jwtString, pubJwk);

      // Verify the result matches the expected structure
      expect(result.header).toEqual(expect.objectContaining(testHeader));
      expect(result.payload).toEqual(expect.objectContaining(testPayload));
    },
  );

  test('decodeJWT should parse JWT correctly', () => {
    // Create a JWT
    const jwtString = signJWT(
      { header: testHeader, payload: testPayload },
      jwk,
    );

    // Decode it without verification
    const decoded = decodeJWT(jwtString);

    // Verify the decoded content
    expect(decoded.header).toEqual(testHeader);
    expect(decoded.payload).toEqual(testPayload);
  });

  test('verifyJWT should throw for invalid signature', async () => {
    // Create a valid JWT
    const jwtString = signJWT(
      { header: testHeader, payload: testPayload },
      jwk,
    );

    // Tamper with the signature
    const parts = jwtString.split('.');
    const tamperedJwt = `${parts[0]}.${parts[1]}.invalidSignature`;

    // Verify it fails
    expect(() => verifyJWT(tamperedJwt, pubJwk)).toThrow('Invalid signature');
  });
});
