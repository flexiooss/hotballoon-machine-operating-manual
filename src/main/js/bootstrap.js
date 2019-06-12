import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'
import {ConsoleLogger} from '@flexio-oss/js-logger'
import {ComponentMainBuilder} from './modules/component-main'
import {ExecutorWorker} from '@flexio-oss/hotballoon'
import {WeekBuilder} from './modules/test/types/Week'
import {MonthBuilder} from './modules/test/types/Month'
import {DaysEnum} from './modules/test/types/DaysEnum'
import {MonthValueList} from './modules/test/types/month/MonthValueList'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {WeekValueList} from './modules/test/types/week/WeekValueList'
export const APP = new App('Documentation', new AppDispatcher(), new ConsoleLogger().debug())
const HTML_NODE = document.body

;(function(app) {
  getWeek(2019, 1, DaysEnum.MON)
  let cal = getMonth(2019, 6, DaysEnum.MON).value()
  console.log(cal)
  let res = ''
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      res += ' ' + (cal.get(i).value().get(j).getDate() < 10 ? '0' : '') + cal.get(i).value().get(j).getDate()
    }
    res += '\n'
  }
  console.log(res)
  ComponentMainBuilder
    .build(app, HTML_NODE, new ExecutorWorker())
    .dispatchActionInitialize('topinambour !')
})(APP)

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {DaysEnum} dayEnum
 * @return {Month}
 */
function getMonth(year, month, dayEnum = DaysEnum.SUN) {
  let currentWeek = new WeekBuilder()
  let monthStorage = new MonthBuilder()
  let monthStorageList = new MonthValueList()

  let selectedDate = new DateExtended(year, month)
  let monthSize = selectedDate.getDaysInMonth()

  let currentDay = 1
  let currentDayId = ((selectedDate.getDay() - dayEnum) + 7) % 7
  while (currentDay <= monthSize) {
    let currentWeekList = new WeekValueList()
    while (currentDayId < 7 && currentDay <= monthSize) {
      currentWeekList.push(new DateExtended(year, month, currentDay))
      currentDayId++
      currentDay++
    }
    currentWeek.value(currentWeekList)
    monthStorageList.push(currentWeek.build())
    currentDayId = 0
  }

  return monthStorage.value(monthStorageList).build()
}
/**
 *
 * @param {number} year
 * @param {number} weekNumber
 * @param {DaysEnum} dayEnum
 */
function getWeek(year, weekNumber, dayEnum = DaysEnum.SUN) {
  let res = []
  let firstDayOfWeek = new DateExtended(year, 0)
  let w = 7 * (weekNumber - 1) - (((firstDayOfWeek.getDay() - dayEnum) + 7) % 7)
  firstDayOfWeek.setDate(w + 1)
  console.log(firstDayOfWeek.getMonth())
  console.log(firstDayOfWeek)
  let monthSize = firstDayOfWeek.getDaysInMonth()
  res.push(getMonth(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), dayEnum))
  if ((firstDayOfWeek.getDate() + 6) > monthSize) {
    res.push(getMonth(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth() + 1, dayEnum))
  }
  return res
}

/**
 *
 * @param {Date} date
 * @param dayEnum
 * @return {number}
 */
function getWeekIdInMonth(date, dayEnum = DaysEnum.SUN) {
  let dayId = ((date.getDay() - dayEnum) + 7) % 7
  console.log(dayId)
  let rank = date.getDate() + ((7 - dayId) % 7)
  return Math.floor(rank / 7)
}
