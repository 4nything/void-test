type Title = {
  title: string;
}

export function Loading({title}: Title) {
  return (
    <div className="loading-container">
      <div className="lds-dual-ring"></div>
      <span>Loading {title}</span>
    </div>
  );
}
