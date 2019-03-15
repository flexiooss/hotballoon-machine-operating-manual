// import {ContainerStore} from '../views/ContainerStore'
//
// /**
//  *
//  * @param component
//  * @returns {Multimeter}
//  */
// export const addMultimeter = (component) => {
//   console.log(component.__counterStoreHandler)
//   const COUNTER_VIEWCONTAINER_ID = component.__componentContext.nextID()
//   let COUNTER_VIEWCONTAINER_INST
//   COUNTER_VIEWCONTAINER_INST =
//     new Multimeter(
//       new MultimeterParameters(
//         component.__componentContext,
//         COUNTER_VIEWCONTAINER_ID
//       ),
//       new ContainerStore(component.__counterStoreHandler)
//     )
//
//   component.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
//   component.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
//   component.__componentContext.debug.print()
//
//   return COUNTER_VIEWCONTAINER_INST
// }
