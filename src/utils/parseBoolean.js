module.exports = function parseBoolean(string) {
    try {
        return JSON.parse(string);
    } catch (error) {
        throw false;
    }
}
