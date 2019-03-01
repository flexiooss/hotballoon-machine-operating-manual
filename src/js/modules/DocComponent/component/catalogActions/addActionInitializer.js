import {ActionPayload, DispatcherEventListenerFactory} from 'hotballoon'
import {AppInitializedAction} from '../../../MainComponent/actions/AppInitializedAction'
import {ActionChangeView} from '../../actions/ActionChangeView'

export const addActionInitializer = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(new AppInitializedAction())
      .callback(
        (payload) => {
          component.__componentContext.dispatchAction(
            ActionChangeView.withPayload(
              new ActionPayload()
            )
          )
        }
      ).build()
  )
}
