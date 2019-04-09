import {assertType, isNull} from 'flexio-jshelpers'
import { TypeCheck } from 'hotballoon'
import '../../generated/io/package'
import {ComponentCounterBuilder} from '../../../component-counter/component/ComponentCounterBuilder'
import {ComponentCalculatorBuilder} from '../../../component-calculator/component/ComponentCalculatorBuilder'

export class EventStoreChangeViewUtils {
  /**
   *
   * @param {PublicStoreHandler} storePublic
   * @param {ComponentContext} componentContext
   * @param viewContainerID
   * @param executor
   * @param transactionActionDispatcher
   */
  constructor(storePublic, componentContext, viewContainerID, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isPublicStoreHandler(storePublic),
      'ActionChangeViewUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isComponentContext(componentContext),
      'ActionChangeViewUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__store = storePublic
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
    console.log(this.__store)
    this.__store.listenChanged((payload) => {
      if (!isNull(this.__choosedComponent)) {
        this.__choosedComponent.delete()
      }
      if (this.__store.selected(0)) {
        this.__choosedComponent = ComponentCounterBuilder.build(
          payload,
          this.__componentContext.APP(),
          this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
          false
        ).mountView()
      } else if (this.__store.selected(1)) {
        this.__choosedComponent = ComponentCounterBuilder.build(
          payload,
          this.__componentContext.APP(),
          this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
          true
        ).mountView()
      } else if (this.__store.selected(2)) {
        this.__choosedComponent = ComponentCalculatorBuilder.build(
          this.__componentContext.APP(),
          this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
          this.__executor,
          this.__transactionActionDispatcher
        ).mountView()
      }
    })

    return this
  }
}
