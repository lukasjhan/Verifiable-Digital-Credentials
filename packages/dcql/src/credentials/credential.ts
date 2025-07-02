import { Credential, MatchResult } from '../type';

/**
 * This class represent a credential
 *
 *
 */
export abstract class CredentialBase {
  abstract getId(): string;

  abstract serialize(): Credential;

  abstract match(data: Record<string, unknown>[]): MatchResult;
}
