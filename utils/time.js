// Utility to parse "7d" → ms
exports.parseDuration = (str) => {
    const num = parseInt(str.slice(0, -1), 10);
    const unit = str.slice(-1);
    switch (unit) {
        case 'd': return num * 24 * 60 * 60 * 1000;
        case 'h': return num * 60 * 60 * 1000;
        case 'm': return num * 60 * 1000;
        default: return num * 1000;
    }
};