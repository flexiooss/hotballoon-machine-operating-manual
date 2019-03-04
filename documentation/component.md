# Component
- le développement des applications hot balloon est fait en fonction des tests
- les workers ne peuvent pas être utilisés dans node JS donc dans les tests nons plus
- le métier s'effectue dans la partie component et non dans la vue
- Bien implémenter la JsDOC
- utiliser les '__' pour rendre un attribut privé et des getters pour y accéder
- tag DOM link au lieu de a
- les proxy stores -> instancié par le viewContainer et branché sur le store
- injection action change route, on passe une fonction d'instanciation aux autres components qui en ont besoin
- le store appartient au component, dans le viewContainer / View, on utilise un storeHandler pour accéder à son contenu
- Pas d'inserssion en dur dans le Haed (trouver une solution)

### Project structure

```
├── Module
      ├── __tests__
      ├── actions
            ├── ActionExample.js
            └── PayloadExample.js
      ├── assets
            ├── css
            └── img
      ├── component
            ├── catalogActions
            ├── catalogContainersViews
            ├── catalogStores
            └── Component.js
      ├── stores
            ├── StoreData.js
            ├── StoreHandler.js
            └── Store.js
      ├── views
            ├── Container.js
            └── View.js
      ├── index.js
      └── package.json
```

### Component
constitué d'un component context. 
Le component context permet :
   - d'ajouter des actions et de les écouter,
   - de dispatch (envoyer) des actions,
   - d'ajouter des stores,
   - d'ajouter des conteneurs de vues.
   
### Actions

Une action accèpte un payload.
Le payload permet te faire transiter de la donnée avec l'action à dispatcher
```javascript
const ACTIONS_EXAMPLE = 'ACTIONS_ADD_NUMBER'
/**
 * @extends Action
 */
export class ActionExample extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_EXAMPLE, PayloadExample))
  }
}
```

Ecouter une action :
```javascript
component.componentContext.listenAction(
  DispatcherEventListenerFactory.listen(
    new ActionExample())
    .callback((payload) => {
      ...
    }
```

Dispatcher une action :
```javascript
this.dispatchAction(
  ActionExample.withPayload(
    new PayloadExample(value)
  )
)
```

### Stores
Trois classes représentent un store : 
- le store qui est l'entitée qui stock
```javascript
/**
 * @extends Store
 */
export class StoreExample extends Store {
}
```

- le StoreData qui est un schéma des données qui doivent être stockées
```javascript
/**
 * @extends DataStoreInterface
 */
export class StoreDataExample extends DataStoreInterface {
  /**
   *
   * @param {string} value
   */
  constructor(value = '') {
    super()
    this.value = value
  }
}
```
- le StoreHandler qui permet d'effectuer des accès en lecture sur le store (poxy)
 ```javascript
/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerData extends PublicStoreHandler {
  /**
   *
   * @returns {string}
   */
  get value() {
    return this.data().value
  }
}
 ```   
    
### ViewContainers
Enregistre les views et les Evenements associés à ces views pour dispatcher des actions en fonction de ces evenements

Ecouter un event :
```javascript
this.view(EXAMPLE_VIEW).on(
  ViewEventListenerFactory
    .listen(EXAMPLE_EVENT)
    .callback((payload) => {
      this.dispatchAction(
        ActionExample.withPayload(
          new PayloadExample(payload.value)
        )
      )
    }).build()
)
```

### Views
une template de la vue, branché sur de la data dans les stores


![ComponentUse](./basicComponent.svg)

1. On crée un componentContext. 
2. On initialise le Component en lui passant le nouveau componentContext ainsi que le noeud sur lequel il sera branché
3. InitComponent définit les stores auquel le component à accès.
    Les stores sont initialisés de la sorte :
    ```javascript
    export const addStoreNavbar = (component) => {
      return component.__componentContext.addStore(
        new StoreCounter(
          COUNTER_STORE,
          new InMemoryStorage(
            new State(NAVBAR_STORE, new StoreDataCounter(0)),
            new StoreDataCounter()
          )
        )
      )
    }
    ```

![RouterUse](./Router.svg)
