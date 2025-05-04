import { CredentialOffer, TxCode } from '../types/credential_offer';
import { generateRandom } from '../utils';
import { customAlphabet } from 'nanoid';

export class CredentialOfferGenerator {
  private readonly numbericCodeGen = customAlphabet('1234567890', 4);
  private readonly textCodeGen = customAlphabet(
    '123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
    4,
  );

  constructor(
    private readonly credential_issuer: string,
    private readonly protocolName: string = 'openid-credential-offer',
  ) {}

  /**
   * Generate credential offer URI by key
   *
   * @param key - Key of credential offer URI
   * @param path - Path of credential offer URI (Optional) default is '/oid4vci/credential-offer/'
   * @returns Credential offer URI
   */
  byRef(key: string, path: string = '/oid4vci/credential-offer/') {
    const params = new URLSearchParams({
      credential_offer_uri: `${this.credential_issuer}${path}${key}`,
    });
    return `${this.protocolName}://?${params.toString()}`;
  }

  /**
   * Generate credential offer by value
   *
   * @param credential_offer - Credential offer object
   * @returns Credential offer URI
   */
  byValue(credential_offer: CredentialOffer) {
    const params = new URLSearchParams({
      credential_offer: JSON.stringify(credential_offer),
    });
    return `${this.protocolName}://?${params.toString()}`;
  }

  /**
   * Generate transaction code
   *
   * @param tx_code - Transaction code
   * @returns Transaction code value(string)
   */
  txcode(tx_code: TxCode): string {
    const { input_mode = 'numeric', length } = tx_code;
    switch (input_mode) {
      case 'numeric': {
        return this.numbericCodeGen(length);
      }
      case 'text': {
        return this.textCodeGen(length);
      }
    }
  }

  /**
   * Generate pre-authorized code
   *
   * @returns Pre-authorized code (string)
   */
  pre_authorized_code(): string {
    return generateRandom(16);
  }
}
