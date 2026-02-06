export const generateDateRange = (startDate: Date, durationDays: number): string => {
    const end = new Date(startDate);
    end.setDate(end.getDate() + durationDays);
    return `${startDate.toLocaleDateString()} - ${end.toLocaleDateString()}`;
};

export const getRandomPrice = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
