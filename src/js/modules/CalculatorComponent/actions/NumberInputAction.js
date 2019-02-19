import {Action, ActionParams} from 'hotballoon'
import {NumberInputPayload} from './NumberInputPayload'

const ACTIONS_ADD_NUMBER = 'ACTIONS_ADD_NUMBER'

/**
 * @extends Action
 */
export class NumberInputAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_ADD_NUMBER, NumberInputPayload))
  }
}
