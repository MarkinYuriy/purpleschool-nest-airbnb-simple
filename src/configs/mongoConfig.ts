import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(configService),
  };
};
const getMongoString = (configService: ConfigService): string => {
  const str =
    'mongodb://' +
    configService.get<string>('MONGO_LOGIN') +
    ':' +
    configService.get<string>('MONGO_PASSWORD') +
    '@' +
    configService.get<string>('MONGO_HOST') +
    ':' +
    configService.get<string>('MONGO_PORT') +
    '/' +
    configService.get<string>('MONGO_AUTH_DB');
  return str;
};
const getMongoOptions = (configService: ConfigService) => ({
  // useNewUrlParser: true,
  autoIndex: true,
  autoCreate: true,
  sanitizeFilter: true,
  dbName: configService.get<string>('MONGO_DB'),
  user: configService.get<string>('MONGO_LOGIN'),
  pass: configService.get<string>('MONGO_PASSWORD'),
});
