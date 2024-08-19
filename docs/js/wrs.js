_wrs = (function(){
	var wrs = [
		"3.15",		// 1
		"2.77",		// 2
		"4.28",		// 3
		"4.03",		// 4
		"3.27",		// 5
		"5.00",		// 6
		"6.62",		// 7
		"4.38",		// 8
		"4.77",		// 9
		"5.90",		// 10
		"4.47",		// 11
		"4.75",		// 12
		"10.75",	// 13
		"7.23",		// 14
		"3.18",		// 15
	];

	var decimal_places_display = 2;
	var customTimes = null;

    return {
		// Return the WR times, or return custom times if they were set by the user
        getTimes: function() {
			if (customTimes) {
				return {"title": "Pace", "Pace": customTimes};
			}

			// There are no custom times, so just return the WR times instead
            return {"title": "Time", "wrs": wrs};
		},
		// Set new custom level times 
		setCustomTimes: function(times) {
			// Check if the given object by the user is valid - must be array
			// Also disable custom level times in TAS mode
			if (TAS_MODE || !times || !Array.isArray(times)) {
				customTimes = null;
				return;
			}
			
			// Flag to check if at least one value in the custom times is valid
			var validFlag = false;

			// Copy only the first 15 elements, any more are irrelevant
			times = times.slice(0, 15);

			for (var i = 0; i < times.length; i++) {
				levelTime = times[i];
				
				// check if the current level time is a valid number
				if (typeof(levelTime) === "number" && levelTime >= 0 && levelTime < 100){
					times[i] = levelTime.toFixed(decimal_places_display);
					validFlag = true;
				}
				// In case of invalid number, take the WR time instead
				else {
					times[i] = wrs[i];
				}
			}

			// If the length of the custom times array is less than 15, copy the rest of the WR times into it
			times = times.concat(wrs.slice(times.length));

			if (validFlag)
				customTimes = times;
			else
				customTimes = null;
		}
	};
})();
