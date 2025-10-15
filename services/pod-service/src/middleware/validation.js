const Joi = require('joi');

const podSchema = Joi.object({
    name: Joi.string().required(),
    podId: Joi.string().required(),
    type: Joi.string().valid('autonomous', 'semi-autonomous', 'manual').required(),
    category: Joi.string().valid('passenger', 'cargo', 'service').required(),
    status: Joi.string().valid('active', 'charging', 'offline', 'maintenance', 'emergency'),
    // Add other fields as needed
});


const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = {
  validate,
  podSchema,
};