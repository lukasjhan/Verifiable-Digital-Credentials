import { numberToBytesBE } from '@noble/curves/utils';
import { Base64 } from 'js-base64';
import { EcPrivateJwk, EcPublicJwk } from './type';
import { P256 } from './key/p256';

const fromBase64Url = (base64Url: string): Uint8Array => {
  return Base64.toUint8Array(base64Url);
};

export const bigIntTo32Bytes = (num: bigint): Uint8Array => {
  const bytes = numberToBytesBE(num, 32);
  if (bytes.length > 32) {
    throw new Error('BigInt is too large for 32 bytes.');
  }
  const padded = new Uint8Array(32);
  padded.set(bytes, 32 - bytes.length);
  return padded;
};

export const normalizePrivateKey = (
  privateKey: Uint8Array | EcPrivateJwk,
): Uint8Array => {
  if (privateKey instanceof Uint8Array) {
    return privateKey;
  }
  if (!privateKey.d) {
    throw new Error('Invalid private JWK: missing "d" parameter.');
  }
  return fromBase64Url(privateKey.d);
};

export const normalizePublicKey = (
  publicKey: Uint8Array | EcPublicJwk,
): Uint8Array => {
  if (publicKey instanceof Uint8Array) {
    return publicKey;
  }
  if (!publicKey.x || !publicKey.y) {
    throw new Error('Invalid public JWK: missing "x" or "y" parameters.');
  }
  return P256.publicKeyJwkToUint8Array(publicKey);
};
