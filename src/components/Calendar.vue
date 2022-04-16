<script setup lang="ts">
import moment from 'moment'
// import { ref, computed, defineComponent, reactive, watchEffect, onMounted } from 'vue'
import { ref, computed, reactive } from 'vue'

defineProps({
  msg: {
    type: String,
    default: ''
  }
})

/** 表示されている月と今月との差分 */
const diffOfMonth =  ref(0)
const monthCalendar = reactive([])

/** 選択中の年月日(YYYY-MM-DD) */
const selectedDate = moment('2022-04-01').format('YYYY-MM-DD')

/** 表示する月数 */
// const numberOfMonths = computed(() => {
//   return 2
// })

/** 初期表示する月 */
// const firstMonth = computed(() => {
//   return moment(selectedDate).format('M')
// })

/** 現在表示している年月の初日 */
const firstDayOfselectedMonth = computed(() => {
  const date = moment(selectedDate, 'YYYY-MM-DD')
  date.startOf('month')
  return diffOfMonth.value > 0 ? date.add(diffOfMonth.value, 'months') : date;
})

/** 現在表示している年月の表示 */
const selectedMonthDisplay = computed(() => {
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

const setCalenderArray = () => {
  const startDateVal = startDate.value
  const endDateVal = endDate.value
  const weekNumber = Math.ceil(endDateVal.diff(startDateVal, 'days') / 7)

  for (let week = 0; week < weekNumber; week++) {
    const weekRow = [];
    let tmpStartDate = startDate.value
    for (let day = 0;  day < 7; day++) {
      const date = tmpStartDate.format('YYYY-MM-DD');
      // const states = this.occupancySeats[date] === undefined ? 0 : this.occupancySeats[date];
      // const holidayClass = {
      //   'holiday': this.holidays[date],
      //   'saturday': moment(date).format('d') === '6',
      //   'sunday': moment(date).format('d') === '0',
      // }
      // const isPast = moment(date).isBefore(moment(this.selectableLastDate, 'YYYY-MM-DD'));
      const displayDate = firstDayOfselectedMonth.value.format('M') === tmpStartDate.format('M') ? moment(date).format('D') : moment(date).format('M/D');
      // const [imgSrc, canClick] = this.getImgSrcAndCanClick(isPast, states);
      // const cssClass1 = canClick ? 'btn-owd' : 'can-not-select';
      // const cssClass2 = date === this.selectedDate && canClick ? 'btn-owd-selected' : '';
      // const dayClass = [cssClass1, cssClass2, holidayClass];

      const canClick = true
      weekRow.push({
        date,
        displayDate,
        // dayClass,
        // imgSrc,
        canClick,
      });
      tmpStartDate.add(1, 'days');
    }
    console.log('weekRow', weekRow)
    monthCalendar.push(weekRow);
  }
  // calendars = tempCalendars.values
  // this.selectedCalendar = calendars;
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
    <!-- <div class="d-flex justify-content-between">
      <button class="btn btn-outline-secondary btn-sm m-2" v-bind:disabled="!canPrevMonth" v-on:click="prevMonth"><i class="fas fa-arrow-left mr-1"></i>前の月</button>
      <button class="btn btn-outline-secondary btn-sm m-2" v-bind:disabled="!canNextMonth" v-on:click="nextMonth">次の月<i class="fas fa-arrow-right ml-1"></i></button>
    </div> -->
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
          <tr v-for="(week, i) in monthCalendar" :key="'aaa' + i" v-cloak>
            <td v-for="(day) in week" :key="day.date">
              <div :data-Date="day.date" :data-CanSelect="day.canClick">
                {{ day.displayDate }}
                <!-- <img :src="day.imgSrc"> -->
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
