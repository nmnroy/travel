export const parseVoiceQuery = (transcript: string) => {
    const lowerTranscript = transcript.toLowerCase();

    // 1. Destination Extraction (Simplified list + heuristic)
    // In a real app, this would use an NER model or a large dictionary
    const destinations = ['bali', 'paris', 'tokyo', 'london', 'new york', 'goa', 'dubai', 'singapore', 'thailand', 'vietnam', 'italy', 'swiss', 'maldives'];
    const foundDestination = destinations.find(dest => lowerTranscript.includes(dest));

    // 2. Budget Extraction
    // Patterns: "under 500 dollars", "budget 2000", "cheap"
    let budget: number | undefined;
    const budgetMatch = lowerTranscript.match(/(\d+)\s*(?:dollars?|usd|\$|k|thousand)/);
    if (budgetMatch) {
        let val = parseInt(budgetMatch[1]);
        // Handle "2k" or "5 thousand"
        if (lowerTranscript.includes('k') || lowerTranscript.includes('thousand')) {
            val *= 1000;
        }
        budget = val;
    } else if (lowerTranscript.includes('cheap') || lowerTranscript.includes('budget')) {
        budget = 500; // Default "cheap" threshold
    }

    // 3. Duration Extraction
    // Patterns: "5 days", "1 week", "weekend"
    let duration: number | undefined;
    const dayMatch = lowerTranscript.match(/(\d+)\s*days?/);
    const weekMatch = lowerTranscript.match(/(\d+)\s*weeks?/);

    if (dayMatch) {
        duration = parseInt(dayMatch[1]);
    } else if (weekMatch) {
        duration = parseInt(weekMatch[1]) * 7;
    } else if (lowerTranscript.includes('weekend')) {
        duration = 3;
    } else if (lowerTranscript.includes('week')) {
        duration = 7;
    }

    // 4. People/Group Size Extraction
    // Patterns: "2 people", "for 3", "couple", "family", "solo"
    let people: number | undefined;
    const peopleMatch = lowerTranscript.match(/(\d+)\s*(?:people|persons?|adults?|guests?)/);
    if (peopleMatch) {
        people = parseInt(peopleMatch[1]);
    } else if (lowerTranscript.includes('couple') || lowerTranscript.includes('honey moon')) {
        people = 2;
    } else if (lowerTranscript.includes('solo') || lowerTranscript.includes('alone')) {
        people = 1;
    } else if (lowerTranscript.includes('family')) {
        people = 4; // Default family size guess
    }

    // 5. Preferences Extraction
    const preferences: string[] = [];
    if (lowerTranscript.includes('veg') || lowerTranscript.includes('vegetarian')) preferences.push('vegetarian');
    if (lowerTranscript.includes('beach')) preferences.push('beach');
    if (lowerTranscript.includes('mountain') || lowerTranscript.includes('hiking')) preferences.push('mountain');
    if (lowerTranscript.includes('city') || lowerTranscript.includes('shopping')) preferences.push('city');
    if (lowerTranscript.includes('adventure')) preferences.push('adventure');
    if (lowerTranscript.includes('luxury') || lowerTranscript.includes('5 star')) preferences.push('luxury');

    return {
        destination: foundDestination,
        budget,
        duration,
        people,
        preferences: preferences.length > 0 ? preferences : undefined
    };
};
