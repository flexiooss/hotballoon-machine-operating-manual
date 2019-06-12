import {assert, isNull} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {WeekBuilder} from './Week'
import {MonthValueList} from './month/MonthValueList'

class Month {
  /**
   * @param {MonthValueList} value
   * @private
   */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }

  /**
   * @returns {MonthValueList}
   */
  value() {
    return this._value
  }

  /**
   * @param { MonthValueList } value
   */
  withValue(value) {
    let builder = MonthBuilder.from(this)
    builder.value(value)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._value != undefined) {
      jsonObject['value'] = this._value.mapToArray(x => x.toObject())
    }
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }
}

export {Month}

class MonthBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param { MonthValueList } value
   * @returns {MonthBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assert(value instanceof MonthValueList, 'value should be a MonthValueList')
    }
    this._value = value
    return this
  }

  /**
   * @returns {Month}
   */
  build() {
    return new Month(this._value)
  }

  /**
   * @param {object} jsonObject
   * @returns {MonthBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new MonthBuilder()
    if (jsonObject['value'] !== undefined) {
      builder.value(new MonthValueList(...jsonObject['value'].map(a => WeekBuilder.fromObject(a).build())))
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {MonthBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {Month} instance
   * @returns {MonthBuilder}
   */
  static from(instance) {
    let builder = new MonthBuilder()
    builder.value(instance.value())
    return builder
  }
}

export {MonthBuilder}
