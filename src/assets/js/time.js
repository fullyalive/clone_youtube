/* --- 시간 변환 --- */

// Make a fuzzy time
const delta = Math.round((+new Date() - VideoSchema.createdAt) / 1000);
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 4;
const year = month * 12;

const fuzzyTime = () => {
    let fuzzy = "";

    if (delta < minute) {
        fuzzy = "방금 전";
    } else if (delta < hour) {
        fuzzy = Math.floor(delta / minute) + " 분 전";
    } else if (delta < day) {
        fuzzy = Math.floor(delta / hour) + " 시간 전";
    } else if (delta < day * 2) {
        fuzzy = "어제";
    } else if (delta < week) {
        fuzzy = Math.floor(delta / day) + " 일 전";
    } else if (delta < month) {
        fuzzy = Math.floor(delta / week) + " 주 전";
    } else if (delta < year) {
        fuzzy = Math.floor(delta / month) + " 달 전";
    } else if (year < delta) {
        fuzzy = Math.floor(delta / year) + " 년 전";
    }
};