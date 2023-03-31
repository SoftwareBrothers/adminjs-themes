export type AppConfig = {
  port: number;
  env: string;
  stage: string;
};

export const config: AppConfig = {
  port: +(process.env.PORT ?? '3000'),
  env: process.env.NODE_ENV ?? 'development',
  stage: process.env.STAGE ?? 'development',
};
