import React from 'react'
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addDays,
    addHours,
    addMinutes
} from 'date-fns'

// 4d 22h left (Tue, 10:50 am)
// 6h 2m left (Today 07:45 pm)

const styles = {
    text: {
        fontWeight: "bold"
    },
}

const DisplayExpiry = (props) => {
    return <span style={styles.text}>{diff(props.expiry)}</span>
}

function diff(expiryDate) {

    var now = new Date();
    var expiry = new Date(expiryDate);
    var result = {};

    var days = differenceInDays(expiry, now);
    if (days > 0) {
        result.days = days;
        now = addDays(now, days); // remove days going forward
    }

    var hours = differenceInHours(expiry, now);
    if (hours > 0) {
        result.hours = hours;
        now = addHours(now, hours); // remove hours going forward
    }

    var minutes = differenceInMinutes(expiry, now);
    if (minutes > 0) {
        result.minutes = minutes;
        now = addMinutes(now, minutes); // remove minutes going forward
    }

    var seconds = differenceInSeconds(expiry, now);
    if (seconds > 0) {
        result.seconds = seconds;
    }

    if (result.days) {
        return result.days + "d " + result.hours + "h left";

    } else if (result.hours) {
        return result.hours + "h " + result.minutes + "m left";
    }

    return "";
}

export default DisplayExpiry;