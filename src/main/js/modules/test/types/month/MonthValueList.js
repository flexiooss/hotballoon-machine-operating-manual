import {assert, isNull} from '@flexio-oss/assert'
import {FlexArray} from '@flexio-oss/flex-types'
import {Week} from '../Week'

/**
 * @extends {FlexMap<?Week>}
 */
class MonthValueList extends FlexArray {
  /**
   * @param {number} index
   * @returns {Day}
   */
  get(index) {
    return this[index]
  }

  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof Week, 'element should be a Week')
    }
  }
}

export {MonthValueList}
