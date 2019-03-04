# Philosophie HotBalloon

Prérequis : pattern publish subscribe, callbacks

Hot Balloon est un framework développé et utilisé par Flexio, une solution 
de digitalisation innovante. Il est basé sur [le pattern flux](https://facebook.github.io/flux/docs/in-depth-overview.html). 
Le framework HotBalloon lié à ce pattern est un outil laissant beaucoup de 
liberté au développeur, il faudra donc comprendre la philosophie de ce 
framework pour implémenter des applications de manière simple et intelligible. 

Vous vous apprêtez à lire une documentation visant à vous procurer les 
éléments nécessaires pour atteindre ces objectifs.
Cette documentation est accompagnée du code source du site que vous êtes 
en train de lire ! Vous avez donc un premier exemple de développement, vous permettant ainsi d'apprendre par le code.

Premier point : le framework demande d'écrire une quantité de code conséquent. 
Pourquoi commencer par un point négatif ? Devriez-vous utiliser un outil qui ne vous fait pas gagner de temps ?
Il ne s'agit pourtant pas d'un point négatif ! (ah bon ?) Oui ! Et vous vous en rendrez compte par son utilisation.
Une application hot balloon a pour avantage d'être très verbeuse, chaque information est décrite de manière clair et pourtant 
précise, ce qui permet une relecture et une maintenabilité du code aisée. En parlant de maintenabilité, sachez que l'ajout de nouvelles fonctionnalités
est rapide, et tout en respectant encore la lisibilité de l'application.


Dans une application Hot balloon, chaque acteur a sa propre place et ne joue pas plusieurs rôles. 
Chaque acteur a pour rôle d'effectuer un traitement des données à l'aide d'évenementiel. Ce traitement agit sous forme de boucle :

![PatternHB](./patternHB.svg)

Ici, le bouton de la vue permet d'incrémenter un compteur. La vue déclenche cette fameuse boucle. elle n'a pas du tout conscience de ce qu'elle va déclencher,
elle va simplement envoyer un signal qui va être reçu par quiconque veut l'entrendre.

Là intervient un acteur nommé View Container qui va s'intéressé à ce signal, qu'il va traduire en une 
action qui va permettre d'incrémenter un compteur qu'il va envoyer au dispatcher.

Le dispatcher a pour rôle d'envoyer l'action. Il va effectuer le rôle de facteur en envoyant un signalement 
aupret de chaque Component qui aura souscrit un abonnement aupret de cette action.

Le component traitera ensuite le signal, il va traduire comme l'action d'incrémenter un compteur, il va donc s'exécuter à l'aide d'une logique métier qu'il connaît.
Cette logique va permettre de mettre à jour un centre de stockage où est située la valeur du compteur appelé le store.

Une fois la valeur modifiée dans le store (modification par incrémentation), le store va envoyer un signal pour dire qu'il a changer.
Ce signal sera reçu par le ViewContainer qui va relayer cette information à la vue qui affiche le compteur pour mettre à jour la valeur affichée.

 

Une des règles principales est d'avoir la logique métier de l'application stockée à un seul endroit, dans le component.


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
4. InitComponent définit les Actions sur lesquels le component est branché.
On branche les actions sur un component en créant un listener sur celle-ci :
    ```javascript
   export const addActionExample = (component) => {
     component.componentContext.listenAction(
       DispatcherEventListenerFactory.listen(
         new ActionExample())
         .callback((payload) => {
           doSomeThing(payload)
         })
         .build()
     )
   }
    ```
5. On initialise le ViewContainer, il doit être branché sur des stores pour que les vues puissent les utiliser.

   ```javascript 
    export const addExampleViewContainer = (component) => {
      const VIEWCONTAINER_ID = component.componentContext.nextID()
      let VIEWCONTAINER_INST
      VIEWCONTAINER_INST = component.componentContext.addViewContainer(
        new ContainerExample(
          new ViewContainerParameters(
            component.componentContext,
            VIEWCONTAINER_ID,
            component.parentNode
          ),
          new CalculatorContainerStoresParameters(component.exampleStoreHandler)
        )
      )
      return VIEWCONTAINER_INST
    }
    ```
    
6. Enregistrements de vues appartenant au Conteneur de vues : 
    ```javascript 
        this.addView(
              new ExampleView(
                new ViewParameters(EXAMPLE_VIEW, this),
                new ExampleStoresParameters(this.exampleStore)
              )
            )
    ```
    
7. La vue est créée en fonction d'un template de view, qui est mis à jour en fonction du store :
    ```javascript 
    template() {
      return this.html('div#divExample.divExample',
        HtmlParams.withText(this.stores.exampleStore.value)
          .addChildNodes([
            this.html('input#example.button',
              HtmlParams
                .withAttributes(
                  { value: 'text', type: 'button' })
                .addEventListener(
                  NodeEventListenerFactory.listen('click')
                    .callback((e) => {
                      this.dispatch(EXAMPLE_EVENT, null)
                    })
                    .build()
                )
            )
          ])          
      )    
    }
    ```
   
![RouterUse](./Router.svg)



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
