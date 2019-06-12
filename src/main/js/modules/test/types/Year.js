import {assert, isNull} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {MonthBuilder} from './Month'
import {YearValueList} from './year/YearValueList'

class Year {
  /**
   * @param {YearValueList} value
   * @private
   */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }

  /**
   * @returns {YearValueList}
   */
  value() {
    return this._value
  }

  /**
   * @param { YearValueList } value
   */
  withValue(value) {
    let builder = YearBuilder.from(this)
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

export {Year}

class YearBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param { YearValueList } value
   * @returns {YearBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assert(value instanceof YearValueList, 'value should be a YearValueList')
    }
    this._value = value
    return this
  }

  /**
   * @returns {Year}
   */
  build() {
    return new Year(this._value)
  }

  /**
   * @param {object} jsonObject
   * @returns {YearBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new YearBuilder()
    if (jsonObject['value'] !== undefined) {
      builder.value(new YearValueList(...jsonObject['value'].map(a => MonthBuilder.fromObject(a).build())))
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {YearBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {Year} instance
   * @returns {YearBuilder}
   */
  static from(instance) {
    let builder = new YearBuilder()
    builder.value(instance.value())
    return builder
  }
}

export {YearBuilder}
