import {View, ElementEventListenerBuilder, e, ViewParameters} from 'hotballoon'
import {RECONCILIATION_RULES} from 'flexio-nodes-reconciliation'

import {DataHandlerResult} from './DataHandlerResult'
import {ModuleInputNumber, ProxyStoreInputText} from '../../../../module-input-number'

export const INPUT_NUMBER_EVENT = 'INPUT_NUMBER_EVENT'
export const INPUT_OPERATOR_EVENT = 'INPUT_OPERATOR_EVENT'
export const INPUT_RESULT_EVENT = 'INPUT_RESULT_EVENT'

const INPUT_NUMBER = 'INPUT_NUMBER'

export default class ViewCalculator extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {ContainerStore} storeContainer
   */
  constructor(viewParameters, storeContainer) {
    super(viewParameters)
    this.__stores = storeContainer
    this.subscribeToStore(this.__stores.resultStore)
    this.__registerSubViews()
  }

  /**
   *
   * @private
   */
  __registerSubViews() {
    this.addView(
      new ModuleInputNumber(
        new ViewParameters(INPUT_NUMBER, this),
        this.__stores.resultStore,
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
   * @returns {Element}
   */
  template() {
    return this.html(
      e('div#calculator.calculator')
        .childNodes(

          this.html(
            e('section#' + INPUT_NUMBER + '.section')
              .views(this.view(INPUT_NUMBER))
          ),

          this.html(
            e('div#keyboard.keyboard')
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
        e('tr#line' + (i + 1) + '.line')
          .childNodes(...this.__addDigitButtons(i))
      )
    }
    res[3] = this.html(
      e('input#plus.button')
        .attributes({ type: 'button', value: '+' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '+' })
          })
          .build()
        )
    )

    res[4] = this.html(
      e('input#minus.button')
        .attributes({ type: 'button', value: '-' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '-' })
          })
          .build()
        )
    )
    res[5] = this.html(
      e('input#mul.button')
        .attributes({ type: 'button', value: '*' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '*' })
          })
          .build()
        )
    )
    res[6] = this.html(
      e('input#div.button')
        .attributes({ type: 'button', value: '/' })
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: '/' })
          })
          .build()
        )
    )
    res[7] = this.html(
      e('input#equal.button')
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
              e('input#digit' + (i + 1) + '.button')
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
