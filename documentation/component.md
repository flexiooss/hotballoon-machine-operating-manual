# Philosophie HotBalloon

> Prérequis : pattern publish subscribe, callbacks

Hot Balloon est un framework développé et utilisé par Flexio, une solution 
de digitalisation innovante. Il est basé sur [le pattern flux](https://facebook.github.io/flux/docs/in-depth-overview.html). 
Le framework HotBalloon lié à ce pattern est un outil laissant beaucoup de 
liberté au développeur, il faudra donc comprendre la philosophie de ce 
framework pour implémenter des applications de manière simple et intelligible. 
Cette documentation a pour but de vous procurer les 
éléments nécessaires pour atteindre ces objectifs.

Vous avez à votre disposition le code source du site que vous êtes 
en train de lire qui a été développé à l'aide d'HotBalloon! Vous avez donc un premier exemple de développement, vous permettant ainsi d'apprendre par le code.
Le code que je vais passer au projecteur dans ce document ne permettra pas à lui seul de vous permettre 
d'implémenter une application utilisant HotBalloon, ce document donne uniquement un fil conducteur vous permettant de 
saisir la logique associéeà cet outil. 

Premier point : le framework demande d'écrire une quantité de code conséquent. 
Pourquoi commencer par un point négatif ? Devriez-vous utiliser un outil qui ne vous fait pas gagner de temps ?
Il ne s'agit pourtant pas d'un point négatif ! (ah bon ?) Oui ! Et vous vous en rendrez compte par son utilisation.
Une application hot balloon a pour avantage d'être très verbeuse, chaque information est décrite de manière claire et pourtant 
précise, ce qui permet une relecture et une maintenabilité du code aisée. En parlant de maintenabilité, sachez que l'ajout de nouvelles fonctionnalités
est rapide, et tout en respectant la lisibilité de l'application.


Dans une application Hot balloon, chaque acteur a sa propre place et ne joue pas plusieurs rôles. 
Chaque acteur a pour objectif d'effectuer une tâche qui lui est propre dans le traitement des données. Ces acteurs définissent un environnement symbolisant une boucle utilisant de l'evennementiel :


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

> Notez que le component a également la possibilité de dispatcher une action, à destination de lui même ou d'un autre component de l'application.
> Oui ! On peut avoir plusieurs components dans la même application, on peut donc avoir plusieurs boucles évenementielles au sein de la même application.
> Ce mécanisme va nous permettre de factoriser l'application et de la rendre modulaire. Et tout ceci s'effectue de manière très naturelle pour un développeur normalement constitué !

Sans cette vison globale, vous ne parviendrez pas à comprendre ce qui va suivre, 
prenez un peu de temps pour bien ancrer ce schéma dans votre tête, sans lui vous n'irez pas loin !

Maintenant les présentations faites, nous allons nous interesser à la partie conception. 

> Qu'allez-vous devoir dire à javascript pour qu'il vous fabrique un compteur qui s'incrémente avec un bouton ?

Pour répondre à cette question, je vais énumérer les différentes entités que vous allez devoir développer et la manière dont vous allez les utiliser.

### structure du projet

```
├── Module
      ├── __tests__
      ├── actions
            └── ActionIncrement.js
      ├── assets
            ├── css
            └── img
      ├── component
            ├── catalogActions
                   └── addActionIncrement.js 
            ├── catalogContainersViews
                   └── addViewContainerCounter.js 
            ├── catalogStores
                   └── addStoreCounter.js 
            └── Component.js
      ├── stores
            ├── StoreDataCounter.js
            ├── StoreHandlerCounter.js
            └── StoreCounter.js
      ├── views
            ├── ContainerCounter.js
            └── ViewCounter.js
      ├── index.js
      └── package.json
```


### Stores
Trois classes représentent un store : 
- le store qui est l'entitée qui stock
```javascript
/**
 * @extends Store
 */
export class StoreCounter extends Store {
}
```

- le StoreData qui est un schéma des données qui doivent être stockées
```javascript
/**
 * @extends DataStoreInterface
 */
export class StoreDataCounter extends DataStoreInterface {
  /**
   *
   * @param {int} value
   */
  constructor(value = 0) {
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
export class StoreHandlerCounter extends PublicStoreHandler {
  /**
   *
   * @returns {int}
   */
  get value() {
    return this.data().value
  }
}
 ```   
    
### Actions

L'action, comme dit plus haut, est un "singal", elle permet de mettre en relation la vue et le component.

On crée une action de cette manière :

```javascript
const ACTIONS_EXAMPLE = 'ACTIONS_ADD_NUMBER'
/**
 * @extends Action
 */
export class ActionIncrement extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_EXAMPLE, ActionPayload))
  }
}
```

Pour dispatcher (envoyer au postier) une nouvelle action :
```javascript
this.dispatchAction(
  ActionIncrement.withPayload(
    new ActionPayload()
  )
)
```
Ici, on dispatch une action "ActionIncrement"

> le mot Payload vous attire forcement l'oeil, sachez que nous en reparlerons en détail, mais gardez dns la tête qu'une action peut être plus qu'un simple signal,
> elle peut ransporter des données avec elle ! Bonne nouvelle non ?

Une fois dispatché, on pourra écouter cette action de la manière suivante :
```javascript
component.componentContext.listenAction(
  DispatcherEventListenerFactory.listen(
    new ActionIncrement())
    .callback((payload) => {
      doSomeThings()
    })
)
```
Une fois l'action capturé dans ce listener, le callback va se charger d'exécuter le code (doSomeThings), dans le cas de notre compteur, 
l'action "ActionIncrement" devrait permettre de changer le contenu du store. 

### Views
Pour créer une vue, on écrit un tempate qui va décrire ce que le doit afficher la vue. Cette vue est branchée sur des stores qui vont 
permettre de mettre à jour cette vue. On écrit un tempate de cette manière : 
```javascript 
/**
 *
 * @return {Element}
 */
template() {
  return this.html('div#divCounter.containerCounter',
    HtmlParams
      .addChildNodes([
        this.html('span#counter.counter', HtmlParams.withText(this.__stores.counterStore.value)),
        this.html('input#increment.button',
          HtmlParams
            .withAttributes(
              { value: 'Increment', type: 'button' })
            .addEventListener(
              NodeEventListenerFactory.listen('click')
                .callback((e) => {
                  this.dispatch(INCREMENT_EVENT, null)
                })
                .build()
            )
        )
      ])          
  )    
}
```
Ce tempate nous permet de créer un noeud div, sonstitué d'un id divCounter et d'une classe nommée containerCounter.
Ce noeud est composé de 2 noeud fils : 
- un noeud span qui a pour text la valeur contenue dans le store counterStore.
- un noeud input de type bouton et qui a pour valeur "increment". Ce bouton contient un listener, en cas de click
sur celui-ci, un evenement INCREMENT_EVENT va être dispatché.



### ViewContainers
Enregistre les views et les Evenements associés à ces views pour dispatcher des actions en fonction de ces evenements

Ecouter un event :
```javascript
this.view(COUNTER_VIEW).on(
  ViewEventListenerFactory
    .listen(INCREMENT_EVENT)
    .callback((payload) => {
      this.dispatchAction(
        ActionIncrement.withPayload(
          new ActionPayload()
        )
      )
    }).build()
)
```

### Component
constitué d'un component context. 
Le component context permet :
   - d'ajouter des actions et de les écouter,
   - de dispatch (envoyer) des actions,
   - d'ajouter des stores,
   - d'ajouter des conteneurs de vues.
   

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
