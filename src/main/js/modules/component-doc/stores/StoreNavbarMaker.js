import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {assertType, isNull} from '@flexio-oss/assert'
import {ComponentCounterBuilder} from '../../component-counter/ComponentCounterBuilder'
import {ComponentCalculatorBuilder} from '../../component-calculator/ComponentCalculatorBuilder'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class StoreNavbarMaker {
  /**
   *
   * @private
   * @param {Store<StoreCounter>} store
   * @param {PublicStoreHandler<StoreCounter>} storePublic
   */
  constructor(store, storePublic) {
    this.__store = store
    this.__storePublic = storePublic
    this.__choosedComponent = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param routeHandler
   * @returns {StoreNavbarMaker}
   */
  static create(componentContext, routeHandler) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreNavbarMaker:constructor: `componentContext` should be a ComponentContext'
    )
    let store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          globalFlexioImport.io.flexio.component_doc.stores.StoreNavbar,
          /**
           *
           * @param {StoreNavbar} data
           * @return {StoreNavbar}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {StoreNavbar} data
           * @return {boolean}
           */
          (data) => {
            return true
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreCounter}
           */
          (obj) => globalFlexioImport.io.flexio.component_doc.stores.StoreNavbarBuilder.fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio.component_doc.stores.StoreNavbarBuilder()
          .linkCollection(
            new globalFlexioImport.io.flexio.component_doc.stores.storenavbar.StoreNavbarLinkCollectionList(
              new globalFlexioImport.io.flexio.component_doc.stores.SchemaLinkBuilder()
                .url(routeHandler.url('doc', {component: 'counter', option: 'simple'}))
                .name('starter')
                .build(),
              new globalFlexioImport.io.flexio.component_doc.stores.SchemaLinkBuilder()
                .url(routeHandler.url('doc', {component: 'counter', option: 'subview'}))
                .name('sub views')
                .build(),
              new globalFlexioImport.io.flexio.component_doc.stores.SchemaLinkBuilder()
                .url(routeHandler.url('doc', {component: 'calculator', option: 'default'}))
                .name('calculatrice')
                .build()
            )
          )
          .selected(0)
          .build()
      )
    ))
    let storePublic = new PublicStoreHandler(store)
    return new StoreNavbarMaker(store, storePublic)
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {string} viewContainerID
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  listen(componentContext, viewContainerID, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreNavbarMaker:listen: `componentContext` should be a ComponentContext'
    )
    this.__store.listenChanged(
      /**
       *
       * @param {StoreBase<StoreNavbar>} payload
       */
      (payload) => {
        if (!isNull(this.__choosedComponent)) {
          this.__choosedComponent.delete()
        }
        if (payload.data.selected() === 0) {
          this.__choosedComponent = ComponentCounterBuilder.build(
            componentContext.APP(),
            false
          ).mountView(componentContext.viewContainer(viewContainerID).getDemoNode())
        } else if (payload.data.selected() === 1) {
          this.__choosedComponent = ComponentCounterBuilder.build(
            componentContext.APP(),
            true
          ).mountView(componentContext.viewContainer(viewContainerID).getDemoNode())
        } else if (payload.data.selected() === 2) {
          this.__choosedComponent = ComponentCalculatorBuilder.build(
            componentContext.APP(),
            executor,
            transactionActionDispatcher
          ).mountView(componentContext.viewContainer(viewContainerID).getDemoNode())
        }
      })
  }

  /**
   *
   * @returns {Store<StoreNavbar>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<StoreNavbar>}
   */
  storePublic() {
    return this.__storePublic
  }
}
