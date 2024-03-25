import { RCInternalError } from '@rubikon/libraries_v2/errorHandling';

export default class extends RCInternalError {
  constructor(msg) {
    super(msg);
  }
}
