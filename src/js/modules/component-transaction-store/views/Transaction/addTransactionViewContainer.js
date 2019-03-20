import {ViewContainerParameters} from 'hotballoon'
import {ContainerTransaction} from './ContainerTransaction'
import {StoreContainer} from '../StoreContainer'

export const addTransactionViewContainer = (componentContext, parentNode, transactionStoreHandler) => {
  const TRANSACTION_VIEWCONTAINER_ID = componentContext.nextID()
  let TRANSACTION_VIEWCONTAINER_INST
  TRANSACTION_VIEWCONTAINER_INST = componentContext.addViewContainer(
    new ContainerTransaction(
      new ViewContainerParameters(
        componentContext,
        TRANSACTION_VIEWCONTAINER_ID,
        parentNode
      ),
      new StoreContainer(transactionStoreHandler)
    )
  )

  componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
  componentContext.debug.object(TRANSACTION_VIEWCONTAINER_INST)
  componentContext.debug.print()

  return TRANSACTION_VIEWCONTAINER_INST
}
