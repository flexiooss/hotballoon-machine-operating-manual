import {View, HtmlParams, NodeEventListenerFactory} from 'hotballoon'
import {OperatorMoins} from '../component/operator/OperatorMoins'
import {OperatorMul} from '../component/operator/OperatorMul'
import {OperatorDiv} from '../component/operator/OperatorDiv'
import {OperatorPlus} from '../component/operator/OperatorPlus'
import {OperatorNull} from '../component/operator/OperatorNull'
import {RECONCILIATION_RULES} from 'flexio-nodes-reconciliation'

export const INPUT_NUMBER_EVENT = 'INPUT_NUMBER_EVENT'
export const INPUT_OPERATOR_EVENT = 'INPUT_OPERATOR_EVENT'
export const INPUT_RESULT_EVENT = 'INPUT_RESULT_EVENT'

export default class ViewCalculator extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {CalculatorContainerStoresParameters} calculatorContainerStoresParameters
   */
  constructor(viewParameters, calculatorContainerStoresParameters) {
    super(viewParameters)
    this.__stores = calculatorContainerStoresParameters
    this.subscribeToStore(this.__stores.resultStore)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html('div#calculator.calculator',
      HtmlParams.withChildNodes([
        this.html('input#lexp.lexp',
          HtmlParams.withAttributes({ type: 'text', value: this.__stores.resultStore.display(), readOnly: true })
        ),
        this.html('div#keyboard.keyboard',
          HtmlParams.withChildNodes(this.__digitsButtons()).addReconciliationRules([RECONCILIATION_RULES.BYPATH])
        )
      ])
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
      res[i] = this.html('tr#line' + (i + 1) + '.line',
        HtmlParams.withChildNodes(this.__addDigitButtons(i))
      )
    }
    res[3] = this.html('input#plus.button',
      HtmlParams
        .withAttributes({ type: 'button', value: '+' })
        .addEventListener(NodeEventListenerFactory.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: new OperatorPlus() })
          })
          .build()
        )
    )

    res[4] = this.html('input#minus.button',
      HtmlParams
        .withAttributes({ type: 'button', value: '-' })
        .addEventListener(NodeEventListenerFactory.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: new OperatorMoins() })
          })
          .build()
        )
    )

    res[4] = this.html('input#minus.button',
      HtmlParams
        .withAttributes({ type: 'button', value: '-' })
        .addEventListener(NodeEventListenerFactory.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: new OperatorMoins() })
          })
          .build()
        )
    )
    res[5] = this.html('input#mul.button',
      HtmlParams
        .withAttributes({ type: 'button', value: '*' })
        .addEventListener(NodeEventListenerFactory.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: new OperatorMul() })
          })
          .build()
        )
    )
    res[6] = this.html('input#div.button',
      HtmlParams
        .withAttributes({ type: 'button', value: '/' })
        .addEventListener(NodeEventListenerFactory.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_OPERATOR_EVENT, { operator: new OperatorDiv() })
          })
          .build()
        )
    )
    res[7] = this.html('input#equal.button',
      HtmlParams
        .withAttributes({ type: 'button', value: '=' })
        .addEventListener(NodeEventListenerFactory.listen('click')
          .callback((e) => {
            this.dispatch(INPUT_RESULT_EVENT, { operator: new OperatorNull() })
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
      res[i] = this.html('td#column' + (i + 1) + '.column',
        HtmlParams.withChildNodes([
          this.html('input#digit' + (i + 1) + '.button',
            HtmlParams
              .withAttributes({type: 'button', value: (y * 3 + i + 1)})
              .addEventListener(NodeEventListenerFactory.listen('click')
                .callback((e) => {
                  this.dispatch(INPUT_NUMBER_EVENT, { number: e.target.value })
                })
                .build()
              )
          )
        ])
      )
    }
    return res
  }
}