import {ActionChangeView} from '../ActionChangeView/ActionChangeView'
import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

export class ListenActionInitializeViewParams {
  constructor(actionInitializeView, actionChangeView) {
    assert(TypeCheck.isAction(actionInitializeView),
      'ComponentDoc:ListenActionInitializeViewParams: actionInitializeView should be an action, %s given'
    )
    assert(TypeCheck.isAction(actionChangeView),
      'ComponentDoc:ListenActionInitializeViewParams: actionChangeView should be an action, %s given'
    )

    this.actionInitializeView = actionInitializeView
    this.actionChangeView = actionChangeView
  }
}

/**
 *
 * @param {ListenActionInitializeViewParams} params
 */
export const listenActionInitializeView = (params) => {
  params.actionInitializeView
    .listenWithCallback((payload) => {
      params.actionChangeView
        .dispatch(
          new ActionChangeView()
        )
    })
}
