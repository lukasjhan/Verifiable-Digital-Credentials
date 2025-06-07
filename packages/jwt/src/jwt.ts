import { EcPublicJwk, JWTOptions, JWTResult } from './type';
import {
  base64urlDecode,
  base64urlEncode,
  uint8ArrayToBase64Url,
} from '@sd-jwt/utils';
import { EcPrivateJwk } from './type';
import { normalizePrivateKey, normalizePublicKey } from './utils';
import { P256 } from './key/p256';
import { sha256 } from '@sd-jwt/hash';
import { Base64 } from 'js-base64';

export const signJWT = (
  options: JWTOptions,
  privateKey: Uint8Array | EcPrivateJwk,
): string => {
  const header = base64urlEncode(JSON.stringify(options.header));
  const payload = base64urlEncode(JSON.stringify(options.payload));
  const sigData = `${header}.${payload}`;

  const normalizedPrivateKey = normalizePrivateKey(privateKey);
  const signingInputBytes = sha256(sigData);
  const signature = P256.sign(signingInputBytes, normalizedPrivateKey);
  const base64UrlSignature = uint8ArrayToBase64Url(signature);
  return `${sigData}.${base64UrlSignature}`;
};

export const decodeJWT = (compact: string): JWTResult => {
  try {
    const [encodedHeader, encodedPayload] = compact.split('.');
    const header = JSON.parse(base64urlDecode(encodedHeader));
    const payload = JSON.parse(base64urlDecode(encodedPayload));
    return { header, payload };
  } catch (e) {
    throw new Error('Invalid JWT');
  }
};

export const verifyJWT = (
  compact: string,
  publicKey: Uint8Array | EcPublicJwk,
): JWTResult => {
  const [encodedHeader, encodedPayload, encodedSignature] = compact.split('.');
  const normalizedPublicKey = normalizePublicKey(publicKey);
  const signingInputBytes = sha256(`${encodedHeader}.${encodedPayload}`);
  const result = P256.verify(
    signingInputBytes,
    Base64.toUint8Array(encodedSignature),
    normalizedPublicKey,
  );
  if (!result) {
    throw new Error('Invalid signature');
  }
  return decodeJWT(compact);
};
