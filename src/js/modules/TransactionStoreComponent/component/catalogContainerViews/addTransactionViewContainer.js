import {ViewContainerParameters} from 'hotballoon'
import {ContainerTransaction, TransactionContainerStoresParameters} from '../../views/ContainerTransaction'

export const addTransactionViewContainer = (component) => {
  const TRANSACTION_VIEWCONTAINER_ID = component.__componentContext.nextID()
  let TRANSACTION_VIEWCONTAINER_INST
  TRANSACTION_VIEWCONTAINER_INST = component.__componentContext.addViewContainer(
    new ContainerTransaction(
      new ViewContainerParameters(
        component.__componentContext,
        TRANSACTION_VIEWCONTAINER_ID,
        component.__parentNode
      ),
      new TransactionContainerStoresParameters(component.__transactionStoreHandler)
    )
  )

  component.__componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(TRANSACTION_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return TRANSACTION_VIEWCONTAINER_INST
}
