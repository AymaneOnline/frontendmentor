const dailyBtn = document.querySelector('#daily-btn');
const weeklyBtn = document.querySelector('#weekly-btn');
const monthlyBtn = document.querySelector('#monthly-btn');

const currentHours = document.querySelectorAll('.current');
const previousHours = document.querySelectorAll('.previous');
const times = document.querySelectorAll('.time');

// Register the event listeners for buttons
dailyBtn.addEventListener('click', () => updateTimeframes('daily', 'Day'));
weeklyBtn.addEventListener('click', () => updateTimeframes('weekly', 'Week'));
monthlyBtn.addEventListener('click', () => updateTimeframes('monthly', 'Month'));

// Function to fetch data from JSON file
async function fetchData() {
    const response = await fetch('./data.json');
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Function to update timeframes based on the selected timeframe
async function updateTimeframes(timeframe, timeLabel) {
    try {
        const data = await fetchData();
        currentHours.forEach((current, index) => {
            current.textContent = `${data[index].timeframes[timeframe].current}hrs`;
        });
        previousHours.forEach((previous, index) => {
            previous.textContent = `${data[index].timeframes[timeframe].previous}hrs`;
        });
        times.forEach(time => {
            time.textContent = timeLabel;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Set the default timeframe to 'weekly' when to page loads
// and applying the hover offect to the weekly button on load.
window.addEventListener('DOMContentLoaded', () => {
    updateTimeframes('weekly', 'Week');
    weeklyBtn.classList.add('hover-active');

    const buttons = document.querySelectorAll('.time-opt button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('hover-active'));
            button.classList.add('hover-active');
        })
    })
});