module.exports = function calculateString(string) {
    try {
        return eval(string);
    } catch (error) {
        return 0;
    }
}