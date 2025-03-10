/**
 * @license Copyright 2018 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

import fs from 'fs';
import URL from '../url-shim.js';
import jsonld from 'jsonld';
import {LH_ROOT} from '../../../root.js';

const SCHEMA_ORG_HOST = 'schema.org';

/** @type {import('./assets/jsonldcontext.json')} */
const schemaOrgContext = JSON.parse(fs.readFileSync(
  LH_ROOT + '/lighthouse-core/lib/sd-validation/assets/jsonldcontext.json', 'utf-8'));

/**
 * Custom loader that prevents network calls and allows us to return local version of the
 * schema.org document
 * @param {string} schemaUrl
 * @return {Promise<import('jsonld').RemoteDocument>}
 */
async function documentLoader(schemaUrl) {
  let urlObj = null;

  try {
    // Give a dummy base URL so relative URLs will be considered valid.
    urlObj = new URL(schemaUrl, 'http://example.com');
  } catch (e) {
    throw new Error('Error parsing URL: ' + schemaUrl);
  }

  if (urlObj.host === SCHEMA_ORG_HOST && urlObj.pathname === '/') {
    return {
      document: schemaOrgContext,
    };
  } else {
    // We only process schema.org, for other schemas we return an empty object
    return {
      document: {},
    };
  }
}

/**
 * Takes JSON-LD object and normalizes it by following the expansion algorithm
 * (https://json-ld.org/spec/latest/json-ld-api/#expansion).
 *
 * @param {any} inputObject
 * @return {Promise<LH.StructuredData.ExpandedSchemaRepresentation|null>}
 */
export default async function expand(inputObject) {
  try {
    return await jsonld.expand(inputObject, {documentLoader});
  } catch (err) {
    // jsonld wraps real errors in a bunch of junk, so see we have an underlying error first
    if (err.details?.cause) throw err.details.cause;
    throw err;
  }
}
