import { Oid4VpClient } from '@vdcs/oid4vp-client';
import { SDJwtInstance } from '@sd-jwt/core';
import { ES256, digest } from '@sd-jwt/crypto-nodejs';
import { P256, normalizePrivateKey } from '@vdcs/jwt';
import { sha256 } from '@sd-jwt/hash';
import { uint8ArrayToBase64Url } from '@sd-jwt/utils';
const data = require('../credential.json');

const jwk = {
  kty: 'EC',
  d: 'hUQznqxINndxBHI8hMHvQmgSjYOCSqLUwMtzWCrh4ow',
  crv: 'P-256',
  x: 'ifSgGMkEIEDPsxFxdOjeJxhYsz0STsTT5bni_MXNEJs',
  y: 'viFDEvB61K6zuj2iq23j0FCmVYYQ8tGJ_3f35XXUDZ0',
} as const;

async function run() {
  const { credential } = data;

  const requestUri =
    'openid4vp://?client_id=https%3A%2F%2Ffunke.animo.id%2Foid4vp%2F019368ed-3787-7669-b7f4-8c012238e90d&request_uri=https%3A%2F%2Ffunke.animo.id%2Foid4vp%2F019368ed-3787-7669-b7f4-8c012238e90d%2Fauthorization-requests%2Fd4c1989d-25ec-4648-adf7-8e516760546e';
  const client = await Oid4VpClient.fromRequestUri(requestUri);
  console.log({
    request: client.request,
  });

  // const signer = await ES256.getSigner(jwk);

  const sdJwtInstance = new SDJwtInstance({
    hasher: digest,
    kbSignAlg: 'ES256',
    kbSigner: (data: string) => {
      const privateKey = normalizePrivateKey(jwk);
      const signingInputBytes = sha256(data);
      const signature = P256.sign(signingInputBytes, privateKey);
      const base64UrlSignature = uint8ArrayToBase64Url(signature);
      return base64UrlSignature;
    },
  });

  const kbPayload = {
    iat: Math.floor(Date.now() / 1000),
    aud: client.request.client_id,
    nonce: client.request.nonce,
  };

  const presentation = await sdJwtInstance.present(
    credential,
    {
      family_name: true,
      given_name: true,
      birth_date: true,
      age_over_18: true,
      issuance_date: true,
      expiry_date: true,
      issuing_country: true,
      issuing_authority: true,
    },
    { kb: { payload: kbPayload } },
  );

  const result = await client.sendPresentation({ '0': presentation });
  console.log({ result });
}

run().catch(console.error);
