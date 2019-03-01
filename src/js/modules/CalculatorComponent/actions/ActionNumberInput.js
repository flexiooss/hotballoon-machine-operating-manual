import {Action, ActionParams} from 'hotballoon'
import {PayloadNumberInput} from './PayloadNumberInput'

const ACTIONS_ADD_NUMBER = 'ACTIONS_ADD_NUMBER'

/**
 * @extends Action
 */
export class ActionNumberInput extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_ADD_NUMBER, PayloadNumberInput))
  }
}
