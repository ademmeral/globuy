
function TotalIndicator({ total, className }) {
  if (!total) return null;
  return <small className={className}>{total}</small>
}
export default TotalIndicator;