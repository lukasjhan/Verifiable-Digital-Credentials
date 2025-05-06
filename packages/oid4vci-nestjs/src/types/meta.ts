import { CredentialConfigurationSupported } from './credential_configurations_supported';

export type CredentialIssuerMetadata = {
  credential_issuer: string;
  credential_endpoint: string;
  nonce_endpoint?: string;
  deferred_credential_endpoint?: string;
  notification_endpoint?: string;
  credential_response_encryption?: {
    batch_size: number;
  };
  signed_metadata?: string;
  display: Array<{ name: string; locale: string; logo?: { uri: string } }>;
  credential_configurations_supported: {
    [credentialConfigurationId: string]: CredentialConfigurationSupported;
  };
};
