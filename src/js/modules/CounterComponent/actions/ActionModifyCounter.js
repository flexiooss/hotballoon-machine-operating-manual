import {Action, ActionParams} from 'hotballoon'
import {PayloadModifyCounter} from './PayloadModifyCounter'

const ACTIONS_COUNTER_SUM = 'ACTIONS_COUNTER_SUM'

/**
 * @extends Action
 */
export class ActionModifyCounter extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_COUNTER_SUM, PayloadModifyCounter))
  }
}
