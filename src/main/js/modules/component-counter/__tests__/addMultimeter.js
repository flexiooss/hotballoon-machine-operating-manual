// import {NavbarStoreManager} from '../views/NavbarStoreManager'
//
// /**
//  *
//  * @param component
//  * @returns {Multimeter}
//  */
// export const addMultimeter = (component) => {
//   const COUNTER_VIEWCONTAINER_ID = component.__componentContext.nextID()
//   let COUNTER_VIEWCONTAINER_INST
//   COUNTER_VIEWCONTAINER_INST =
//     new Multimeter(
//       new MultimeterParameters(
//         component.__componentContext,
//         COUNTER_VIEWCONTAINER_ID
//       ),
//       new NavbarStoreManager(component.__counterStoreHandler)
//     )
//
//   component.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
//   component.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
//   component.__componentContext.debug.print()
//
//   return COUNTER_VIEWCONTAINER_INST
// }
