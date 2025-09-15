export const calculateDays = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0; // if any date missing

        // Both should be Date objects
        const start = new Date(checkIn);
        const end = new Date(checkOut);

        // Difference in milliseconds
        const diffTime = end - start;

        // Convert to full days
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0; // avoid negative days
    };