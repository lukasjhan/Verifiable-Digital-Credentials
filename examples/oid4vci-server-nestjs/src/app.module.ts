import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Oid4VciModule } from '@vdcs/oid4vci-nestjs';

@Module({
  imports: [
    Oid4VciModule.register({
      meta: {
        credential_issuer: 'http://localhost:3000',
        credential_configurations_supported: {
          UniversityDegreeCredential: {
            format: 'dc+sd-jwt',
            display: [
              {
                name: 'Hopae University Degree',
                locale: 'en',
              },
            ],
          },
          VaccinationCredential: {
            format: 'dc+sd-jwt',
            display: [
              {
                name: 'Vaccination Certificate',
                locale: 'en',
              },
            ],
          },
          DriverLicenseCredential: {
            format: 'mso_mdoc',
            display: [
              {
                name: 'Driver License',
                locale: 'en',
              },
            ],
          },
        },
        display: [
          {
            name: 'Hopae Demo Issuer',
            locale: 'en',
            logo: {
              uri: 'https://static.hopae.com/images/wallets/hopae.png',
            },
          },
        ],
      },
      nonce: {
        secret: 'secret',
      },
      jwks: {
        keys: [],
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
