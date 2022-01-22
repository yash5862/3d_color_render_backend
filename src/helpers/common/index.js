"use strict";
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Join Nested Iterations to String
 * @param {object} requestObj
 * @param {string} superKey
 * @param {object} processObj
 * @returns {object}
 * */
const iterateObject = (requestObj, superKey = "", processObj = {}) => {
    Object.keys(requestObj).forEach((key) => {
        const sk = `${superKey}.${key}`;
        if (
            requestObj[key] !== null &&
            requestObj[key] !== undefined &&
            requestObj[key].constructor === Object
        ) {
            processObj = iterateObject(requestObj[key], sk, processObj);
        } else {
            processObj[`${sk.substr(1)}`] = requestObj[key];
        }
    });
    return processObj;
};

/**
 * Generate password
 * @returns {string}
 */
const generatePassword = () => {
    const chars = `0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*aABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const passwordLength = Math.round(Math.random() * 10 + 10);
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
};

/**
 * Merge arrays
 * @param {array} args
 * @returns {array}
 */
const arraysMergeAndUnique = (...args) => {
    let set = [];
    args.forEach((arr) => {
        set.push(...arr);
    });
    return [...new Set([...set])];
};

/**
 * convert text in days / weeks / months / years to calculated past date
 * @param {string} cdstr
 * @param {string} date
 * @returns {date}
 */
const countDaysStringToDate = (cdstr, date) => {
    let cdcnt = cdstr.match(/\d/g);
    date = date ? new Date(date) : new Date();

    if (cdcnt !== null) cdcnt = parseInt(cdcnt.join(""));

    if (cdcnt > 0) {
        if (/day/i.test(cdstr)) {
            date.setDate(date.getDate() - cdcnt);
        } else if (/week/i.test(cdstr)) {
            cdcnt *= 7;
            date.setDate(date.getDate() - cdcnt);
        } else if (/month/i.test(cdstr)) {
            date.setMonth(date.getMonth() - cdcnt);
        } else if (/year/i.test(cdstr)) {
            date.setFullYear(date.getFullYear() - cdcnt);
        }
    }

    return date;
};

/**
 * Subtracts dates and returns number of days / weeks / months / years as string
 * @param {string} fromDate
 * @param {string} toDate
 * @returns {string}
 */
const dateToCountDaysString = (fromDate, toDate) => {
    fromDate = new Date(fromDate);
    toDate = toDate ? new Date(toDate) : new Date();

    const time = toDate.getTime() - fromDate.getTime();
    const days = Math.round( time / (3600000 * 24) );

    if( days < 7 ) { // DAYS
        let count = days;
        return `${count} Day${ count !== 1 ? "s" : "" }`;
    } else if( days < 30 ) { // WEEKS
        let count = Math.round(days/7);
        return `${count} Week${ count !== 1 ? "s" : "" }`;
    } else if( days < 365 ) { // MONTHS
        let count = Math.round(days/30);
        return `${count} Month${ count !== 1 ? "s" : "" }`;
    } else { // YEARS
        let count = Math.round(days/365);
        return `${count} Year${ count !== 1 ? "s" : "" }`;
    }
};

/**
 * Verify if timeslots overlap each other. if not then return true
 * @param {array} slots
 * @returns {boolean}
 */
const verifyTimeSlotOverlaps = (slots) => {
    let wrongInputFlag = false;
    let timeSlots = [...slots];

    // convert military string to date/time object
    timeSlots = timeSlots.map((slot) => {
        if( slot.startTime && slot.endTime ) {
            let startTime = new Date();
            startTime.setHours(
                parseInt(slot.startTime.substring(0, 2)),
                parseInt(slot.startTime.substring(2))
            );

            let endTime = new Date();
            endTime.setHours(
                parseInt(slot.endTime.substring(0, 2)),
                parseInt(slot.endTime.substring(2))
            );
            
            // if start time is greater than end time then the input is wrong
            if( startTime >= endTime ) wrongInputFlag = true;

            return { startTime, endTime };
        } else {
            // if slots do not exist then return false. the input is wrong
            wrongInputFlag = true;
        }
    });

    // In case if input is wrong
    if( wrongInputFlag ) return false;

    let len = timeSlots.length;
    // main operation: check for intersections
    for( let i = 0; i < len; i++ ) {
        for( let j = 0; j < len; j++) {
            if( i !== j ) {
                if( timeSlots[j].startTime >= timeSlots[i].startTime && timeSlots[j].startTime <= timeSlots[i].endTime ) {
                    // if time slots intersect then return false 
                    return false;
                }
            }
        }
    }

    // all good? return true
    return true;
};
  
/**
 * Check if object id is valid
 * @param {string} id
 */
const isValidObjectId = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
};

module.exports = {
    iterateObject,
    generatePassword,
    arraysMergeAndUnique,
    countDaysStringToDate,
    dateToCountDaysString,
    verifyTimeSlotOverlaps,
    isValidObjectId
};
