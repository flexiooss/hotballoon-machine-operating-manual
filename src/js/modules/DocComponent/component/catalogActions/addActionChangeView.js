import {DispatcherEventListenerFactory} from 'hotballoon'
import {InitCounterComponent} from '../InitCounterComponent'
import {InitCalculatorComponent} from '../InitCalculatorComponent'
import {ActionChangeView} from '../../actions/ActionChangeView'

export const addActionChangeView = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(new ActionChangeView())
      .callback(
        (payload) => {
          if (component.__navbarStoreHandler.selected(0)) {
            InitCounterComponent.create(
              payload,
              component.__componentContext.APP(),
              component.__componentContext.viewContainer(component.__viewContainerID).getDemoNode(),
              'simple'
            )
          } else if (component.__navbarStoreHandler.selected(1)) {
            InitCounterComponent.create(
              payload,
              component.__componentContext.APP(),
              component.__componentContext.viewContainer(component.__viewContainerID).getDemoNode(),
              'subview'
            )
          } else if (component.__navbarStoreHandler.selected(2)) {
            InitCalculatorComponent.create(
              null,
              component.__componentContext.APP(),
              component.__componentContext.viewContainer(component.__viewContainerID).getDemoNode(),
              component.__executor,
              component.__transactionAction
            )
          }
        }
      ).build()
  )
}
