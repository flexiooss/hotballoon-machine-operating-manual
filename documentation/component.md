# Philosophie HotBalloon

> Prérequis : pattern publish subscribe, callbacks

HotBalloon est un framework développé et utilisé par Flexio, une solution 
de digitalisation innovante. Il est basé sur [le pattern flux](https://facebook.github.io/flux/docs/in-depth-overview.html). 
Le framework HotBalloon lié à ce pattern est un outil laissant beaucoup de 
liberté au développeur, il faudra donc comprendre la philosophie de ce 
framework pour implémenter des applications de manière simple et intelligible. 
Cette documentation a pour but de vous procurer les 
éléments nécessaires pour atteindre ces objectifs.

Vous avez à votre disposition le code source du site que vous êtes 
en train de lire qui a été développé à l'aide d'HotBalloon ! Vous avez donc un premier exemple de développement, vous permettant ainsi d'apprendre par le code.
Le code que je vais passer au projecteur dans ce document ne permettra pas à lui seul de vous permettre 
d'implémenter une application utilisant HotBalloon, ce document donne uniquement un fil conducteur vous permettant de 
saisir la logique associée à cet outil. 

Premier point : le framework demande d'écrire une quantité de code conséquent. 
Pourquoi commencer par un point négatif ? Devriez-vous utiliser un outil qui ne vous fait pas gagner de temps ?
Il ne s'agit pourtant pas d'un point négatif ! (ah bon ?) Oui ! Et vous vous en rendrez compte par son utilisation.
Une application HotBalloon a pour avantage d'être très verbeuse, chaque information est décrite de manière claire et pourtant 
précise, ce qui permet une relecture et une maintenabilité du code aisée. En parlant de maintenabilité, sachez que l'ajout de nouvelles fonctionnalités
est rapide, et tout en respectant la lisibilité de l'application.

Dans une application HotBalloon, chaque acteur a sa propre place et ne joue pas plusieurs rôles. 
Chaque acteur a pour objectif d'effectuer une tâche qui lui est propre dans le traitement des données. Ces acteurs définissent un environnement symbolisant une boucle utilisant de l'événementiel :

![PatternHB](./patternHB.svg)

1. le bouton de la vue permet d'incrémenter un compteur. La vue déclenche cette fameuse boucle. Elle n'a pas du tout conscience de ce qu'elle va déclencher,

   elle va simplement envoyer un signal qui va être reçu par quiconque veut l'entendre.

2. Là intervient un acteur nommé View Container qui va s'intéresser à ce signal, qu'il va traduire en une 

   action qui va permettre d'incrémenter un compteur qu'il va envoyer au dispatcher.

3. Le dispatcher a pour rôle d'envoyer l'action. Il va effectuer le rôle de facteur en envoyant un signalement 

   auprès de chaque Component qui aura souscrit un abonnement auprès de cette action.

4. Le component traitera ensuite le signal, il va traduire comme l'action d'incrémenter un compteur, il va donc s'exécuter à l'aide d'une logique métier qu'il connaît.

   Cette logique va permettre de mettre à jour un centre de stockage où est située la valeur du compteur appelé le store.

5. Une fois la valeur modifiée dans le store (modification par incrémentation), le store va envoyer un signal pour dire qu'il a changé.

6. Ce signal sera reçu par le ViewContainer qui va relayer cette information à la vue qui affiche le compteur pour mettre à jour la valeur affichée.

> Notez que le component a également la possibilité de dispatcher une action, à destination de lui-même ou d'un autre component de l'application.
> Oui ! On peut avoir plusieurs components dans la même application, on peut donc avoir plusieurs boucles événementielles au sein de la même application.
> Ce mécanisme va nous permettre de factoriser l'application et de la rendre modulaire. Et tout ceci s'effectue de manière très naturelle pour un développeur normalement constitué !

Sans cette vision globale, vous ne parviendrez pas à comprendre ce qui va suivre, 
prenez un peu de temps pour bien ancrer ce schéma dans votre tête, sans lui vous n'irez pas loin !

Maintenant les présentations faites, nous allons nous intéresser à la partie conception. 

> Qu'allez-vous devoir dire dans votre implémentation javascript pour fabriquer un compteur qui s'incrémente avec un bouton ?

Pour répondre à cette question, je vais énumérer les différentes entités que vous allez devoir développer et la manière dont vous allez les utiliser.

### structure du projet

```latex
└── component-counter
      ├── __tests__
      ├── assets
      │     ├── css                              % feuilles css uniquement pour ce component
      │     └── img                              % images uniquement pour ce component
      ├── component
      │     ├── ComponentCounter.js              % "main" du component
      │     └── ComponentCounterBuilder.js       % proxy pour initialiser le component
      ├── actions
      │     └── ActionIncrement
      │             ├── ActionIncrement.js       % value object
      │             ├── InitActionIncrement.js   % initialisation de l'action d'incrémentation
      │             └── ListenActionIncrement.js % listener d'action de type ActionIncrement
      └── stores
      │     └── counterStore
      │             ├── InitSoreCounter.js       % initialisation du store contenant le compteur
      │             ├── StoreCounter.js          % value object 
      │             └── StoreHandlerCounter.js   % proxy des données du store
      ├── views
      │     └── counterView
      │         ├── ContainerCounter.js          % conteneur et gestionnaire de vues
      │         ├── InitViewContainerCounter.js  % initialisation du view container
      │         └── views
      │                 └── ViewCounter.js       % vue qui décrit l'affichage du compteur
      ├── index.js
      └── package.json
```

Le `component` est l'élement principal de l'application, il est l'ochestrateur de l'pplication. Il a pourtant pas tant de responsabilité sur celle-ci, on lui demande simplement de mettre en place les différentes briques de l'application :

- les `actions`, qui contiennent la logique métier

- les `stores`, qui contiennent la data

- les `viewContainers`, qui sont des gestionnaires de vue

Sans ces briques, le component n'est pas grand chose.

Nous allons donc détailler d'abord chacune de briques du component.

### Stores

Le `store` est l'entité qui va contenir les données.
On a besoin d'un value object qui va contenir la data du store :

```javascript
export class StoreCounter {
  constructor(count) {
    this.count = count
  }
}
```

Notez que cette utilisation n'est pas la plus conseillée, il existe un outil permettant de génerer des values objects avec des builders en JS à l'aide de l'outil hotballoon-shed disponible sur [ce repository github]([https://github.com/flexiooss/hotballoon-shed](https://github.com/flexiooss/hotballoon-shed).

On peut ensuite initialiser le store :

```javascript
const counterStore = StoreBuilder.InMemory(
  new InMemoryStoreParams(
    StoreCounter,
    (data) => {
      return data instanceof StoreCounter
    },
    new StoreCounter(0)
  )
)
component.componentContext.addStore(counterStore)
```

On crée un Store en mémoire, il est du type **StoreCounter**, et est initilalisé avec count = 0.

Le StoreHandler qui permet d'effectuer des accès en lecture sur le store (poxy) :

```javascript
export class StoreDataCounter extends PublicStoreHandler {
  get count() {
    return this.state().data.count()
  } 
}
```

### Actions

`L'action`, comme dit plus haut, est un "signal", elle permet de mettre en relation la vue et le component.
Une action est constituée d'un value object qui va permetttre de transmettre des données avec les signaux.
Dans notre cas le counter est un simple signal qui n'a pas besoin de contenir de données :

```javascript
export class ActionIncrement {

}
```

Ce value Object peut également être géneré à l'aide de hotballon shed.

On peut ensuite initialiser l'action :

```javascript
const actionIncrement = ActionBuilder.build(
  new ActionParams(
    ActionIncrement,
    (payload) => {
      assert(
        payload instanceof ActionIncrement,
        'ActionIncrement:validate: `payload` argument should be an instance of ActionIncrement'
      )
      return true
    },
    component.__componentContext.dispatcher()
  )
)
```

Pour `dispatcher` (envoyer au postier) une nouvelle action :

```javascript
this.dispatchAction(
  actionIncrement.dispatch(
    new ActionIncrement()
  )
)
```

Ici, on `Dispatch` une action "ActionIncrement"

Une fois dispatché, on pourra écouter cette action de la manière suivante :

```javascript
export const listenActionModifyCounter = (component) => {
  assert(component.actionIncrement !== 'undefined',
    'listenActionModifyCounter: ActionChangeAction should be initialized before using it'
  )

  component.actionIncrement
    .listenWithCallback((payload) => {
      component.__counterStore.set(
        component.__counterStore.state().data
          .withCount(component.__counterStore.state().data.count() + 1)
      )
    })
}
```

Une fois l'action capturée dans ce listener, le callback va se charger d'exécuter le code, dans le cas de notre compteur, 
l'action **ActionIncrement** va ajouter +1 au compteur.

### ViewContainers

Comme décrit plus haut, une vue envoie des événements. Ceux-ci vont être captés par le ViewContainer. Il a pour but
d'enregistrer les vues et les différents événements associés à ces vues.

Pour enregister une vue :

```javascript
this.addView(
      new CounterViewSimple(
        new ViewParameters(COUNTER_VIEW, this),
        new ContainerStore(this.stores.counterStore)
      )
    )
```

Chaque vue contient un viewParamter constitué d'un id : COUNTER_VIEW initialisé de la sorte : 

```javascript
const COUNTER_VIEW = Symbol('COUNTER_VIEW')
```

Et le container qui contient cette vue.
Elle peut également contenir un ou des storesBuilder, mais cela n'est pas obligatoire, auquel cas la vue n'aura pas besoin d'être mise à jour.

Une fois la vue ajoutée au container, on peut écouter les événements qui proviennent de 
cette vue :

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

Quand la vue avec l'id COUNTER_VIEW envoie l'événement INCREMENT_EVENT, il est capté par ce listener
qui va dans ce cas dispatcher l'action ActionIncrement.

#### Views

Pour créer une vue, on écrit un tempate qui va décrire ce que doit afficher la vue. Cette vue est branchée sur des storesBuilder qui vont
 permettre de mettre à jour cette vue. On écrit un tempate de cette manière :

```javascript
template() {
  return this.html(
  e('div#divCounter.containerCounter')
    .childNodes(
      this.html(
        e('span#counter.counter')
          .text(this.__stores.counterStore.value)
      ),
      this.html(
        e('input#increment.button')
          .attributes({ value: 'Increment', type: 'button' })
          .listenEvent(
            ElementEventListenerBuilder.listen('click')
              .callback((e) => {
                 this.dispatch(INCREMENT_EVENT, null)
              })
          .build()
      )
    )
  )
}
```

Ce tempate nous permet de créer un noeud div, constitué d'un id divCounter et d'une classe nommée containerCounter.
Ce noeud est composé de 2 nœud fils :

- un nœud span qui a pour texte la valeur contenue dans le store counterStore.

- un nœud input de type bouton et qui a pour valeur "increment". Ce bouton contient un listener, en cas de click

  sur celui-ci, un évènement INCREMENT_EVENT va être dispatché.

### Component

Le component est l'élément principal, c'est notre point d'entré pour l'initialisation de toute la boucle d'événementielle.
Il est constitué d'un component context qui permet de :

- ajouter des `ActionsUtil` et de les écouter;

- dispatcher (envoyer) des `ActionsUtil`;

- ajouter des `StoresBuilder`;

- ajouter des `ViewContainers` de vues.

Il va devoir initialiser les storesBuilder qui veut utiliser.

```javascript
export const initActionModifyCounter = (component) => {
  const counterStore = StoreBuilder.InMemory(
    new InMemoryStoreParams(
      StoreCounter,
      (data) => {
        return data instanceof StoreCounter
      },
      new StoreCounter(0)
    ) 
  )
  component.componentContext.addStore(counterStore)
  return counterStore
}
```

On initialise un store comme décrit plus haut est on l'ajoute au `ComponentContext`.

Le component va également enregistrer les `ActionsUtil` qu'il a besoin d'écouter :

```javascript
export const initActionModifyCounter = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionIncrement,
      (payload) => {
        assert(
          payload instanceof ActionIncrement,
          'ActionIncrement:validate: `payload` argument should be an instance of ActionIncrement'
        )
        return true
      },
      component.componentContext.dispatcher()
    )
  )
}
```

On initialise enfin le `ViewContainer`, il doit être branché sur des `StoresBuilder` pour que les vues puissent les utiliser.

```javascript
export const addExampleViewContainer = (component) => {
  const VIEWCONTAINER_ID = component.componentContext.nextID()
  return component.componentContext.addViewContainer(
    new ViewContainerCounter(
      new ViewContainerParameters(
        component.componentContext,
        VIEWCONTAINER_ID,
        component.parentNode
      ),
      new ContainerStores(component.counterStoreHandler),
      new ContainerActions(component.actionIncrement)
    )
  )
}
```

Le `ViewContainer` est obligatoirement initialisé avec un object permettant de définir les
 paramètres de celui-ci. Ces paramètres contiennent le `ComponentContext` du component, un id (ici géneré par le `ComponentContext` et le noeud du DOM sur lequel sera branché les vues du `ViewContainer`.

Il peut également contenir des `StoresBuilder` même si cela n'est pas obligatoire.
 **ContainerStores** représente ici un ValueObject qui permet de containeriser les différents `StoresBuilder`
qui vont être utilisé par le `viewContainer` :

```javascript
export class ContainerStore {
  constructor(counterStore) {
    assert(
      counterStore.isTypeOf(StoreCounter),
      'ContainerStores: `counterStore ` should be a Store of CounterStore')
    this.__counterStore = TypeCheck.assertStoreBase(counterStore)
  }

  get counterStore() {
    return this.__counterStore
  }
}
```

On peut effectuer le même procedé pour les actions qui vont être utilisé par le `ViewContainer`:

```javascript
export class ContainerAction {
  constructor(counterIncrementAction) {
    this.__counterIncrementAction = TypeCheck.assertIsAction(counterIncrementAction)
  }

  get counterIncrementAction() {
    return this.__counterIncrementAction
  }
}
```

![ComponentUse](./basicComponent.svg)

1. On crée un componentContext. 
2. On initialise le Component en lui passant le nouveau componentContext ainsi que le noeud sur lequel il sera branché
3. InitComponent définit les storesBuilder auquel le component à accès.
4. InitComponent définit les Actions sur lesquels le component est branché.

   On branche les actions sur un component en créant un listener sur celle-ci.
5. On initialise le ViewContainer, il doit être branché sur des storesBuilder pour que les vues puissent les utiliser.
6. Enregistrements de vues appartenant au Conteneur de vues   
7. La vue est créée en fonction d'un template de view, qui est mis à jour en fonction du store.

![RouterUse](./Router.svg)

- le développement des applications HotBalloon est fait en fonction des tests
- les workers ne peuvent pas être utilisés dans node JS donc dans les tests non plus
- le métier s'effectue dans la partie component et non dans la vue
- Bien implémenter la JsDOC
- utiliser les '__' pour rendre un attribut privé et des getters pour y accéder
- tag DOM link au lieu de a
- les proxy storesBuilder -> instancié par le viewContainer et branché sur le store
- injection action change route, on passe une fonction d'instanciation aux autres components qui en ont besoin
- le store appartient au component, dans le viewContainer / View, on utilise un storeHandler pour accéder à son contenu
- Pas d'insertion en dur dans le Head (trouver une solution)
- seul le component peut modifier le store, et uniquement s'il lui appartient
- parler des payloads
