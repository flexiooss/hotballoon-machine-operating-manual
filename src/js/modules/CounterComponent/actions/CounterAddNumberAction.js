import {Action, ActionParams, ActionPayload} from 'hotballoon'
import {CounterAddNumberPayload} from './CounterAddNumberPayload'

const ACTIONS_COUNTER_SUM = Symbol('ACTIONS_COUNTER_SUM')

/**
 * @extends Action
 */
export class CounterAddNumberAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_COUNTER_SUM, CounterAddNumberPayload))
  }
}