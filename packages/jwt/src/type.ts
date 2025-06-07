export type JWTResult = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
};

export type JWTOptions = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
};

// TODO: expand to P-384 and P-521
export interface EcPublicJwk {
  kty: 'EC';
  crv: 'P-256';
  x: string; // Base64URL
  y: string; // Base64URL
  kid?: string;
}

export interface EcPrivateJwk extends EcPublicJwk {
  d: string; // Base64URL
}
