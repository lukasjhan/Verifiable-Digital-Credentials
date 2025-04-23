import { Injectable } from '@nestjs/common';
import {
  CredentialRequestDto,
  DeferredCredentialRequestDto,
  NotificationRequestDto,
  TokenDto,
} from '@vdcs/oid4vci';
import { Jwt } from 'jsonwebtoken';

@Injectable()
export abstract class Oid4VciService {
  abstract handleCredentialRequest(
    tokenPayload: Jwt,
    dto: CredentialRequestDto,
  ): Promise<any>;
  abstract handleNonceRequest?(): Promise<any>;
  abstract handleDeferredCredentialRequest?(
    dto: DeferredCredentialRequestDto,
  ): Promise<any>;
  abstract handleNotificationRequest?(
    dto: NotificationRequestDto,
  ): Promise<void>;
  abstract handleCredentialOffer?(offerId: string): Promise<any>;
  abstract handleTokenRequest?(dto: TokenDto): Promise<any>;
}
