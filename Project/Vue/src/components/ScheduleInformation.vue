<template>
	<div>
		<div class="calendar-date-indicator">{{ selectedMonth }}</div>
	</div>
</template>

<script>
export default {
	name: 'ScheduleInformation',
	props: {
		selectedDate: {
			type: Object,
			required: true
		}
	},
	computed: {
		selectedMonth() {
			return this.selectedDate.format("MMMM YYYY");
		}
	}
}
</script>


<style scoped>

</style>
