// Shared between JumpButtons and LazyPlanForm: while a jump button is
// scrolling the page, forms hold off loading, so a form the scroll merely
// passes (or slows down next to) does not load and shove the target around.
export const jump = { until: 0 };
