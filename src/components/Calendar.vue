<script setup lang="ts">
import moment from 'moment'
// import { ref, computed, defineComponent, reactive, watchEffect, onMounted } from 'vue'
import { ref, computed, reactive, watch } from 'vue'

defineProps({
  msg: {
    type: String,
    default: ''
  }
})

const canNextMonth = computed(() => {
  return diffOfMonth.value < numberOfMonths.value
})

const canPrevMonth = computed(() => {
  return diffOfMonth.value > 0
})

/** 表示されている月と今月との差分 */
const diffOfMonth =  ref(0)
// const monthCalendar = reactive([])
const selectedCalendar = reactive([])

/** 選択中の年月日(YYYY-MM-DD) */
const selectedDate = ref(moment('2022-05-01').format('YYYY-MM-DD'))

/** 表示する月数 */
const numberOfMonths = computed(() => {
  return 2
})

/** 初期表示する月 */
// const firstMonth = computed(() => {
//   return moment(selectedDate).format('M')
// })

/** 現在表示している年月の初日 */
const firstDayOfselectedMonth = computed(() => {
  const date = moment(selectedDate.value, 'YYYY-MM-DD').startOf('month')
  console.log('firstDayOfselectedMonth', diffOfMonth.value > 0 ? date.add(diffOfMonth.value, 'months').format('YYYY-MM-DD') : date.format('YYYY-MM-DD'))
  console.log('diffOfMonth', diffOfMonth.value)
  return diffOfMonth.value > 0 ? date.add(diffOfMonth.value, 'months') : date
})

watch(
  () => diffOfMonth.value,
  (diffOfMonth) => {
    console.log('diffOfMonth',diffOfMonth)
    setCalenderArray()
  },
  () => firstDayOfselectedMonth.value,
  (diffOfMonth) => {
    console.log('diffOfMonth',diffOfMonth)
    setCalenderArray()
  }
)

/** 現在表示している年月の表示 */
const selectedMonthDisplay = computed(() => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  console.log('selectedMonthDisplay', firstDayOfselectedMonth.value.format('YYYY-MM-DD'))
  return firstDayOfselectedMonth.value.format('YYYY年MM月')
})

/** カレンダーに表示する最初の日 */
const startDate = computed(() => {
  const date = moment(firstDayOfselectedMonth.value)
  const youbiNum = date.day()
  return date.subtract(youbiNum, 'days')
})

/** カレンダーに表示する最後の日 */
const endDate = computed(() => {
  const date = firstDayOfselectedMonth.value.endOf('month')
  const youbiNum = date.day()
  return date.add(6 - youbiNum, 'days')
})

const prevMonth = () => {
  if(!canPrevMonth.value) return;
  diffOfMonth.value--
}

const nextMonth = () => {
  if(!canNextMonth.value) return;
  diffOfMonth.value++
}

/** カレンダー配列を設定する */
const setCalenderArray = () => {
  selectedCalendar.splice(0)
  const startDateVal = startDate.value
  const endDateVal = endDate.value
  const weekNumber = Math.ceil(endDateVal.diff(startDateVal, 'days') / 7)

  for (let week = 0; week < weekNumber; week++) {
    const weekRow = [];
    let tmpStartDate = startDate.value
    for (let day = 0;  day < 7; day++) {
      const date = tmpStartDate.format('YYYY-MM-DD');
      const displayDate = firstDayOfselectedMonth.value.format('M') === tmpStartDate.format('M') ? moment(date).format('D') : moment(date).format('M/D');

      const canClick = true
      weekRow.push({
        date,
        displayDate,
        canClick,
      });
      tmpStartDate.add(1, 'days');
    }
    selectedCalendar.push(weekRow);
  }
  // calendars = tempCalendars.values
  // selectedCalendar = calendars;
  // this.selectedCalendar.splice();
}

setCalenderArray()
</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->

  <!-- <button type="button" @click="setCalenderArray">
    date is: {{ endDate }}
  </button> -->

  <div>
    <div>
      <button :disabled="!canPrevMonth" @click="prevMonth">
        前の月
      </button>
      <button :disabled="!canNextMonth" @click="nextMonth">
        次の月
      </button>
    </div>
    <div>
      <div>
        <table cellPadding="0" style="width:100%">
          <tr>
            <td :colSpan="7" className="">
              {{ selectedMonthDisplay }}
            </td>
          </tr>
          <tr>
            <th><span className="">日</span></th>
            <th><span className="">月</span></th>
            <th><span className="">火</span></th>
            <th><span className="">水</span></th>
            <th><span className="">木</span></th>
            <th><span className="">金</span></th>
            <th><span className="">土</span></th>
          </tr>
          <tr v-for="(week, i) in selectedCalendar" :key="'aaa' + i" v-cloak>
            <td v-for="(day) in week" :key="day.date">
              <div :data-Date="day.date" :data-CanSelect="day.canClick">
                {{ day.displayDate }}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
