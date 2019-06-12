import {assert, isNull} from '@flexio-oss/assert'
import {FlexArray} from '@flexio-oss/flex-types'
import {DateExtended} from '@flexio-oss/extended-flex-types'
/**
* @extends {FlexArray<DateExtended>}
*/
class WeekValueList extends FlexArray {
  /**
    * @param {number} index
    * @returns {DateExtended}
    */
  get(index) {
    return this[index]
  }
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof DateExtended, 'element should be a DateExtended')
    }
  }
}
export { WeekValueList }
