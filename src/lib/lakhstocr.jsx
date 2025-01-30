function formatPriceInLakhs(price) {
    if (price >= 100) {
        const crore = (price / 100).toFixed(2); // 2 decimal places
        return `${Number(crore).toLocaleString('en-IN')} Crore`;
    } else {
        return `${Number(price).toLocaleString('en-IN')} Lakh`;
    }
}
export { formatPriceInLakhs };