import {RECONCILIATION_RULES, View, ElementEventListenerBuilder, e, ViewPublicEventHandler, EventListenerOrderedBuilder} from '@flexio-oss/hotballoon'
import {DataHandlerResult} from './DataHandlerResult'
import {ModuleInputNumber, ProxyStoreInputText} from '../../../module-input-text'
import {assertType, isFunction} from '@flexio-oss/assert'
import style from '../../../../assets/css/style.css'

const INPUT_NUMBER_EVENT = 'INPUT_NUMBER_EVENT'
const INPUT_OPERATOR_EVENT = 'INPUT_OPERATOR_EVENT'
const INPUT_RESULT_EVENT = 'INPUT_RESULT_EVENT'
const INPUT_NUMBER = 'INPUT_NUMBER'

export class ViewCalculator extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {CalculatorStoreManager} calculatorStoreManager
   */
  constructor(container, calculatorStoreManager) {
    super(container)
    this.__stores = calculatorStoreManager
    this.subscribeToStore(this.__stores.storeResult())
    this.__numberInput = null
    this.__registerSubViews()
  }

  /**
   *
   * @private
   */
  __registerSubViews() {
    this.__numberInput = this.addView(
      new ModuleInputNumber(
        this,
        this.__stores.storeResult(),
        /**
         *
         * @param data
         * @returns {ProxyStoreInputText}
         */
        function(data) {
          return new ProxyStoreInputText(new DataHandlerResult(data).display())
        }
      )
    )
  }

  /**
   *
   * @return {ViewCalculatorEvent}
   */
  on() {
    return new ViewCalculatorEvent((a) => {
      return this._on(a)
    })
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html(
      e('div')
        .childNodes(
          this.html(
            e('section#' + INPUT_NUMBER)
              .views(this.__numberInput)
          ),
          this.html(
            e('div')
              .childNodes(...this.__digitsButtons())
              .reconciliationRules(RECONCILIATION_RULES.BYPATH)
          )

        )
    )
  }

  /**
   *
   * @private
   */
  __digitsButtons() {
    let i
    let res = Array(8)
    for (i = 0; i < 3; i++) {
      res[i] = this.html(
        e('tr#line' + (i + 1))
          .childNodes(...this.__addDigitButtons(i))
      )
    }
    res[3] = this.html(
      e('input#plus')
        .className(style.button)
        .attributes({ type: 'button', value: '+' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '+' })
          })
          .build()
        )
    )

    res[4] = this.html(
      e('input#minus')
        .className(style.button)
        .attributes({ type: 'button', value: '-' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '-' })
          })
          .build()
        )
    )
    res[5] = this.html(
      e('input#mul')
        .className(style.button)
        .attributes({ type: 'button', value: '*' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '*' })
          })
          .build()
        )
    )
    res[6] = this.html(
      e('input#div')
        .className(style.button)
        .attributes({ type: 'button', value: '/' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '/' })
          })
          .build()
        )
    )
    res[7] = this.html(
      e('input#equal')
        .className(style.button)
        .attributes({ type: 'button', value: '=' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_RESULT_EVENT, { operator: '=' })
          })
          .build()
        )
    )
    return res
  }

  /**
   *
   * @param {int} y
   * @returns {Node[]}
   * @private
   */
  __addDigitButtons(y) {
    let i
    let res = Array(3)
    for (i = 0; i < 3; i++) {
      res[i] = this.html(
        e('td#column' + (i + 1) + '.column')
          .childNodes(

            this.html(
              e('input#digit' + (i + 1))
                .className(style.button)
                .attributes({type: 'button', value: (y * 3 + i + 1)})
                .listenEvent(ElementEventListenerBuilder.listen('click')
                  .callback((e) => {
                    this.dispatch(INPUT_NUMBER_EVENT, { number: e.target.value.toString() })
                  })
                  .build()
                )
            )
          )
      )
    }
    return res
  }
}

class ViewCalculatorEvent extends ViewPublicEventHandler {
  /**
   *
   * @param {ViewCalculatorEvent~addNumber} clb
   * @return {String}
   */
  addNumber(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(INPUT_NUMBER_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   *
   * @param {ViewCalculatorEvent~addOperator} clb
   * @return {String}
   */
  addOperator(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(INPUT_OPERATOR_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   *
   * @param {ViewCalculatorEvent~addResult} clb
   * @return {String}
   */
  addResult(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(INPUT_RESULT_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }
}
