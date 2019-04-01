import {assertType, isNull} from 'flexio-jshelpers'
import { TypeCheck } from 'hotballoon'
import '../../generated/io/package'
import {ComponentCounterBuilder} from '../../../component-counter/component/ComponentCounterBuilder'
import {ComponentCalculatorBuilder} from '../../../component-calculator/component/ComponentCalculatorBuilder'
import {EventListenerOrderedBuilder} from 'hotballoon/src/Event/EventListenerOrderedBuilder'
import {STORE_CHANGED} from 'hotballoon/src/Store/StoreInterface'

export class EventStoreChangeViewUtils {
  /**
   *
   * @param {Store<StoreNavbar>} store
   * @param {ComponentContext} componentContext
   * @param viewContainerID
   * @param executor
   * @param transactionActionDispatcher
   */
  constructor(store, componentContext, viewContainerID, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isStore(store),
      'ActionChangeViewUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isComponentContext(componentContext),
      'ActionChangeViewUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__store = store
    this.__componentContext = componentContext
    this.__viewContainerID = viewContainerID
    this.__executor = executor
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__choosedComponent = null
  }

  /**
   *
   * @returns {EventStoreChangeViewUtils}
   */
  listen() {
    this.__store.subscribe(
      EventListenerOrderedBuilder
        .listen(STORE_CHANGED)
        .callback((payload) => {
          if (!isNull(this.__choosedComponent)) {
            this.__choosedComponent.delete()
          }
          if (this.__store.state().data.selected === 0) {
            this.__choosedComponent = ComponentCounterBuilder.build(
              payload,
              this.__componentContext.APP(),
              this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
              false
            ).mountView()
          } else if (this.__store.state().data.selected === 1) {
            this.__choosedComponent = ComponentCounterBuilder.build(
              payload,
              this.__componentContext.APP(),
              this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
              true
            ).mountView()
          } else if (this.__store.state().data.selected === 2) {
            this.__choosedComponent = ComponentCalculatorBuilder.build(
              this.__componentContext.APP(),
              this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
              this.__executor,
              this.__transactionActionDispatcher
            ).mountView()
          }
        })
        .build()
    )
    return this
  }
}
