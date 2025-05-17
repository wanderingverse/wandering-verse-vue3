<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import {zh} from 'flatpickr/dist/l10n/zh.js'

const startTimeInput = ref('')
const endTimeInput = ref('')
const startTimeElem = ref(null)
const endTimeElem = ref(null)

const monthlySalary = ref(10000)
const workingDaysPerMonth = ref(22)

const isWorking = ref(false)
const workStartTimestamp = ref(0)
const elapsedTime = ref(0)
let timer = null

onMounted(() => {
  const now = new Date()
  now.setHours(8, 0, 0, 0)

  const sixPM = new Date()
  sixPM.setHours(18, 0, 0, 0)

  flatpickr(startTimeElem.value, {
    locale: zh,
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    dateFormat: "H:i:S",
    defaultDate: now,
    allowInput: true,
    onChange: (selectedDates) => {
      const date = selectedDates[0]
      startTimeInput.value = date.toTimeString().slice(0, 8)
    }
  })

  flatpickr(endTimeElem.value, {
    locale: zh,
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    dateFormat: "H:i:S",
    defaultDate: sixPM,
    allowInput: true,
    onChange: (selectedDates) => {
      const date = selectedDates[0]
      endTimeInput.value = date.toTimeString().slice(0, 8)
    }
  })

  startTimeInput.value = now.toTimeString().slice(0, 8)
  endTimeInput.value = sixPM.toTimeString().slice(0, 8)
})

const dailyWorkDuration = computed(() => {
  const [startH, startM, startS] = startTimeInput.value.split(':').map(Number)
  const [endH, endM, endS] = endTimeInput.value.split(':').map(Number)

  const startTotalMs = (startH * 3600 + startM * 60 + (startS || 0)) * 1000
  const endTotalMs = (endH * 3600 + endM * 60 + (endS || 0)) * 1000

  let duration = endTotalMs - startTotalMs
  if (duration < 0) duration += 86400000
  return duration
})

const dailySalary = computed(() => {
  if (workingDaysPerMonth.value <= 0) return 0
  return Math.floor((monthlySalary.value / workingDaysPerMonth.value) * 100) / 100
})


const hourlySalary = computed(() => {
  const durationMs = dailyWorkDuration.value
  if (durationMs === 0) return 0

  const hours = durationMs / 1000 / 60 / 60
  const salary = dailySalary.value / hours
  return Math.floor(salary * 100) / 100
})


const earnedSalary = computed(() => {
  if (dailyWorkDuration.value === 0) return 0
  const ratio = elapsedTime.value / dailyWorkDuration.value
  return Math.floor(dailySalary.value * ratio * 100) / 100
})

const formatElapsed = computed(() => {
  const ms = elapsedTime.value
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = ms % 1000

  return `${String(hours).padStart(2, '0')}小时${String(minutes).padStart(2, '0')}分${String(seconds).padStart(2, '0')}秒${String(milliseconds).padStart(3, '0')}毫秒`
})

const startWork = () => {
  if (isWorking.value) return
  isWorking.value = true
  workStartTimestamp.value = Date.now()
  elapsedTime.value = 0

  timer = setInterval(() => {
    elapsedTime.value = Date.now() - workStartTimestamp.value
  }, 33)
}

const stopWork = () => {
  isWorking.value = false
  clearInterval(timer)
}

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <main class="container">
    <h1 class="title">工资累加器</h1>

    <section class="inputs-section">
      <div class="input-group">
        <label for="start-time">上班时间：</label>
        <input id="start-time" type="text" ref="startTimeElem" placeholder="请选择上班时间"/>
      </div>

      <div class="input-group">
        <label for="end-time">下班时间：</label>
        <input id="end-time" type="text" ref="endTimeElem" placeholder="请选择下班时间"/>
      </div>

      <div class="input-group">
        <label for="monthly-salary">月薪（元）：</label>
        <input id="monthly-salary" type="number" v-model.number="monthlySalary" min="0"/>
      </div>

      <div class="input-group">
        <label for="work-days">每月工作天数：</label>
        <input id="work-days" type="number" v-model.number="workingDaysPerMonth" min="1"/>
      </div>
    </section>

    <section class="buttons-section">
      <button class="btn primary" @click="startWork" :disabled="isWorking">开始上班</button>
      <button class="btn secondary" @click="stopWork" :disabled="!isWorking">停止计时</button>
    </section>

    <section class="salary-info-section">
      <div class="info-card">
        <p class="info-label">日薪：</p>
        <p class="info-value">{{ dailySalary }} 元</p>
      </div>
      <div class="info-card">
        <p class="info-label">时薪：</p>
        <p class="info-value">{{ hourlySalary }} 元</p>
      </div>
    </section>

    <section v-if="isWorking" class="status-section">
      <div class="status-card">
        <p class="status-label">已上班时长：</p>
        <p class="status-value">{{ formatElapsed }}</p>
      </div>
      <div class="status-card">
        <p class="status-label">获得工资：</p>
        <p class="status-value">{{ earnedSalary }} 元</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 480px;
  margin: 3rem auto 4rem;
  padding: 2rem 2.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1),
  0 1px 6px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Noto Sans CJK SC';
  color: #2c3e50;
  user-select: none;
  transition: box-shadow 0.3s ease;
}

.container:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15),
  0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 2rem;
  color: #34495e;
  letter-spacing: 0.04em;
  user-select: text;
}

.inputs-section {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.25rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 1rem;
  color: #34495e;
  user-select: text;
}

.input-group input[type="text"],
.input-group input[type="number"] {
  padding: 0.55rem 1rem;
  font-size: 1rem;
  border: 1.8px solid #d1d9e6;
  border-radius: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: #fafbfc;
  color: #2c3e50;
  outline-offset: 2px;
  outline-color: transparent;
  outline-style: solid;
  user-select: text;
}

.input-group input[type="text"]::placeholder {
  color: #9aa5b1;
  font-weight: 400;
}

.input-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 8px 1.5px rgba(59, 130, 246, 0.3);
  outline-color: #3b82f6;
  background: #fff;
}

.buttons-section {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.btn {
  cursor: pointer;
  min-width: 130px;
  padding: 0.55rem 1.3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 14px;
  border: none;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
  transition: background-color 0.3s ease,
  box-shadow 0.3s ease,
  transform 0.15s ease;
  user-select: none;
}

.btn:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 3px;
}

.btn:active {
  transform: scale(0.97);
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
}

.btn.primary {
  background-color: #3b82f6;
  color: #fff;
}

.btn.primary:hover:not(:disabled) {
  background-color: #2563eb;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45);
}

.btn.secondary {
  background-color: #e0e7ff;
  color: #334155;
  box-shadow: 0 4px 10px rgba(51, 65, 85, 0.15);
}

.btn.secondary:hover:not(:disabled) {
  background-color: #c7d2fe;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.3);
}

.btn:disabled {
  cursor: not-allowed;
  background-color: #cbd5e1 !important;
  box-shadow: none !important;
  color: #94a3b8 !important;
  transform: none !important;
}

.salary-info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
  flex-wrap: nowrap;
}

.info-card {
  flex: 1;
  max-width: 200px;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
  border-radius: 16px;
  padding: 1rem 1.2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.info-label {
  font-size: 1rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.info-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease, transform 0.3s ease;
  user-select: text;
}

.info-value:hover {
  color: #2563eb;
  transform: scale(1.03);
}

.status-section {
  display: flex;
  justify-content: space-around;
  gap: 1.8rem;
  user-select: text;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.status-card {
  flex: 1 1 45%;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  border-radius: 16px;
  padding: 1.3rem 1.6rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.status-label {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.status-value {
  font-size: 1.45rem;
  font-weight: 700;
  color: #1e293b;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;
  user-select: text;
}

@media (max-width: 480px) {
  .container {
    margin: 2rem 1rem 3rem;
    padding: 1.5rem 1.5rem;
  }

  .buttons-section {
    flex-direction: column;
  }

  .btn {
    min-width: 100%;
  }

  .status-section {
    flex-direction: column;
  }

  .status-card {
    flex-basis: 100%;
  }

  .info-card {
    flex-basis: 100%;
  }
}
</style>
