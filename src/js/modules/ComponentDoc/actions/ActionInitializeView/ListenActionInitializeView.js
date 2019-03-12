import {ActionChangeView} from '../ActionChangeView/ActionChangeView'
import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {DocComponent} component
 */
export const listenActionInitializeView = (component) => {
  assert(component.__actionInitializeView !== 'undefined',
    'listenActionInitializeView: ActionInitializeView should be initialized before using it'
  )
  assert(component.__actionChangeView !== 'undefined',
    'listenActionInitializeView: ActionChangeView should be initialized before using it'
  )

  component.__actionInitializeView
    .listenWithCallback((payload) => {
      component.__actionChangeView
        .dispatch(
          new ActionChangeView()
        )
    })
}
