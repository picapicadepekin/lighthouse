/**
 * @license Copyright 2019 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * @fileoverview Ensures heading levels should only ever increase by one.
 * See base class in axe-audit.js for audit() implementation.
 */

import AxeAudit from './axe-audit.js';

import * as i18n from '../../lib/i18n/i18n.js';

const UIStrings = {
  /** Title of an accesibility audit that checks if heading elements (<h1>, <h2>, etc) appear in numeric order and only ever increase in steps of 1. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: 'Heading elements appear in a sequentially-descending order',
  /** Title of an accesibility audit that checks if heading elements (<h1>, <h2>, etc) appear in numeric order and only ever increase in steps of 1. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: 'Heading elements are not in a sequentially-descending order',
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
  description: 'Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more](https://dequeuniversity.com/rules/axe/4.4/heading-order).',
};

const str_ = i18n.createMessageInstanceIdFn(import.meta.url, UIStrings);

class HeadingOrder extends AxeAudit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'heading-order',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ['Accessibility'],
    };
  }
}

export default HeadingOrder;
export {UIStrings};
