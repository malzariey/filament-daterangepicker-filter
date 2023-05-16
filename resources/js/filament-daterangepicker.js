import dateRangeComponent from './daterangepicker';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(dateRangeComponent);
});
