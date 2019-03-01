import {Action, ActionParams} from 'hotballoon'
import {PayloadTransaction} from './PayloadTransaction'

const ACTIONS_TRANSACTION = 'ACTIONS_TRANSACTION'

/**
 * @extends Action
 */
export class ActionTransaction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_TRANSACTION, PayloadTransaction))
  }
}
