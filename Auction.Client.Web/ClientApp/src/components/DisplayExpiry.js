import React from 'react'
import { format } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { differenceInMinutes, differenceInSeconds, differenceInMonths, differenceInDays, differenceInHours, differenceInYears, addYears, addMonths, addDays, addHours, addMinutes } from 'date-fns'


// 4d 22h left (Tue, 10:50 am)
// 6h 2m left (Today 07:45 pm)

const DisplayExpiry = (props) => {

    diff(props.expiry);

    return (
        <strong> {formatDistanceToNow(new Date(props.expiry), { includeSeconds: true })}</strong >
    )
}

function diff(expiryDate) {

    var now = new Date();
    var expiry = new Date(expiryDate);
    var result = {};

    var years = differenceInYears(expiry, now);
    if (years > 0) {
        result.years = years;
        now = addYears(now, years); // remove years going forward
    }

    var months = differenceInMonths(expiry, now);
    if (months > 0) {
        result.months = months;
        now = addMonths(now, months); // remove months going forward
    }

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

    console.log(result);
}

export default DisplayExpiry;