import Joi from 'joi';

const create = Joi.object({
    title: Joi.string(),
    fileName: Joi.string(),
    fileContent: Joi.string(),
    filePath: Joi.string(),
    calculationResult: Joi.number(),
});

export default { create };
