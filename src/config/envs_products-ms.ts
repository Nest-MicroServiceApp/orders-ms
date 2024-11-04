

import  'dotenv/config';
import * as joi from 'joi';

interface EnvVars { 
    PRODUCT_MICROSERVICE_PORT : number;
    PRODUCT_MICROSERVICE_HOST : string;
}

const envsSchema = joi.object({
    PRODUCT_MICROSERVICE_PORT : joi.number().required(),
    PRODUCT_MICROSERVICE_HOST : joi.string().required(),

}).unknown(true);


const {error, value } = envsSchema.validate(process.env);


if(error){
    throw new Error(`Configuración de validación error: ${error.message}`)
}

const envsVars : EnvVars = value;
export const envs_prd = {
    port_prd: envsVars.PRODUCT_MICROSERVICE_PORT,
    host_prd : envsVars.PRODUCT_MICROSERVICE_HOST
}