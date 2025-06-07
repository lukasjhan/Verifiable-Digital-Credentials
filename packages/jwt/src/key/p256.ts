import { p256 } from '@noble/curves/nist';
import { bytesToHex } from '@noble/curves/abstract/utils';
import { uint8ArrayToBase64Url } from '@sd-jwt/utils';
import { Base64 } from 'js-base64';
import { bigIntTo32Bytes } from '../utils';
import { EcPrivateJwk, EcPublicJwk } from '../type';

const generateKeyPair = () => {
  const privateKey = p256.utils.randomPrivateKey();
  const publicKey = p256.getPublicKey(privateKey);
  return { privateKey, publicKey };
};

const privateKeyUint8ArrayToJwk = (
  privateKeyBytes: Uint8Array,
): EcPrivateJwk => {
  if (privateKeyBytes.length !== 32) {
    throw new Error('Invalid private key length. Must be 32 bytes.');
  }

  const publicKeyBytes = p256.getPublicKey(privateKeyBytes, false);

  const d = uint8ArrayToBase64Url(privateKeyBytes);
  const x = uint8ArrayToBase64Url(publicKeyBytes.slice(1, 33));
  const y = uint8ArrayToBase64Url(publicKeyBytes.slice(33, 65));

  return {
    kty: 'EC',
    crv: 'P-256',
    d,
    x,
    y,
  };
};

const privateKeyJwkToUint8Array = (jwk: EcPrivateJwk): Uint8Array => {
  if (!jwk.d) {
    throw new Error('Invalid private JWK: missing "d" parameter.');
  }
  const privateKeyBytes = Base64.toUint8Array(jwk.d);
  if (privateKeyBytes.length !== 32) {
    throw new Error('Invalid "d" parameter length. Must decode to 32 bytes.');
  }
  return privateKeyBytes;
};

const publicKeyUint8ArrayToJwk = (publicKeyBytes: Uint8Array): EcPublicJwk => {
  if (publicKeyBytes.length !== 33 && publicKeyBytes.length !== 65) {
    throw new Error(
      'Invalid public key length. Must be 33 (compressed) or 65 (uncompressed) bytes.',
    );
  }

  const point = p256.Point.fromHex(bytesToHex(publicKeyBytes));

  const x = uint8ArrayToBase64Url(bigIntTo32Bytes(point.x));
  const y = uint8ArrayToBase64Url(bigIntTo32Bytes(point.y));

  return {
    kty: 'EC',
    crv: 'P-256',
    x,
    y,
  };
};

const publicKeyJwkToUint8Array = (
  jwk: EcPublicJwk,
  compressed = false,
): Uint8Array => {
  const xBytes = Base64.toUint8Array(jwk.x);
  const yBytes = Base64.toUint8Array(jwk.y);

  const uncompressedPublicKey = new Uint8Array(65);
  uncompressedPublicKey[0] = 4; // uncompressed public key prefix: 0x04
  uncompressedPublicKey.set(xBytes, 1);
  uncompressedPublicKey.set(yBytes, 33);

  const point = p256.Point.fromHex(bytesToHex(uncompressedPublicKey));
  return point.toRawBytes(compressed);
};

const sign = (data: Uint8Array, privateKey: Uint8Array): Uint8Array => {
  const signature = p256.sign(data, privateKey);
  return signature.toCompactRawBytes();
};

const verify = (
  msgHash: Uint8Array,
  signature: Uint8Array,
  publicKey: Uint8Array,
): boolean => {
  return p256.verify(signature, msgHash, publicKey);
};

export const P256 = {
  generateKeyPair,
  privateKeyUint8ArrayToJwk,
  privateKeyJwkToUint8Array,
  publicKeyUint8ArrayToJwk,
  publicKeyJwkToUint8Array,
  sign,
  verify,
};
