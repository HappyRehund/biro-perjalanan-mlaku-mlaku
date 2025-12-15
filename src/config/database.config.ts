import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => {
    const databaseUrl = configService.get<string>("DATABASE_URL");

    if (databaseUrl) {
        return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    return {
        type: 'postgres',
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        autoLoadEntities: true
    };
}