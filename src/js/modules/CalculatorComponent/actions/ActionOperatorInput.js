import {Action, ActionParams} from 'hotballoon'
import {PayloadOperatorInput} from './PayloadOperatorInput'

const ACTIONS_ADD_OPERATOR = 'ACTIONS_ADD_OPERATOR'

/**
 * @extends Action
 */
export class ActionOperatorInput extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_ADD_OPERATOR, PayloadOperatorInput))
  }
}
