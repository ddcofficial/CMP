const Joi = require('joi');

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASS: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string().required(),
}).unknown().required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`❌ Invalid .env config: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URI,
    options: {
      user: envVars.MONGO_USER,
      pass: envVars.MONGO_PASS,
    },
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expire: envVars.JWT_EXPIRE,
  },
};

module.exports = config;