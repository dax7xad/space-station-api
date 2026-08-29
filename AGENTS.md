# space-station-api

API REST pública (sin autenticación) para un ejercicio de Salesforce Trailhead.
Salesforce la consume como External Service (OpenAPI 3.0) desde un Flow.

Este API es **externo**. No es código Salesforce.

## Stack obligatorio

- Node.js
- TypeScript
- Express
- Datos de ejemplo con `@faker-js/faker`

No uses otro runtime, framework HTTP ni generador de fake data.

## Contrato público

Campos en **camelCase** de API pública. Nunca uses nomenclatura de Salesforce:

- Prohibido: sufijos `__c`, API names internos, labels de objetos Salesforce.
- Prohibido en JSON, tipos TypeScript, nombres de archivo y OpenAPI.

### Modelos

**spaceStation**
- `name`: string
- `projectStatus`: string
- `shieldStatus`: string

**resources[]** (personal de la estación)
- `name`: string — uno de: Personnel, Engineers, Mechanics, Doctors, Nurses, Pilots, Astronauts
- `quantity`: number (entero positivo)
- `utilization`: number (porcentaje 1–100)

**supplies[]**
- `name`: string
- `quantity`: number (entero positivo)
- `unitCost`: number (decimal positivo, 2 decimales)

No incluir `totalCost`. Lo calcula Salesforce.

## Reglas de negocio / inicialización

- `projectStatus` **siempre** es `"Green"`. No randomizar. No usar Yellow, Red ni Complete.
- `shieldStatus` **siempre** es `"Not Yet Operational"`. No randomizar. No usar `"Fully Operational"`.
- `quantity` de resources y supplies: enteros positivos.
- `utilization`: número entre 1 y 100.
- `unitCost`: decimal positivo con 2 decimales.
- Nombres de estación, resources y supplies: generarlos con faker.

## Salesforce External Services

Restricciones que el API **debe** cumplir al implementarse:

- REST sobre HTTPS en publicación. HTTP local solo para desarrollo.
- Spec OpenAPI **3.0 en JSON** (no YAML, no 3.1). Salesforce acepta 2.0 o 3.0; usamos 3.0.
- Servir la spec en `GET /schema` (JSON), además de la app.
- Cada operación del spec con `operationId` único y estable (`getStation`, `getHealth`). Servir la spec en `GET /schema` sin incluir `/schema` en `paths`.
- Schemas nombrados y referenciados con `$ref`. Nada de objetos anónimos inline.
- Respuesta 200 con schema `$ref`. Incluir `errorModel` para 400/404/500 (`errorCode`, `errorMessage`).
- `Content-Type: application/json`.
- Sin `security` schemes en el spec. El API no pide autenticación. Salesforce usará Named Credential con No Authentication.
- Prohibido en OpenAPI: `anyOf`, `oneOf`, `additionalProperties`, `nullable`.
- Tipos simples: `string`, `integer`, `number`, `boolean`, `array` de `$ref`.
- El Flow hace GET y después inserta en Salesforce. El API solo lee/devuelve datos; no recibe IDs de Salesforce.
- Mismos nombres camelCase del JSON público. Sin `__c` ni nombres internos de Salesforce.

## Convenciones de código

- TypeScript estricto.
- Sin comentarios salvo que se pidan.
- No commitear secretos.
- No instalar paquetes ni implementar código hasta que el usuario apruebe el plan.
