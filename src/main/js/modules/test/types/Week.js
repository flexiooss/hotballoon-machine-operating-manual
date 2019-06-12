import {assert, isNull} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {WeekValueList} from './week/WeekValueList'
import {DateExtended, DateExtendedBuilder} from '@flexio-oss/extended-flex-types'

class Week {
  /**
    * @param {WeekValueList} value
    * @private
    */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }
  /**
    * @returns {WeekValueList}
    */
  value() {
    return this._value
  }
  /**
    * @param { WeekValueList } value
    */
  withValue(value) {
    let builder = WeekBuilder.from(this)
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

export {Week}

class WeekBuilder {
  /**
    * @constructor
    */
  constructor() {
    this._value = null
  }
  /**
    * @param { WeekValueList } value
    * @returns {WeekBuilder}
    */
  value(value) {
    if (!isNull(value)) {
      assert(value instanceof WeekValueList, 'value should be a WeekValueList')
    }
    this._value = value
    return this
  }
  /**
    * @returns {Week}
    */
  build() {
    return new Week(this._value)
  }
  /**
    * @param {object} jsonObject
    * @returns {WeekBuilder}
    */
  static fromObject(jsonObject) {
    let builder = new WeekBuilder()
    if (jsonObject['value'] !== undefined) {
      builder.value(new WeekValueList(...jsonObject['value'].map(a => DateExtendedBuilder.fromObject(a).build())))
    }
    return builder
  }
  /**
    * @param {string} json
    * @returns {WeekBuilder}
    */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }
  /**
    * @param {Week} instance
    * @returns {WeekBuilder}
    */
  static from(instance) {
    let builder = new WeekBuilder()
    builder.value(instance.value())
    return builder
  }
}
export {WeekBuilder}
